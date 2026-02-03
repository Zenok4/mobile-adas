import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Feather from 'react-native-vector-icons/Feather';

// Container chung cho mỗi mục cài đặt
export const SettingsItem = ({ title, description, control }: any) => (
  <View className="flex-row justify-between items-center p-4 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
    <View className="flex-1 pr-4">
      <Text className="text-sm font-bold text-gray-900 dark:text-gray-100">
        {title}
      </Text>
      <Text className="text-xs text-gray-500 mt-1">{description}</Text>
    </View>
    <View>{control}</View>
  </View>
);

export const SettingsToggleItem = ({
  title,
  description,
  value,
  onValueChange,
}: any) => (
  <SettingsItem
    title={title}
    description={description}
    control={
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D5DB', true: '#2563EB' }}
        thumbColor="#fff"
      />
    }
  />
);

export const SettingsSliderItem = ({
  title,
  description,
  value,
  onValueChange,
  min = 0,
  max = 100,
}: any) => (
  <SettingsItem
    title={title}
    description={description}
    control={
      <View className="flex-row items-center gap-2">
        <Slider
          style={{ width: 100, height: 40 }}
          minimumValue={min}
          maximumValue={max}
          step={10}
          value={value}
          onValueChange={onValueChange}
          minimumTrackTintColor="#2563EB"
          maximumTrackTintColor="#D1D5DB"
        />
        <Text className="text-xs font-bold text-blue-600 w-6 text-right">
          {Math.round(value)}
        </Text>
      </View>
    }
  />
);

export const SettingsLinkItem = ({
  title,
  description,
  label,
  onPress,
  destructive = false,
}: any) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row justify-between items-center p-4 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800"
  >
    <View className="flex-1 pr-4">
      <Text
        className={`text-sm font-bold ${
          destructive ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'
        }`}
      >
        {title}
      </Text>
      <Text className="text-xs text-gray-500 mt-1">{description}</Text>
    </View>
    <View className="flex-row items-center">
      <Text
        className={`text-xs mr-1 ${
          destructive ? 'text-red-600' : 'text-blue-600'
        }`}
      >
        {label}
      </Text>
      <Feather
        name="chevron-right"
        size={16}
        color={destructive ? '#DC2626' : '#9CA3AF'}
      />
    </View>
  </TouchableOpacity>
);
