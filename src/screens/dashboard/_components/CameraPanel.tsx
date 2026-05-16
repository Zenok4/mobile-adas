// src/screens/dashboard/_components/CameraPanel.tsx

import {
  View,
  StyleSheet,
} from 'react-native';

import {
  Card,
  Text,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ReactNode } from 'react';

interface Badge {
  text: string;
  color: string;
  pulsing?: boolean;
}

interface DetectionChip {
  label: string;
  color: string;
}

interface Props {
  title: string;
  iconName: string;
  active: boolean;
  aiEnabled?: boolean;
  badge?: Badge | null;
  placeholder: string;
  isDanger?: boolean;
  chips?: DetectionChip[];
  cameraComponent?: ReactNode;
}

export function CameraPanel({
  title,
  iconName,
  active,
  aiEnabled,
  badge,
  placeholder,
  isDanger,
  chips = [],
  cameraComponent,
}: Props) {
  return (
    <Card
      style={[
        styles.card,
        isDanger &&
          styles.dangerBorder,
      ]}>

      {/* Header */}

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon
            name={iconName}
            size={18}
            color="#1D6FE8"
          />

          <Text
            variant="labelLarge"
            style={styles.title}>
            {title}
          </Text>
        </View>

        <View style={styles.headerRight}>
          {aiEnabled && (
            <View
              style={
                styles.aiBadge
              }>
              <Text
                style={
                  styles.aiText
                }>
                AI ON
              </Text>
            </View>
          )}

          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  active
                    ? '#10b981'
                    : '#d1d5db',
              },
            ]}
          />
        </View>
      </View>

      {/* Preview */}

      <View style={styles.preview}>
        {active ? (
          <>
            {cameraComponent}

            {badge && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      badge.color,
                  },
                ]}>
                <Text
                  style={
                    styles.badgeText
                  }>
                  {badge.text}
                </Text>
              </View>
            )}

            {chips.length > 0 && (
              <View
                style={
                  styles.chipsContainer
                }>
                {chips.map(c => (
                  <View
                    key={c.label}
                    style={[
                      styles.chip,
                      {
                        backgroundColor:
                          c.color +
                          'E6',
                      },
                    ]}>
                    <Text
                      style={
                        styles.chipText
                      }>
                      {c.label}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </>
        ) : (
          <View
            style={styles.offState}>
            <Icon
              name="camera-off"
              size={36}
              color="#4b5563"
            />

            <Text
              variant="labelSmall"
              style={
                styles.offText
              }>
              {placeholder}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 20,
  },

  dangerBorder: {
    borderWidth: 2,
    borderColor: '#ef4444',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor:
      '#f3f4f6',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  title: {
    fontWeight: '700',
    color: '#374151',
  },

  aiBadge: {
    backgroundColor: '#1D6FE8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },

  aiText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '800',
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  preview: {
    height: 220,
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },

  chipsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    gap: 4,
  },

  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  chipText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },

  offState: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  offText: {
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
});