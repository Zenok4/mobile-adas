import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, SegmentedButtons, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScreenHeader } from '../../components/common/ScreenHeader';

type Tab = 'introduce' | 'guide' | 'policy';

const FEATURES = [
  { icon: 'eye-outline', title: 'Cảnh báo buồn ngủ', color: '#1D6FE8', desc: 'AI phân tích khuôn mặt tài xế và phát cảnh báo khi phát hiện buồn ngủ.' },
  { icon: 'alert-circle-outline', title: 'Phát hiện vật cản', color: '#f59e0b', desc: 'Nhận diện xe cộ, người đi bộ và vật cản bằng object detection.' },
  { icon: 'traffic-light', title: 'Nhận diện biển báo', color: '#10b981', desc: 'Tự động nhận diện biển báo giao thông theo tiêu chuẩn Việt Nam.' },
  { icon: 'road-variant', title: 'Giám sát làn đường', color: '#ef4444', desc: 'Phát hiện khi xe lệch khỏi làn và cảnh báo kịp thời.' },
];

const GUIDE_STEPS = [
  { step: '1', title: 'Đăng nhập', desc: 'Dùng username hoặc email để đăng nhập vào ứng dụng.' },
  { step: '2', title: 'Cấp quyền', desc: 'Cấp quyền truy cập camera và vị trí để hệ thống hoạt động đầy đủ.' },
  { step: '3', title: 'Mở camera', desc: 'Nhấn nút "Mở camera" ở trang Điều khiển để bắt đầu giám sát.' },
  { step: '4', title: 'Bật tính năng', desc: 'Chọn các tính năng phù hợp: buồn ngủ, vật cản, biển báo, làn đường.' },
  { step: '5', title: 'Lái xe an toàn', desc: 'Hệ thống tự động giám sát và cảnh báo khi phát hiện nguy hiểm.' },
];

const POLICIES = [
  { icon: 'shield-lock-outline', title: 'Bảo mật dữ liệu', desc: 'Dữ liệu hành trình được mã hóa theo tiêu chuẩn cao nhất.' },
  { icon: 'map-marker-outline', title: 'Quyền riêng tư vị trí', desc: 'Dữ liệu vị trí chỉ dùng để cung cấp thông tin thời tiết và lưu lịch sử.' },
  { icon: 'camera-outline', title: 'Dữ liệu camera', desc: 'Hình ảnh xử lý cục bộ trên thiết bị, không lưu lên server.' },
  { icon: 'delete-outline', title: 'Xóa dữ liệu', desc: 'Bạn có quyền yêu cầu xóa toàn bộ dữ liệu bất cứ lúc nào.' },
];

export default function HandbookScreen() {
  const [tab, setTab] = useState<Tab>('introduce');

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScreenHeader title="📖 Sổ tay ADAS" subtitle="Hướng dẫn sử dụng hệ thống" />

      {/* Tab switcher */}
      <View className="px-4 py-3 bg-white border-b border-gray-100">
        <SegmentedButtons
          value={tab}
          onValueChange={v => setTab(v as Tab)}
          buttons={[
            { value: 'introduce', label: 'Giới thiệu', icon: 'information-outline' },
            { value: 'guide', label: 'Hướng dẫn', icon: 'book-open-outline' },
            { value: 'policy', label: 'Chính sách', icon: 'file-document-outline' },
          ]}
        />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 14 }}
        showsVerticalScrollIndicator={false}>

        {/* ── Introduce ── */}
        {tab === 'introduce' && (
          <>
            <Card className="rounded-2xl bg-blue-600">
              <Card.Content className="items-center py-8 gap-3">
                <Text className="text-5xl">🛡️</Text>
                <Text variant="titleLarge" className="text-white font-black tracking-wide">
                  ADAS
                </Text>
                <Text variant="bodyMedium" className="text-blue-100 text-center leading-6">
                  Advanced Driver Assistance System — Hệ thống hỗ trợ lái xe nâng cao sử dụng AI để đảm bảo an toàn giao thông.
                </Text>
              </Card.Content>
            </Card>

            <Text variant="titleMedium" className="font-bold text-gray-800">
              Các tính năng chính
            </Text>

            {FEATURES.map(f => (
              <Card key={f.title} className="rounded-xl">
                <Card.Content className="flex-row gap-3 py-3">
                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center"
                    style={{ backgroundColor: f.color + '20' }}>
                    <Icon name={f.icon} size={20} color={f.color} />
                  </View>
                  <View className="flex-1">
                    <Text variant="labelLarge" className="font-bold text-gray-800 mb-0.5">
                      {f.title}
                    </Text>
                    <Text variant="bodySmall" className="text-gray-600 leading-5">
                      {f.desc}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </>
        )}

        {/* ── Guide ── */}
        {tab === 'guide' && (
          <>
            <Card className="rounded-xl bg-blue-50">
              <Card.Content>
                <Text variant="bodyMedium" className="text-blue-700 font-medium">
                  Làm theo các bước sau để bắt đầu sử dụng ADAS
                </Text>
              </Card.Content>
            </Card>

            {GUIDE_STEPS.map((s, i) => (
              <View key={s.step} className="flex-row gap-3">
                <View
                  className="w-9 h-9 rounded-full items-center justify-center shrink-0"
                  style={{ backgroundColor: i === 0 ? '#1D6FE8' : '#e5e7eb' }}>
                  <Text
                    variant="titleSmall"
                    style={{ color: i === 0 ? 'white' : '#6b7280', fontWeight: '800' }}>
                    {s.step}
                  </Text>
                </View>
                <Card className="flex-1 rounded-xl">
                  <Card.Content className="py-3">
                    <Text variant="labelLarge" className="font-bold text-gray-800 mb-0.5">
                      {s.title}
                    </Text>
                    <Text variant="bodySmall" className="text-gray-600 leading-5">
                      {s.desc}
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            ))}
          </>
        )}

        {/* ── Policy ── */}
        {tab === 'policy' && (
          <>
            <Text variant="bodyMedium" className="text-gray-500 italic leading-6">
              Chúng tôi cam kết bảo vệ quyền riêng tư và an toàn dữ liệu của bạn.
            </Text>

            {POLICIES.map(p => (
              <Card key={p.title} className="rounded-xl">
                <Card.Content className="flex-row gap-3 py-3">
                  <Icon name={p.icon} size={26} color="#1D6FE8" />
                  <View className="flex-1">
                    <Text variant="labelLarge" className="font-bold text-gray-800 mb-0.5">
                      {p.title}
                    </Text>
                    <Text variant="bodySmall" className="text-gray-600 leading-5">
                      {p.desc}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))}

            <Card className="rounded-xl bg-gray-100">
              <Card.Content className="items-center">
                <Text variant="labelSmall" className="text-gray-400">
                  Phiên bản chính sách: 1.0 • Cập nhật: 01/2025
                </Text>
              </Card.Content>
            </Card>
          </>
        )}

        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
}
