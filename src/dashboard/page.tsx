import React from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import CameraCard from './components/CameraCard';
import ActionButtons from './components/ActionButtons';
import FeatureGrid from './components/FeatureGrid';
import InfoBox from './components/InfoBox';

export default function Dashboard() {
  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6">
      <CameraCard title="Camera tài xế" />
      <CameraCard title="Camera hành trình" />

      <ActionButtons />

      <FeatureGrid />

      <View className="flex-row justify-between mt-4 mb-6">
        <InfoBox
          icon={<Feather name="map-pin" size={16} />}
          text="Quang Trung Street, Hải Châu"
        />
        <InfoBox icon={<Feather name="clock" size={16} />} text="15:13 PM" />
        <InfoBox icon={<Feather name="sun" size={16} />} text="23 °C" />
      </View>
    </View>
  );
}
