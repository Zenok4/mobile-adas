import React from 'react';
import { Card, Text, Switch } from 'react-native-paper';

type Props = {
  icon: React.ReactNode;
  title: string;
};

export default function FeatureCard({ icon, title }: Props) {
  return (
    <Card className="w-[48%] mb-4 rounded-2xl">
      <Card.Content className="items-center">
        {icon}
        <Text className="text-xs text-center mt-1">{title}</Text>
        <Text className="text-xs text-blue-600 mt-1">Đang bật</Text>
        <Switch value />
      </Card.Content>
    </Card>
  );
}
