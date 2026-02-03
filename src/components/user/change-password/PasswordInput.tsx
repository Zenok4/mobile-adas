import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export const PasswordInput = ({
  label,
  placeholder,
  value,
  onChangeText,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">
        {label}
      </Text>
      <View className="relative flex-row items-center bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4">
        <Feather name="lock" size={16} color="#9CA3AF" />
        <TextInput
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          className="flex-1 h-12 ml-3 text-gray-900 dark:text-gray-100"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? 'eye-off' : 'eye'}
            size={18}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
