// src/screens/dashboard/_components/FeatureCard.tsx
import { View, StyleSheet } from 'react-native';
import { Card, Text, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  iconName: string;
  title: string;
  color: string;
  bgColor: string;
  enabled: boolean;
  onToggle: () => void;
}

export function FeatureCard({
  iconName,
  title,
  color,
  bgColor,
  enabled,
  onToggle,
}: Props) {
  return (
    <Card
      style={[styles.card, { borderLeftColor: color }]}
      className="rounded-2xl">
      <Card.Content style={styles.content}>
        <View style={[styles.iconBg, { backgroundColor: bgColor }]}>
          <Icon name={iconName} size={20} color={color} />
        </View>
        <View style={styles.info}>
          <Text variant="labelMedium" className="font-semibold text-gray-800" numberOfLines={1}>
            {title}
          </Text>
          <Text
            variant="labelSmall"
            style={{ color: enabled ? '#10b981' : '#ef4444' }}>
            {enabled ? '● Bật' : '○ Tắt'}
          </Text>
        </View>
        <Switch value={enabled} onValueChange={onToggle} color={color} />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 4,
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  info: {
    flex: 1,
  },
});
