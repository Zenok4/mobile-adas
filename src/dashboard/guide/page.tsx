import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

const StepItem = ({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="mb-3 rounded-xl bg-white">
      <Card.Content className="flex-row">
        {/* Step number */}
        <View className="w-8 h-8 rounded-full bg-black items-center justify-center mr-3">
          <Text className="text-white font-bold">{step}</Text>
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="font-bold mb-1">{title}</Text>
          {children}
        </View>
      </Card.Content>
    </Card>
  );
};

export default function Guide() {
  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-6">
      {/* Header */}
      <View className="mb-4">
        <Text variant="headlineMedium" className="font-bold">
          Hướng dẫn
        </Text>
        <Text className="text-gray-500 mt-1">
          Cập nhật mật khẩu của bạn để bảo vệ tài khoản
        </Text>
      </View>

      {/* Steps */}
      <StepItem step={1} title="Bước 1">
        <Text className="text-gray-700">
          Đăng nhập ứng dụng bằng tài khoản Google hoặc số điện thoại.
        </Text>
      </StepItem>

      <StepItem step={2} title="Bước 2">
        <Text className="text-gray-700">
          Cho phép ứng dụng truy cập camera để nhận diện biển báo, làn đường và
          vật thể.
        </Text>
      </StepItem>

      <StepItem step={3} title="Bước 3">
        <Text className="text-gray-700">
          Bật GPS để hệ thống hiển thị thông tin theo thời gian thực.
        </Text>
      </StepItem>

      <StepItem step={4} title="Bước 4">
        <View className="ml-1">
          <Text className="text-gray-700">• Cảnh báo giao thông và tốc độ</Text>
          <Text className="text-gray-700">• Nhận diện biển báo</Text>
          <Text className="text-gray-700">• Phát hiện làn đường, vật cản</Text>
          <Text className="text-gray-700">
            • Cảnh báo buồn ngủ, mất tập trung
          </Text>
        </View>
      </StepItem>

      <StepItem step={5} title="Bước 5">
        <Text className="text-gray-700">
          Vào mục Chi tiết dữ liệu để xem các tuyến đường đã được cập nhật mới
          nhất.
        </Text>
      </StepItem>
    </ScrollView>
  );
}
