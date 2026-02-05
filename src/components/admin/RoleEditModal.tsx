import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { Modal, Portal, TextInput, Button, Switch, Divider, IconButton } from 'react-native-paper';

interface RoleEditModalProps {
  visible: boolean;
  onDismiss: () => void;
  roleData?: any;
  onSaveSuccess?: () => void;
}

const RoleEditModal = ({ visible, onDismiss, roleData }: RoleEditModalProps) => {
  // Form State Management
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSave = () => {
    console.log("Lưu dữ liệu:", { name, description, level, isActive });
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: 'white',
          margin: 20,
          borderRadius: 16,
          height: '85%',
          padding: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        {/* 1. Modal Header - Blue Theme */}
        <View className="bg-blue-600 px-5 py-4 rounded-t-2xl flex-row justify-between items-center">
          <View className="flex-row items-center gap-2">
            <IconButton
              icon={roleData ? "pencil" : "plus-circle"}
              iconColor="white"
              size={24}
              className="m-0"
            />
            <Text className="text-white text-2xl font-bold">
              {roleData ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
            </Text>
          </View>

          {/* Close Icon with Press Effect */}
          <Pressable
            onPress={onDismiss}
            className="w-9 h-9 rounded-full justify-center items-center active:bg-red-500"
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#EF5350' : 'rgba(255, 255, 255, 0.2)',
            })}
          >
            <IconButton
              icon="close"
              iconColor="white"
              size={20}
              className="m-0"
            />
          </Pressable>
        </View>

        {/* 2. Form Content (ScrollView) */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20 }}
        >
          {/* Section: Basic Information */}
          <View className="mb-6">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-1 h-5 bg-blue-600 rounded" />
              <Text className="text-blue-600 text-lg font-bold">
                Thông tin cơ bản
              </Text>
            </View>

            {/* Name Input */}
            <TextInput
              label="Tên vai trò"
              mode="outlined"
              value={name}
              onChangeText={setName}
              className="mb-4 bg-white"
              placeholder="Ví dụ: Quản trị viên, Nhân viên..."
              outlineColor="#E3F2FD"
              activeOutlineColor="#1E88E5"
              left={<TextInput.Icon icon="account-circle" color="#1E88E5" />}
            />

            {/* Description Input */}
            <TextInput
              label="Mô tả vai trò"
              mode="outlined"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              className="mb-4 bg-white"
              placeholder="Nhập mô tả chi tiết về vai trò này..."
              outlineColor="#E3F2FD"
              activeOutlineColor="#1E88E5"
              left={<TextInput.Icon icon="text-box" color="#1E88E5" />}
            />

            {/* Row: Level and Status */}
            <View className="flex-row gap-3">
              {/* Level Input */}
              <View className="flex-1">
                <TextInput
                  label="Cấp độ"
                  mode="outlined"
                  keyboardType="numeric"
                  value={level}
                  onChangeText={setLevel}
                  className="bg-white"
                  placeholder="0-100"
                  outlineColor="#E3F2FD"
                  activeOutlineColor="#1E88E5"
                  left={<TextInput.Icon icon="star" color="#1E88E5" />}
                  style={{ height: 60 }}
                />
              </View>

              {/* Status Switch */}
              <View className="flex-1 mt-2 border border-blue-100 rounded px-2.5 py-1.5 bg-blue-50 justify-center">
                <Text className="text-blue-600 text-xs font-semibold mb-1">
                  Trạng thái
                </Text>
                <View className="flex-row items-center justify-between">
                  <Text className={`font-semibold text-sm ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                    {isActive ? "✓ Kích hoạt" : "○ Tạm ngưng"}
                  </Text>
                  <Switch
                    value={isActive}
                    onValueChange={setIsActive}
                    color="#1E88E5"
                  />
                </View>
              </View>
            </View>
          </View>

          <Divider className="bg-blue-100 h-px" />

          {/* Section: Permissions */}
          <View className="mt-6">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-1 h-5 bg-blue-600 rounded" />
              <Text className="text-blue-600 text-lg font-bold">
                Phân quyền chức năng
              </Text>
            </View>

            {/* Placeholder for Permissions */}
            <View className="bg-blue-50 p-6 rounded-xl border-2 border-dashed border-blue-200 items-center justify-center">
              <IconButton
                icon="shield-lock"
                iconColor="#1E88E5"
                size={40}
                className="m-0 mb-2"
              />
              <Text className="text-blue-400 text-center text-sm font-semibold">
                Danh sách quyền sẽ hiển thị tại đây
              </Text>
              <Text className="text-blue-300 text-xs mt-1 text-center">
                Dữ liệu lấy từ API Permissions List
              </Text>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View className="h-6" />
        </ScrollView>

        {/* 3. Footer Buttons - Blue Theme */}
        <View className="p-4 border-t border-blue-100 bg-gray-50 rounded-b-2xl flex-row gap-3">
          <Button
            mode="outlined"
            onPress={onDismiss}
            className="flex-1"
            textColor="#757575"
            style={{ borderColor: '#E0E0E0', borderRadius: 8 }}
            icon="close-circle"
          >
            Hủy bỏ
          </Button>
          <Button
            mode="contained"
            onPress={handleSave}
            className="flex-1"
            style={{ backgroundColor: '#1E88E5', borderRadius: 8 }}
            icon="content-save"
            buttonColor="#1E88E5"
          >
            Lưu lại
          </Button>
        </View>

      </Modal>
    </Portal>
  );
};

export default RoleEditModal;