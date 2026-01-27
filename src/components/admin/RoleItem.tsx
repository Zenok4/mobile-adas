import React from 'react';
import { View } from 'react-native';
import { Card, Text, Chip, IconButton, Divider, useTheme } from 'react-native-paper';

// --- 1. TẠO DỮ LIỆU CỨNG ĐỂ TEST GIAO DIỆN ---
const DEMO_ROLE = {
  id: 1,
  name: "Quản trị viên cấp cao",
  description: "Có toàn quyền truy cập hệ thống, quản lý người dùng và cấu hình.",
  level: 99,
  is_active: true,
  created_at: "2025-10-20T08:30:00Z"
};

interface RoleItemProps {
  role?: any;
  onEdit: () => void;
  onDelete: () => void;
}

const RoleItem = ({ role, onEdit, onDelete }: RoleItemProps) => {
  const theme = useTheme();

  // --- 2. SỬ DỤNG DỮ LIỆU DEMO NẾU KHÔNG CÓ ROLE TRUYỀN VÀO ---
  const item = role || DEMO_ROLE;

  // Hàm format ngày tháng
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <Card
      className="mb-3 mx-1"
      mode="elevated"
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      <Card.Content style={{ paddingBottom: 12 }}>
        {/* Header: Tên và Trạng thái */}
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1 mr-3">
            <Text
              variant="titleMedium"
              style={{
                fontWeight: '700',
                color: '#1E293B',
                fontSize: 16,
                lineHeight: 22
              }}
            >
              {item.name}
            </Text>
          </View>

          <Chip
            mode="flat"
            style={{
              backgroundColor: item.is_active ? '#DCFCE7' : '#FEF3C7',
              height: 28,
            }}
            textStyle={{
              color: item.is_active ? '#15803D' : '#B45309',
              fontSize: 12,
              fontWeight: '600'
            }}
            icon={item.is_active ? "check-circle" : "pause-circle"}
          >
            {item.is_active ? "Kích hoạt" : "Tạm ngưng"}
          </Chip>
        </View>

        {/* Mô tả */}
        <Text
          variant="bodyMedium"
          style={{ color: '#64748B', lineHeight: 20, marginBottom: 12 }}
          numberOfLines={2}
        >
          {item.description}
        </Text>

        {/* Thông tin phụ: Level & Ngày tạo */}
        <View
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: 8,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#E2E8F0',
          }}
        >
          {/* Level */}
          <View className="flex-row items-center gap-1">
            <IconButton
              icon="star"
              size={16}
              iconColor="#1E88E5"
              style={{ margin: 0 }}
            />
            <Text variant="bodySmall" style={{ color: '#475569' }}>
              Cấp độ: <Text style={{ fontWeight: '700', color: '#1E88E5' }}>{item.level}</Text>
            </Text>
          </View>

          <View style={{ width: 1, height: 20, backgroundColor: '#CBD5E1' }} />

          {/* Ngày tạo */}
          <View className="flex-row items-center gap-1">
            <IconButton
              icon="calendar"
              size={16}
              iconColor="#64748B"
              style={{ margin: 0 }}
            />
            <Text variant="bodySmall" style={{ color: '#64748B' }}>
              {formatDate(item.created_at)}
            </Text>
          </View>
        </View>
      </Card.Content>

      <Divider style={{ backgroundColor: '#E2E8F0' }} />

      {/* Nút thao tác */}
      <Card.Actions
        style={{
          justifyContent: 'flex-end',
          paddingVertical: 4,
          paddingHorizontal: 8,
          minHeight: 48,
          backgroundColor: '#F8FAFC',
        }}
      >
        <View className="flex-row gap-1">
          {/* Nút Edit */}
          <IconButton
            icon="pencil"
            size={20}
            iconColor="#1E88E5"
            onPress={onEdit}
            style={{
              margin: 0,
              backgroundColor: '#E3F2FD',
            }}
            containerColor="#E3F2FD"
          />

          {/* Nút Delete */}
          <IconButton
            icon="trash-can"
            size={20}
            iconColor="#EF5350"
            onPress={onDelete}
            style={{
              margin: 0,
              backgroundColor: '#FFEBEE',
            }}
            containerColor="#FFEBEE"
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

export default RoleItem;