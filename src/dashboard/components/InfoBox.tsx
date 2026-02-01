import React from 'react';
import { Card, Text } from 'react-native-paper';

type Props = {
  icon: React.ReactNode;
  text: string;
};

export default function InfoBox({ icon, text }: Props) {
  return (
    <Card className="flex-1 mx-1 rounded-2xl">
      <Card.Content className="items-center">
        {icon}
        <Text className="text-xs text-center mt-1">{text}</Text>
      </Card.Content>
    </Card>
  );
}
