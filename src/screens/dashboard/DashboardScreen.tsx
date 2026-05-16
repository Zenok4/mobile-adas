// src/screens/dashboard/DashboardScreen.tsx

import {
  Camera as VisionCamera,
  useCameraDevice,
  useCameraPermission,
  usePhotoOutput,
} from 'react-native-vision-camera';

import RNFS from 'react-native-fs';

import {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Text, Button } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useSession } from '../../context/SessionContext';
import { useAdasSettings } from '../../hooks/useAdasSettings';
import { useLocationWeather } from '../../hooks/useLocationWeather';
import { useDrowsy } from '../../hooks/useDrowsy';
import { useRearAI } from '../../hooks/useRearAI';

import { AdasFeatures } from '../../types';

import { FeatureCard } from './_components/FeatureCard';
import { CameraPanel } from './_components/CameraPanel';
import { Detection } from './_components/BBoxOverlay';
import { InfoWidget } from './_components/InfoWidget';

const FEATURE_CONFIG = [
  {
    key: 'sleepAlert' as keyof AdasFeatures,
    iconName: 'eye-outline',
    title: 'Cảnh báo buồn ngủ',
    color: '#1D6FE8',
    bgColor: '#EEF4FF',
  },
  {
    key: 'objectDetect' as keyof AdasFeatures,
    iconName: 'alert-circle-outline',
    title: 'Phát hiện vật cản',
    color: '#f59e0b',
    bgColor: '#fef3c7',
  },
  {
    key: 'signDetect' as keyof AdasFeatures,
    iconName: 'traffic-light',
    title: 'Nhận diện biển báo',
    color: '#10b981',
    bgColor: '#d1fae5',
  },
  {
    key: 'laneMonitor' as keyof AdasFeatures,
    iconName: 'road-variant',
    title: 'Giám sát làn đường',
    color: '#ef4444',
    bgColor: '#fee2e2',
  },
];

