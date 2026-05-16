import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface InfoCardProps {
  label: string;
  value: string | number;
  icon?: string;
}

export function InfoCard({ label, value, icon }: InfoCardProps) {
  return (
    <Card className="flex-1 rounded-xl">
      <Card.Content className="gap-1 py-3">
        <Text variant="labelSmall" className="text-gray-500 font-medium">
          {label}
        </Text>
        <Text variant="titleSmall" className="font-bold text-gray-800">
          {value}
        </Text>
      </Card.Content>
    </Card>
  );
}
