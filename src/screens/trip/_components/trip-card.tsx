import { View, Pressable } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { TripListItem } from '../../../types';
import { DETECTION_CONFIG } from '../../../theme';
import { Tag } from './tag';

interface Props {
  item: TripListItem;
  onPress: () => void;
}

export function TripCard({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Card className="rounded-2xl">
        <Card.Content className="flex-row gap-4">
          {/* Date block */}
          <View className="items-center justify-center bg-blue-50 rounded-xl px-3 py-2 min-w-[52px]">
            <Text variant="titleLarge" className="font-black text-blue-600">
              {item.date}
            </Text>
            <Text variant="labelSmall" className="text-gray-500">
              {item.month}
            </Text>
          </View>

          {/* Info */}
          <View className="flex-1 gap-1">
            <Text variant="titleSmall" className="font-semibold text-gray-800">
              {item.vehicle}
            </Text>
            <Text variant="bodySmall" className="text-gray-600">
              📍 {item.route}
            </Text>

            <View className="flex-row gap-3 mt-0.5">
              <Text variant="labelSmall" className="text-gray-500">
                ⏱ {item.duration}
              </Text>
              <Text variant="labelSmall" className="text-gray-500">
                ⚠ {item.totalWarnings} cảnh báo
              </Text>
            </View>

            {/* Stats tags */}
            <View className="flex-row flex-wrap gap-1 mt-2">
              {Object.entries(item.stats).map(([key, value]) => {
                const cfg = DETECTION_CONFIG[key as keyof typeof DETECTION_CONFIG];
                if (!cfg || !value) return null;
                return (
                  <Tag
                    key={key}
                    label={`${cfg.label}: ${value}`}
                    color={cfg.color}
                  />
                );
              })}
            </View>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
}
