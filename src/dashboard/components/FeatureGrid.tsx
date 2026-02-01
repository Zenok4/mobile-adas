import React from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatureCard from './FeatureCard';

export default function FeatureGrid() {
  return (
    <View className="flex-row flex-wrap justify-between">
      <FeatureCard
        icon={<Feather name="eye" size={26} color="#2563EB" />}
        title="Cảnh báo buồn ngủ"
      />
      <FeatureCard
        icon={<FontAwesome5 name="traffic-light" size={26} color="#2563EB" />}
        title="Nhận diện biển báo"
      />
      <FeatureCard
        icon={<FontAwesome5 name="road" size={26} color="#2563EB" />}
        title="Nhận diện làn đường"
      />
      <FeatureCard
        icon={<Feather name="alert-triangle" size={26} color="#2563EB" />}
        title="Nhận diện vật cản"
      />
    </View>
  );
}
