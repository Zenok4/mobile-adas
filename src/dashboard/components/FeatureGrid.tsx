import React from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatureCard from './FeatureCard';

interface FeatureGridProps {
  enableSign: boolean;
  setEnableSign: (v: boolean) => void;
  enableObject: boolean;
  setEnableObject: (v: boolean) => void;
  enableLane: boolean;
  setEnableLane: (v: boolean) => void;
  enableDrowsy: boolean;
  setEnableDrowsy: (v: boolean) => void;
}

export default function FeatureGrid({
  enableSign,
  setEnableSign,
  enableObject,
  setEnableObject,
  enableLane,
  setEnableLane,
  enableDrowsy,
  setEnableDrowsy,
}: FeatureGridProps) {
  return (
    <View className="flex-row flex-wrap justify-between mt-2">
      <FeatureCard
        icon={<Feather name="eye" size={24} color="#2563EB" />}
        title="Cảnh báo buồn ngủ"
        isEnabled={enableDrowsy}
        onToggle={setEnableDrowsy}
      />
      <FeatureCard
        icon={<FontAwesome5 name="traffic-light" size={24} color="#2563EB" />}
        title="Nhận diện biển báo"
        isEnabled={enableSign}
        onToggle={setEnableSign}
      />
      <FeatureCard
        icon={<FontAwesome5 name="road" size={24} color="#2563EB" />}
        title="Nhận diện làn đường"
        isEnabled={enableLane}
        onToggle={setEnableLane}
      />
      <FeatureCard
        icon={<Feather name="alert-triangle" size={24} color="#2563EB" />}
        title="Nhận diện vật cản"
        isEnabled={enableObject}
        onToggle={setEnableObject}
      />
    </View>
  );
}