export default function DashboardScreen() {
  const { user } = useSession();

  const { settings } = useAdasSettings();

  const {
    location,
    weather,
    temperature,
    time,
    latitude,
    longitude,
  } = useLocationWeather();

  // ─────────────────────────────────────
  // Camera Permission
  // ─────────────────────────────────────

  const {
    hasPermission,
    requestPermission,
  } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  // ─────────────────────────────────────
  // Camera Device
  // ─────────────────────────────────────

  const device = useCameraDevice('back');

  const isCameraReadyRef = useRef(false);

  // V5: dùng usePhotoOutput thay vì cameraRef.takePhoto()
  const photoOutput = usePhotoOutput();

  // ─────────────────────────────────────
  // State
  // ─────────────────────────────────────

  const [cameraOn, setCameraOn] =
    useState(false);

  const [isCameraReady, setIsCameraReady] =
    useState(false);

  // Kích thước ảnh gốc để scale bbox đúng tỉ lệ
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | undefined>(undefined);

  const [soundOn, setSoundOn] =
    useState(true);

  const [features, setFeatures] =
    useState<AdasFeatures>({
      sleepAlert: false,
      objectDetect: false,
      signDetect: false,
      laneMonitor: false,
    });

  // ─────────────────────────────────────
  // Capture Frame
  // ─────────────────────────────────────

  const captureFrame = useCallback(async () => {
    if (!isCameraReadyRef.current) {
      console.log('[CAPTURE] Camera chưa sẵn sàng');
      return null;
    }
    try {
      console.log('[CAPTURE] Bắt đầu chụp...');

      // V5 API: capturePhotoToFile thay vì cameraRef.takePhoto()
      const { filePath } = await photoOutput.capturePhotoToFile({}, {});

      // filePath từ v5 đã là path thuần, không có file:// prefix
      const cleanPath = filePath.startsWith('file://')
        ? filePath.slice(7)
        : filePath;

      console.log('[CAPTURE] filePath:', cleanPath);

      // Lấy kích thước ảnh để scale bbox
      try {
        const { Image } = require('react-native');
        Image.getSize(`file://${cleanPath}`, (w: number, h: number) => {
          setImageSize({ width: w, height: h });
        });
      } catch {}

      const base64 = await RNFS.readFile(cleanPath, 'base64');

      console.log('[CAPTURE] base64 length:', base64?.length ?? 0);

      // Dọn file tạm
      RNFS.unlink(cleanPath).catch(() => {});

      return base64;
    } catch (err) {
      console.log('[CAPTURE ERROR]', err);
      return null;
    }
  }, [photoOutput]);

  // ─────────────────────────────────────
  // Drowsy AI
  // ─────────────────────────────────────

  const {
    badge: drowsyBadge,
    isDanger,
  } = useDrowsy({
    enabled:
      features.sleepAlert &&
      cameraOn &&
      isCameraReady,

    captureFrame,

    userId: user?.id,

    latitude:
      latitude ?? undefined,

    longitude:
      longitude ?? undefined,

    soundEnabled: soundOn,

    intervalMs: 1500,
  });

  // ─────────────────────────────────────
  // Rear AI
  // ─────────────────────────────────────

  const { signs, objects } =
    useRearAI({
      enableSign:
        features.signDetect,

      enableLane:
        features.laneMonitor,

      enableObject:
        features.objectDetect,

      active: cameraOn && isCameraReady,

      captureFrame,

      userId: user?.id,

      latitude:
        latitude ?? undefined,

      longitude:
        longitude ?? undefined,

      soundEnabled: soundOn,

      intervalMs: 1500,
    });

  // ─────────────────────────────────────
  // Toggle Feature
  // ─────────────────────────────────────

  const toggleFeature = useCallback(
    (key: keyof AdasFeatures) => {
      setFeatures(prev => {
        const next = {
          sleepAlert: false,
          objectDetect: false,
          signDetect: false,
          laneMonitor: false,
        };

        const willEnable =
          !prev[key];

        // Buồn ngủ
        if (key === 'sleepAlert') {
          next.sleepAlert =
            willEnable;
        } else {
          // Chỉ bật 1 tính năng AI sau
          next.objectDetect =
            key === 'objectDetect'
              ? willEnable
              : false;

          next.signDetect =
            key === 'signDetect'
              ? willEnable
              : false;

          next.laneMonitor =
            key === 'laneMonitor'
              ? willEnable
              : false;
        }

        const anyFeatureOn =
          Object.values(next).some(
            Boolean,
          );

        setCameraOn(anyFeatureOn);

        // Reset camera ready khi tắt camera để onStarted fire lại
        if (!anyFeatureOn) {
          isCameraReadyRef.current = false;
          setIsCameraReady(false);
        }

        return next;
      });
    },
    [],
  );

  // ─────────────────────────────────────
  // Main Button
  // ─────────────────────────────────────

  const handleMainButton = () => {
    if (cameraOn) {
      setCameraOn(false);
      isCameraReadyRef.current = false;
      setIsCameraReady(false);

      setFeatures({
        sleepAlert: false,
        objectDetect: false,
        signDetect: false,
        laneMonitor: false,
      });
    } else {
      setCameraOn(true);
    }
  };

  // ─────────────────────────────────────
  // Detection Chips
  // ─────────────────────────────────────

  const rearChips = [
    ...(signs.length > 0
      ? [
          {
            label: `${signs.length} Biển báo`,
            color: '#f59e0b',
          },
        ]
      : []),

    ...(objects.length > 0
      ? [
          {
            label: `${objects.length} Vật cản`,
            color: '#3b82f6',
          },
        ]
      : []),
  ];

  // Gộp tất cả detections để render bbox lên camera
  const allDetections: Detection[] = [
    ...signs.map(s => ({ ...s, _type: 'sign' as const })),
    ...objects.map(o => ({ ...o, _type: 'object' as const })),
  ];

  // ─────────────────────────────────────
  // Info Widgets
  // ─────────────────────────────────────

  const {
    showLocation,
    showWeather,
    showTemperature,
    showTime,
  } = settings.display;

  const infoWidgets = [
    showLocation && {
      iconName:
        'map-marker-outline',
      label: 'Vị trí',
      value: location,
    },

    showWeather && {
      iconName:
        'weather-sunny',
      label: 'Thời tiết',
      value: weather,
    },

    showTemperature && {
      iconName: 'thermometer',
      label: 'Nhiệt độ',
      value: temperature,
    },

    showTime && {
      iconName:
        'clock-outline',
      label: 'Thời gian',
      value: time,
    },
  ].filter(Boolean) as {
    iconName: string;
    label: string;
    value: string;
  }[];

  const infoRows:
    typeof infoWidgets[] = [];

  for (
    let i = 0;
    i < infoWidgets.length;
    i += 2
  ) {
    infoRows.push(
      infoWidgets.slice(i, i + 2),
    );
  }

  const activeCount =
    Object.values(features).filter(
      Boolean,
    ).length;

  // ─────────────────────────────────────
  // Permission Screen
  // ─────────────────────────────────────

  if (!hasPermission) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            justifyContent:
              'center',
            alignItems: 'center',
            padding: 24,
          },
        ]}>
        <Text
          style={{
            textAlign: 'center',
          }}>
          Ứng dụng chưa có quyền
          camera
        </Text>

        <Button
          mode="contained"
          style={{
            marginTop: 16,
          }}
          onPress={async () => {
            await requestPermission();
          }}>
          Cấp quyền camera
        </Button>
      </SafeAreaView>
    );
  }

  // ─────────────────────────────────────
  // Render
  // ─────────────────────────────────────

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}>

      {/* Header */}

      <View style={styles.header}>
        <View>
          <Text
            variant="bodySmall"
            style={styles.greeting}>
            Xin chào,
          </Text>

          <Text
            variant="titleMedium"
            style={styles.username}>
            {user?.username ??
              'Tài xế'}{' '}
            👋
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                cameraOn
                  ? '#d1fae5'
                  : '#f3f4f6',
            },
          ]}>
          <Text
            variant="labelSmall"
            style={{
              color: cameraOn
                ? '#10b981'
                : '#9ca3af',
              fontWeight: '700',
            }}>
            {cameraOn
              ? '● ĐANG CHẠY'
              : '○ TẮT'}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={
          false
        }>

        {/* Banner */}

        {activeCount > 0 && (
          <View
            style={styles.activeBanner}>
            <Text
              variant="labelMedium"
              style={
                styles.activeBannerText
              }>
              🟢 {activeCount} tính
              năng đang hoạt động
            </Text>
          </View>
        )}

        {/* Controls */}

        <View style={styles.controlRow}>
          <Button
            mode="contained"
            icon={
              cameraOn
                ? 'camera-off'
                : 'camera'
            }
            onPress={
              handleMainButton
            }
            buttonColor={
              cameraOn
                ? '#ef4444'
                : '#1f2937'
            }
            contentStyle={
              styles.mainBtnContent
            }
            style={styles.mainBtn}>
            {cameraOn
              ? 'Tắt camera'
              : 'Mở camera'}
          </Button>

          <Button
            mode="outlined"
            icon={
              soundOn
                ? 'volume-high'
                : 'volume-off'
            }
            onPress={() =>
              setSoundOn(v => !v)
            }
            contentStyle={
              styles.soundBtnContent
            }
            style={styles.soundBtn}>
            {soundOn
              ? 'Âm thanh'
              : 'Im lặng'}
          </Button>
        </View>

        {/* Features */}

        <Text
          variant="titleMedium"
          style={styles.sectionTitle}>
          Tính năng ADAS
        </Text>

        <View style={styles.featureGrid}>
          <View style={styles.featureRow}>
            {FEATURE_CONFIG.slice(
              0,
              2,
            ).map(f => (
              <FeatureCard
                key={f.key}
                iconName={
                  f.iconName
                }
                title={f.title}
                color={f.color}
                bgColor={
                  f.bgColor
                }
                enabled={
                  features[f.key]
                }
                onToggle={() =>
                  toggleFeature(
                    f.key,
                  )
                }
              />
            ))}
          </View>

          <View style={styles.featureRow}>
            {FEATURE_CONFIG.slice(
              2,
              4,
            ).map(f => (
              <FeatureCard
                key={f.key}
                iconName={
                  f.iconName
                }
                title={f.title}
                color={f.color}
                bgColor={
                  f.bgColor
                }
                enabled={
                  features[f.key]
                }
                onToggle={() =>
                  toggleFeature(
                    f.key,
                  )
                }
              />
            ))}
          </View>
        </View>

        {/* CAMERA */}

        <Text
          variant="titleMedium"
          style={styles.sectionTitle}>
          Camera ADAS
        </Text>

        <CameraPanel
          title="Camera AI"
          iconName="camera"
          active={cameraOn && !!device}
          aiEnabled={activeCount > 0}
          badge={drowsyBadge}
          isDanger={isDanger}
          chips={rearChips}
          placeholder="Bật tính năng để mở camera"
          detections={allDetections}
          imageSize={imageSize}
          cameraComponent={
            device && cameraOn ? (
              <VisionCamera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={cameraOn}
                outputs={[photoOutput]}
                onInitialized={() => {
                  console.log('CAMERA INITIALIZED');
                }}
                onStarted={() => {
                  console.log('CAMERA STARTED');
                  setTimeout(() => {
                    isCameraReadyRef.current = true;
                    setIsCameraReady(true);
                    console.log('[CAMERA] Ready to capture');
                  }, 300);
                }}
                onPreviewStarted={() => {
                  console.log('PREVIEW STARTED');
                }}
                onError={e => {
                  console.log('CAMERA ERROR', e);
                  isCameraReadyRef.current = false;
                  setIsCameraReady(false);
                }}
              />
            ) : null
          }
        />

        {/* Info */}

        {infoRows.length > 0 && (
          <>
            <Text
              variant="titleMedium"
              style={
                styles.sectionTitle
              }>
              Thông tin hành
              trình
            </Text>

            {infoRows.map(
              (row, i) => (
                <View
                  key={i}
                  style={
                    styles.infoRow
                  }>
                  {row.map(w => (
                    <View
                      key={w.label}
                      style={
                        styles.infoCell
                      }>
                      <InfoWidget
                        iconName={
                          w.iconName
                        }
                        label={
                          w.label
                        }
                        value={
                          w.value
                        }
                      />
                    </View>
                  ))}

                  {row.length ===
                    1 && (
                    <View
                      style={
                        styles.infoCell
                      }
                    />
                  )}
                </View>
              ),
            )}
          </>
        )}

        <View
          style={styles.bottomPad}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },

  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor:
      '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
  },

  greeting: {
    color: '#6b7280',
  },

  username: {
    fontWeight: '700',
    color: '#1f2937',
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    gap: 12,
  },

  activeBanner: {
    backgroundColor:
      '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor:
      '#10b981',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  activeBannerText: {
    color: '#15803d',
    fontWeight: '600',
  },

  controlRow: {
    flexDirection: 'row',
    gap: 10,
  },

  mainBtn: {
    flex: 1,
    borderRadius: 14,
  },

  mainBtnContent: {
    paddingVertical: 4,
  },

  soundBtn: {
    borderRadius: 14,
  },

  soundBtnContent: {
    paddingVertical: 4,
  },

  sectionTitle: {
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 4,
  },

  featureGrid: {
    gap: 10,
  },

  featureRow: {
    flexDirection: 'row',
    gap: 10,
  },

  infoRow: {
    flexDirection: 'row',
    gap: 10,
  },

  infoCell: {
    flex: 1,
  },

  bottomPad: {
    height: 16,
  },

});