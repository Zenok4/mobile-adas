import { View, Text, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import { Tag } from './tag';

const COLORS = {
  DROWSY: '#f97316',
  OBSTACLE: '#ef4444',
  LANE_DEVIATION: '#3b82f6',
  SPEED_SIGN: '#22c55e',
};

interface Props {
  item: any;
  onPress: () => void;
}

export function JourneyCard({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Card className="rounded-2xl">
        <Card.Content className="flex-row gap-4">
          {/* Date */}
          <View className="items-center">
            <Text className="text-lg font-bold text-blue-600">{item.date}</Text>
            <Text className="text-xs text-gray-500">{item.month}</Text>
          </View>

          {/* Info */}
          <View className="flex-1 gap-1">
            <Text className="font-semibold">{item.vehicle}</Text>
            <Text className="text-sm text-gray-600">{item.route}</Text>

            <View className="flex-row gap-3 mt-1">
              <Text className="text-xs text-gray-500">⏱ {item.duration}</Text>
              <Text className="text-xs text-gray-500">
                ⚠ {item.totalWarnings} cảnh báo
              </Text>
            </View>

            {/* Stats */}
            <View className="flex-row flex-wrap gap-1 mt-2">
              {Object.entries(item.stats).map(([key, value]) => (
                <Tag
                  key={key}
                  label={`${labelMap[key]}: ${value}`}
                  color={COLORS[key as keyof typeof COLORS]}
                />
              ))}
            </View>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const labelMap: Record<string, string> = {
  DROWSY: 'Buồn ngủ',
  OBSTACLE: 'Vật cản',
  LANE_DEVIATION: 'Làn đường',
  SPEED_SIGN: 'Biển báo',
};
