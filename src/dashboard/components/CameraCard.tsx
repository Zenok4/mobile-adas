import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

type Props = {
  title: string;
};

export default function CameraCard({ title }: Props) {
  return (
    <Card className="rounded-2xl mb-4">
      <Card.Content>
        <Text className="text-sm mb-2">{title}</Text>
        <View className="h-36 bg-gray-200 rounded-xl" />
      </Card.Content>
    </Card>
  );
}
