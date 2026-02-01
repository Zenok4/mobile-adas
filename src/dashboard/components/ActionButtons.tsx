import React from 'react';
import { View, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function ActionButtons() {
  return (
    <View className="flex-row justify-center gap-6 mb-4">
      <Pressable className="bg-blue-600 p-4 rounded-full">
        <Feather name="camera" size={22} color="#fff" />
      </Pressable>

      <Pressable className="bg-blue-600 p-4 rounded-full">
        <Feather name="volume-2" size={22} color="#fff" />
      </Pressable>
    </View>
  );
}
