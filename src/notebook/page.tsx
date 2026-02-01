import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

export default function Intro({ navigation }: any) {
  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-6">
      {/* Header */}
      <View className="mb-4">
        <Text variant="headlineMedium" className="font-bold">
          Giới thiệu
        </Text>
        <Text className="text-gray-500 mt-1">
          Giới thiệu tổng quan về ứng dụng
        </Text>
      </View>

      {/* Card */}
      <Card className="rounded-2xl bg-white shadow-md">
        <Card.Content>
          <Text variant="titleLarge" className="font-bold mb-2">
            Về ADAS
          </Text>

          <Text className="text-gray-700 mb-3 leading-6">
            ADAS là một hệ thống hỗ trợ lái xe tiên tiến, được thiết kế để giúp
            bạn lái xe an toàn hơn. Ứng dụng cung cấp các tính năng giám sát,
            cảnh báo và hỗ trợ thời gian thực.
          </Text>

          <Text className="font-bold mb-1">Các tính năng chính:</Text>

          <View className="ml-2 mb-3">
            <Text className="text-gray-700">• Giám sát lái xe</Text>
            <Text className="text-gray-700">• Phát hiện vật cản</Text>
            <Text className="text-gray-700">• Nhận diện biển báo</Text>
            <Text className="text-gray-700">• Giám sát làn đường</Text>
          </View>

          <Text className="font-bold mb-1">Lợi ích</Text>
          <Text className="text-gray-700 mb-4 leading-6">
            Sử dụng ADAS giúp bạn lái xe an toàn hơn, giảm nguy hiểm tai nạn và
            nâng cao trải nghiệm lái xe.
          </Text>

          <Button
            mode="contained"
            className="rounded-lg"
            onPress={() => navigation.navigate('Home')}
          >
            Bắt đầu sử dụng
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
