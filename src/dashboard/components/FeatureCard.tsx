import React from 'react';
import { View, Text, Switch } from 'react-native';

// Khai báo Interface để hết lỗi "Property does not exist"
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  isEnabled: boolean;
  onToggle: (val: boolean) => void;
}

export default function FeatureCard({
  icon,
  title,
  isEnabled,
  onToggle,
}: FeatureCardProps) {
  return (
    <View className="w-[48%] bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-start mb-2">
        <View className="p-2 bg-blue-50 rounded-lg">{icon}</View>
        <Switch
          value={isEnabled}
          onValueChange={onToggle}
          trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
        />
      </View>
      <Text className="font-bold text-gray-800 text-sm">{title}</Text>
      <Text className="text-[10px] text-gray-500">
        {isEnabled ? 'Đang bật' : 'Đang tắt'}
      </Text>
    </View>
  );
}
