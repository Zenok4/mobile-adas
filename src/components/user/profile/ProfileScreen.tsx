import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Card, SectionTitle, InfoRow, PageLoader } from './ProfileComponents';

export default function ProfileScreen({
  navigation,
  profileData,
  loading,
}: any) {
  if (loading) return <PageLoader />;

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-slate-950">
      {/* --- HEADER --- */}
      <View className="bg-blue-600 pt-14 pb-20 px-6 rounded-b-[40px] items-center">
        <View className="bg-white p-1 rounded-full shadow-xl">
          <View className="bg-gray-200 rounded-full w-24 h-24 items-center justify-center overflow-hidden">
            <Feather name="user" size={50} color="#9CA3AF" />
          </View>
        </View>
        <Text className="text-white text-xl font-bold mt-3">
          {profileData?.username}
        </Text>
        <Text className="text-blue-100 text-sm italic">
          Tài khoản lái xe hệ thống
        </Text>
      </View>

      {/* --- NỘI DUNG --- */}
      <View className="px-5 -mt-12">
        {/* Quick Actions Card */}
        <Card className="flex-row justify-around py-4">
          <TouchableOpacity onPress={() => {}} className="items-center">
            <View className="bg-blue-100 p-3 rounded-2xl mb-1">
              <Feather name="edit-3" size={20} color="#2563EB" />
            </View>
            <Text className="text-xs font-bold text-gray-700">Chỉnh sửa</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} className="items-center">
            <View className="bg-gray-100 p-3 rounded-2xl mb-1">
              <Feather name="lock" size={20} color="#4B5563" />
            </View>
            <Text className="text-xs font-bold text-gray-700">Bảo mật</Text>
          </TouchableOpacity>
        </Card>

        {/* Thông tin cá nhân */}
        <Card>
          <SectionTitle>Thông tin cá nhân</SectionTitle>
          <InfoRow
            icon="mail"
            label="Email liên hệ"
            value={profileData?.email}
          />
          <InfoRow
            icon="phone"
            label="Số điện thoại"
            value={profileData?.phone}
          />
          <InfoRow
            icon="map-pin"
            label="Địa chỉ"
            value={profileData?.address}
          />
          <InfoRow icon="calendar" label="Ngày tham gia" value="15/09/2024" />
        </Card>

        {/* Thông tin xe & ADAS */}
        <Card>
          <SectionTitle>Phương tiện & Hệ thống</SectionTitle>
          <InfoRow
            icon="truck"
            label="Dòng xe"
            value={profileData?.vehicle_name}
          />
          <InfoRow
            icon="hash"
            label="Biển số xe"
            value={profileData?.license_plate}
          />
          <View className="flex-row items-center bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
            <Feather name="shield" size={18} color="#059669" />
            <Text className="ml-2 text-green-700 dark:text-green-400 text-xs font-bold">
              ADAS v1.1.1 (Stable) - Đã kích hoạt
            </Text>
          </View>
        </Card>
      </View>

      <View className="h-10" />
    </ScrollView>
  );
}
