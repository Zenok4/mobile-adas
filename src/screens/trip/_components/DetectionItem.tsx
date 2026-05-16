import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Detection } from '../../../types';
import { DETECTION_CONFIG } from '../../../theme';

export function DetectionItem({ item }: { item: Detection }) {
  const cfg = DETECTION_CONFIG[item.type];

  return (
    <Card
      className="rounded-xl"
      style={{ borderLeftWidth: 4, borderLeftColor: cfg.color }}>
      <Card.Content className="flex-row items-start gap-3 py-3">
        <View
          className="w-9 h-9 rounded-lg items-center justify-center mt-0.5"
          style={{ backgroundColor: cfg.bgColor }}>
          <Icon name={cfg.icon} size={18} color={cfg.color} />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-0.5">
            <Text variant="labelSmall" style={{ color: cfg.color }} className="font-semibold">
              {cfg.label}
            </Text>
            <Text variant="labelSmall" className="text-gray-400">
              {item.time}
            </Text>
          </View>
          <Text variant="bodySmall" className="text-gray-700 leading-5">
            {item.message}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
