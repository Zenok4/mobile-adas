import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  title: string;
  subtitle?: string;
}

export function ScreenHeader({ title, subtitle }: Props) {
  return (
    <View className="bg-white px-4 py-3 border-b border-gray-100">
      <Text variant="titleLarge" className="font-bold text-gray-800">
        {title}
      </Text>
      {subtitle ? (
        <Text variant="bodySmall" className="text-gray-500 mt-0.5">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
