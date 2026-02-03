import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import {
  SettingsToggleItem,
  SettingsSliderItem,
  SettingsLinkItem,
} from './SettingsItem';

const STORAGE_KEY = '@adas_settings';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    volume: 80,
    frequency: 'medium',
    showOverlay: true,
    showWeather: true,
    showTime: true,
  });

  // Load settings khi mở app
  useEffect(() => {
    const loadSettings = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setSettings(JSON.parse(saved));
    };
    loadSettings();
  }, []);

  // Hàm lưu
  const saveSettings = async (newSettings: any) => {
    setSettings(newSettings);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  };

  const handleReset = () => {
    Alert.alert('Khôi phục', 'Bạn muốn đưa cài đặt về mặc định?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Khôi phục',
        onPress: () =>
          saveSettings({
            volume: 80,
            frequency: 'medium',
            showOverlay: true,
            showWeather: true,
            showTime: true,
          }),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <View className="pt-12 pb-6 px-6 bg-white dark:bg-slate-900 flex-row justify-between items-end shadow-sm">
        <View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Cài đặt
          </Text>
          <Text className="text-gray-500">Cấu hình hệ thống ADAS</Text>
        </View>
        <TouchableOpacity
          onPress={handleReset}
          className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full"
        >
          <Feather name="refresh-cw" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Section: AI & Âm thanh */}
        <Text className="text-blue-600 font-bold text-xs uppercase mb-2 ml-1">
          Hiệu năng & Cảnh báo
        </Text>
        <View className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 mb-6 shadow-sm">
          <SettingsSliderItem
            title="Âm lượng"
            description="Độ lớn loa cảnh báo vật cản"
            value={settings.volume}
            onValueChange={(val: number) =>
              saveSettings({ ...settings, volume: val })
            }
          />
          <SettingsToggleItem
            title="Lớp phủ AI"
            description="Hiển thị khung nhận diện trên Camera"
            value={settings.showOverlay}
            onValueChange={(val: boolean) =>
              saveSettings({ ...settings, showOverlay: val })
            }
          />
        </View>

        {/* Section: Widget Dashboard */}
        <Text className="text-blue-600 font-bold text-xs uppercase mb-2 ml-1">
          Widget Dashboard
        </Text>
        <View className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 mb-6 shadow-sm">
          <SettingsToggleItem
            title="Thời tiết"
            description="Hiển thị nhiệt độ và trạng thái trời"
            value={settings.showWeather}
            onValueChange={(val: boolean) =>
              saveSettings({ ...settings, showWeather: val })
            }
          />
          <SettingsToggleItem
            title="Thời gian"
            description="Hiển thị đồng hồ trên màn hình chính"
            value={settings.showTime}
            onValueChange={(val: boolean) =>
              saveSettings({ ...settings, showTime: val })
            }
          />
        </View>

        {/* Section: Tài khoản */}
        <Text className="text-blue-600 font-bold text-xs uppercase mb-2 ml-1">
          Tài khoản
        </Text>
        <View className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 mb-10 shadow-sm">
          <SettingsLinkItem
            title="Thông tin cá nhân"
            description="Cập nhật email, số điện thoại"
            label="Chỉnh sửa"
            onPress={() => {}}
          />
          <SettingsLinkItem
            title="Đăng xuất"
            description="Thoát tài khoản khỏi thiết bị"
            label="Thoát"
            destructive
            onPress={() => Alert.alert('Đăng xuất', 'Bạn có chắc chắn?')}
          />
        </View>
      </ScrollView>
    </View>
  );
}
