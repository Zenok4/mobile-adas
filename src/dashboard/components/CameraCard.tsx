import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import Svg, { Rect, Text as SvgText, Polyline } from 'react-native-svg';
import RNFS from 'react-native-fs';

import { CoreFunctionService } from '../../services/coreFunctionService';
import { useAudioAlert } from '../../hooks/useAudioAlert';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const VIEW_HEIGHT = 320;

interface CameraCardProps {
  title?: string;
  isCameraOn: boolean;
  enableSign?: boolean;
  enableLane?: boolean;
  enableObject?: boolean;
  enableDrowsy?: boolean;
  soundEnabled?: boolean;
  userId?: string;
}

export default function CameraCard({
  title = 'Camera ADAS',
  isCameraOn,
  enableSign = false,
  enableLane = false,
  enableObject = false,
  enableDrowsy = false,
  soundEnabled = true,
  userId = '',
}: CameraCardProps) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const isProcessing = useRef(false);

  const [detections, setDetections] = useState<any[]>([]);
  const [laneData, setLaneData] = useState<any[]>([]);
  const [objectData, setObjectData] = useState<any[]>([]);
  const [isDrowsy, setIsDrowsy] = useState(false);

  const { announceTrafficSign, warnObstacle, alertDrowsiness } =
    useAudioAlert(soundEnabled);

  const captureAndProcess = useCallback(async () => {
    if (isProcessing.current || !camera.current || !isCameraOn) return;
    if (!enableSign && !enableObject && !enableLane && !enableDrowsy) return;

    isProcessing.current = true;

    try {
      const photo = await camera.current.takeSnapshot({
        qualityPrioritization: 'speed',
      });

      const base64 = await RNFS.readFile(photo.path, 'base64');

      const tasks: Promise<any>[] = [];

      /* ========= SIGN ========= */
      if (enableSign) {
        tasks.push(
          CoreFunctionService.sign(base64, userId).then(res => {
            const data = res?.data?.data?.data?.data || [];
            setDetections(Array.isArray(data) ? data : []);
            if (data.length > 0) announceTrafficSign(data[0]?.class_name);
          }),
        );
      }

      /* ========= OBJECT ========= */
      if (enableObject) {
        tasks.push(
          CoreFunctionService.object(base64, userId).then(res => {
            const data = res?.data?.data?.data?.data || [];
            setObjectData(Array.isArray(data) ? data : []);
            if (data.some((o: any) => o.confidence > 0.4))
              warnObstacle('Chú ý vật cản');
          }),
        );
      }

      /* ========= LANE ========= */
      if (enableLane) {
        tasks.push(
          CoreFunctionService.predictLane(base64, userId).then(res => {
            console.log('LANE RESPONSE:', JSON.stringify(res?.data, null, 2));

            const lanes = res?.data?.data?.lanes || res?.data?.data || [];

            setLaneData(Array.isArray(lanes) ? lanes : []);
          }),
        );
      }

      /* ========= DROWSY ========= */
      if (enableDrowsy) {
        tasks.push(
          CoreFunctionService.drowsy(base64, userId).then(res => {
            const status = res?.data?.is_drowsy || res?.data?.data?.is_drowsy;
            setIsDrowsy(!!status);
            if (status) alertDrowsiness('Cảnh báo, bạn đang buồn ngủ!');
          }),
        );
      }

      await Promise.all(tasks);
    } catch (e) {
      console.log('AI PIPELINE ERROR:', e);
    } finally {
      isProcessing.current = false;
    }
  }, [
    isCameraOn,
    enableSign,
    enableObject,
    enableLane,
    enableDrowsy,
    userId,
    announceTrafficSign,
    warnObstacle,
    alertDrowsiness,
  ]);

  useEffect(() => {
    let interval: any;
    if (isCameraOn && device && hasPermission) {
      interval = setInterval(captureAndProcess, 2500);
    }
    return () => interval && clearInterval(interval);
  }, [isCameraOn, device, hasPermission, captureAndProcess]);

  if (!hasPermission)
    return <Button onPress={requestPermission}>Cấp quyền Camera</Button>;

  const sx = SCREEN_WIDTH / 640;
  const sy = VIEW_HEIGHT / 480;

  return (
    <Card
      style={{
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      <View style={{ height: VIEW_HEIGHT }}>
        {isCameraOn && device ? (
          <>
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isCameraOn}
              photo
            />

            <Svg style={StyleSheet.absoluteFill}>
              {/* ===== SIGN ===== */}
              {enableSign &&
                detections.map(
                  (d, i) =>
                    d?.box && (
                      <Rect
                        key={`s-${i}`}
                        x={d.box[0] * sx}
                        y={d.box[1] * sy}
                        width={(d.box[2] - d.box[0]) * sx}
                        height={(d.box[3] - d.box[1]) * sy}
                        stroke="yellow"
                        strokeWidth={2}
                        fill="transparent"
                      />
                    ),
                )}

              {/* ===== OBJECT ===== */}
              {enableObject &&
                objectData.map(
                  (o, i) =>
                    o?.box && (
                      <Rect
                        key={`o-${i}`}
                        x={o.box[0] * sx}
                        y={o.box[1] * sy}
                        width={(o.box[2] - o.box[0]) * sx}
                        height={(o.box[3] - o.box[1]) * sy}
                        stroke="cyan"
                        strokeWidth={2}
                        fill="transparent"
                      />
                    ),
                )}

              {/* ===== LANE (FIXED) ===== */}
              {enableLane &&
                laneData.map((lane, i) => {
                  let points: string | null = null;

                  // format 1: { points: [[x,y], ...] }
                  if (lane?.points && Array.isArray(lane.points)) {
                    points = lane.points
                      .map((p: number[]) => `${p[0] * sx},${p[1] * sy}`)
                      .join(' ');
                  }

                  // format 2: [[x,y],[x,y]]
                  if (!points && Array.isArray(lane)) {
                    points = lane
                      .map((p: number[]) => `${p[0] * sx},${p[1] * sy}`)
                      .join(' ');
                  }

                  if (!points) return null;

                  return (
                    <Polyline
                      key={`lane-${i}`}
                      points={points}
                      stroke="#00FF00"
                      strokeWidth={3}
                      fill="none"
                    />
                  );
                })}

              {/* ===== DROWSY ===== */}
              {enableDrowsy && isDrowsy && (
                <SvgText
                  x={SCREEN_WIDTH / 2 - 80}
                  y={50}
                  fill="red"
                  fontSize="18"
                  fontWeight="bold"
                >
                  ⚠️ BUỒN NGỦ!
                </SvgText>
              )}
            </Svg>
          </>
        ) : (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ color: '#fff' }}>Camera tắt</Text>
          </View>
        )}
      </View>
    </Card>
  );
}
