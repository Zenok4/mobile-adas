import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import PolicyItem from './components/PolicyItem';

export default function Policy() {
  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-6">
      {/* Header */}
      <View className="mb-4">
        <Text variant="headlineMedium" className="font-bold">
          Chính sách
        </Text>
        <Text className="text-gray-500 mt-1">Chính sách bảo mật</Text>
      </View>

      {/* Policy Card */}
      <Card className="rounded-2xl bg-white">
        <Card.Content>
          <PolicyItem
            index={1}
            title="Mục đích thu thập thông tin"
            content="Ứng dụng thu thập thông tin để cung cấp cảnh báo đúng hạn và cải thiện trải nghiệm người dùng."
          />

          <PolicyItem
            index={2}
            title="Phạm vi sử dụng thông tin"
            content="Thông tin được dùng để xử lý dữ liệu, gửi cảnh báo, và tối ưu hệ thống."
          />

          <PolicyItem
            index={3}
            title="Lưu trữ và bảo mật dữ liệu"
            content="Dữ liệu được bảo mật bằng mã hóa và chỉ lưu giữ trong thời gian cần thiết."
          />

          <PolicyItem
            index={4}
            title="Quyền của người dùng"
            content="Người dùng có quyền xem, chỉnh sửa hoặc yêu cầu xóa dữ liệu cá nhân."
          />

          <PolicyItem
            index={5}
            title="Liên hệ"
            content="Email hỗ trợ: supportadas@app.vn"
          />

          {/* Button */}
          <Button
            mode="contained"
            className="mt-3 rounded-lg"
            onPress={() => {}}
          >
            Gửi yêu cầu
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
