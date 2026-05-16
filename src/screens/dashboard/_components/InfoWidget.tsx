// src/screens/dashboard/_components/InfoWidget.tsx
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  iconName: string;
  label: string;
  value: string;
}

export function InfoWidget({ iconName, label, value }: Props) {
  return (
    <Card style={styles.card} className="rounded-xl">
      <Card.Content style={styles.content}>
        <Icon name={iconName} size={18} color="#1D6FE8" />
        <Text variant="labelSmall" className="text-gray-500" style={styles.label}>
          {label}
        </Text>
        <Text
          variant="labelLarge"
          className="font-bold text-gray-800"
          numberOfLines={1}>
          {value}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    // flex: 1 được set ở parent (View row)
  },
  content: {
    paddingVertical: 12,
    gap: 3,
  },
  label: {
    marginTop: 2,
  },
});
