import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// Import các component con
import CameraCard from './components/CameraCard';
import ActionButtons from './components/ActionButtons';
import FeatureGrid from './components/FeatureGrid';
import InfoBox from './components/InfoBox';

export default function Dashboard() {
  /* ================= QUẢN LÝ TRẠNG THÁI (STATE) ================= */
  // Trạng thái Camera chính
  const [cameraOn, setCameraOn] = useState(false);

  // Trạng thái bật/tắt từng tính năng AI
  const [enableSign, setEnableSign] = useState(true); // Nhận diện biển báo
  const [enableObject, setEnableObject] = useState(false); // Nhận diện vật cản
  const [enableLane, setEnableLane] = useState(false); // Nhận diện làn đường
  const [enableDrowsy, setEnableDrowsy] = useState(true); // Cảnh báo buồn ngủ

  // Trạng thái âm thanh
  const [soundEnabled, setSoundEnabled] = useState(true);

  /* ================= GIAO DIỆN CHÍNH ================= */
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Sử dụng ScrollView để không bị mất chức năng khi màn hình nhỏ */}
      <ScrollView
        className="flex-1 px-4 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Khu vực hiển thị Camera & AI Overlay */}
        <CameraCard
          title="Hệ thống hỗ trợ ADAS"
          isCameraOn={cameraOn}
          enableSign={enableSign}
          enableObject={enableObject}
          enableLane={enableLane}
          enableDrowsy={enableDrowsy}
          soundEnabled={soundEnabled}
          userId="huy_001"
        />

        {/* 2. Các nút hành động chính (Bật/tắt Cam & Loa) */}
        <ActionButtons
          isCameraOn={cameraOn}
          onToggleCamera={() => setCameraOn(!cameraOn)}
          isSoundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />

        {/* 3. Lưới chức năng điều khiển (Feature Grid) */}
        {/* Đảm bảo truyền đầy đủ cả biến và hàm set để Switch hoạt động */}
        <FeatureGrid
          enableSign={enableSign}
          setEnableSign={setEnableSign}
          enableObject={enableObject}
          setEnableObject={setEnableObject}
          enableLane={enableLane}
          setEnableLane={setEnableLane}
          enableDrowsy={enableDrowsy}
          setEnableDrowsy={setEnableDrowsy}
        />

        {/* 4. Thông tin bổ trợ phía dưới */}
        <View className="flex-row justify-between mt-4 mb-12">
          <InfoBox
            icon={<Feather name="map-pin" size={16} color="#4B5563" />}
            text="Đà Nẵng, Việt Nam"
          />
          <InfoBox
            icon={<Feather name="clock" size={16} color="#4B5563" />}
            text="16:48 PM"
          />
          <InfoBox
            icon={<Feather name="sun" size={16} color="#4B5563" />}
            text="28 °C"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
