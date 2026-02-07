import React from 'react';
import { View, Text } from 'react-native';
import { Card, Chip, IconButton, Divider } from 'react-native-paper';

interface RoleItemProps {
  role: any;
  onEdit: () => void;
  onDelete: () => void;
}

const RoleItem = ({ role, onEdit, onDelete }: RoleItemProps) => {
  if (!role) return null;

  // Giữ nguyên style hiển thị
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="mb-3 mx-1 bg-white rounded-xl shadow-md">
      <Card.Content className="pb-3 bg-blue-50 ">
        {/* Header: Name and Status */}
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1 mr-3">
            <Text className="text-slate-900 text-base font-bold leading-6"
              numberOfLines={2}
            >
              {role.name}
            </Text>
          </View>

          <Chip
            mode="flat"
            className={`h-8 justify-center ${role.is_active ? 'bg-green-100' : 'bg-amber-100'}`}
            textStyle={{
              color: role.is_active ? '#15803D' : '#B45309',
              fontSize: 12,
              fontWeight: '600',
              lineHeight: 12,
              marginVertical: 0,
            }}
            icon={role.is_active ? "check-circle" : "pause-circle"}
          >
            {role.is_active ? "Kích hoạt" : "Tạm ngưng"}
          </Chip>
        </View>

        {/* Description */}
        <Text className="text-slate-500 leading-5 mb-3" numberOfLines={2}>
          {role.description || "Chưa có mô tả"}
        </Text>

        {/* Info: Level & Created Date */}
        <View className="bg-slate-50 rounded-lg p-2.5 flex-row justify-between items-center border border-slate-200">
          {/* Level */}
          <View className="flex-row items-center gap-1">
            <IconButton icon="star" size={16} iconColor="#1E88E5" className="m-0" />
            <Text className="text-slate-600 text-sm">
              Cấp độ: <Text className="font-bold text-blue-600">{role.level ?? 0}</Text>
            </Text>
          </View>

          <View className="w-px h-5 bg-slate-300" />

          {/* Created Date */}
          <View className="flex-row items-center gap-1">
            <IconButton icon="calendar" size={16} iconColor="#64748B" className="m-0" />
            <Text className="text-slate-500 text-sm">
              {formatDate(role.created_at)}
            </Text>
          </View>
        </View>
      </Card.Content>

      <Divider className="bg-slate-200" />

      {/* Action Buttons */}
      <Card.Actions className="justify-end py-1 px-2 min-h-[48px] bg-slate-50">
        <View className="flex-row gap-1">
          <IconButton
            icon="pencil"
            size={20}
            iconColor="#1E88E5"
            onPress={onEdit}
            className="m-0 bg-blue-50"
            containerColor="#E3F2FD"
          />
          <IconButton
            icon="trash-can"
            size={20}
            iconColor="#EF5350"
            onPress={onDelete}
            className="m-0 bg-red-50"
            containerColor="#FFEBEE"
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

export default RoleItem;