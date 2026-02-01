import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function PolicyItem({
  index,
  title,
  content,
}: {
  index: number;
  title: string;
  content: string;
}) {
  return (
    <View className="mb-3">
      <Text className="font-bold">
        {index}. {title}
      </Text>
      <Text className="text-gray-700 mt-1">{content}</Text>
    </View>
  );
}
