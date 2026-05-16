import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Detection, DetectionType } from '../../../types';
import { DetectionItem } from './DetectionItem';

interface Props {
  data: Detection[];
  filter: DetectionType | null;
}

export function DetectionList({ data, filter }: Props) {
  const filtered = filter ? data.filter(d => d.type === filter) : data;

  if (filtered.length === 0) {
    return (
      <View className="items-center py-10">
        <Text className="text-4xl mb-3">📋</Text>
        <Text variant="bodyMedium" className="text-gray-500">
          Không có sự kiện nào
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filtered}
      keyExtractor={item => item.id}
      contentContainerStyle={{ gap: 10 }}
      scrollEnabled={false}
      renderItem={({ item }) => <DetectionItem item={item} />}
    />
  );
}
