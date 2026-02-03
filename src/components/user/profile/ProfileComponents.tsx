import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// 1. COMPONENT CARD
export const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <View
    className={`bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm mb-4 ${className}`}
  >
    {children}
  </View>
);

// 2. COMPONENT TEXT TIÊU ĐỀ
export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">
    {children}
  </Text>
);

// 3. COMPONENT INFO ITEM
export const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value?: string;
}) => (
  <View className="flex-row items-start mb-4">
    <View className="bg-blue-50 dark:bg-slate-800 p-2 rounded-lg mr-4">
      <Feather
        name={icon}
        size={18}
        className="text-blue-600 dark:text-blue-400"
      />
    </View>
    <View className="flex-1 border-b border-gray-100 dark:border-slate-800 pb-2">
      <Text className="text-xs text-gray-500 dark:text-gray-400">{label}</Text>
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1">
        {value || 'Chưa cập nhật'}
      </Text>
    </View>
  </View>
);

// 4. LOADING VIEW
export const PageLoader = () => (
  <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-slate-950">
    <ActivityIndicator size="large" color="#2563EB" />
    <Text className="mt-4 text-gray-500">Đang tải hồ sơ...</Text>
  </View>
);
