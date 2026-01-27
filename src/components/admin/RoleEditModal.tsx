import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Switch, Divider, useTheme, IconButton } from 'react-native-paper';

interface RoleEditModalProps {
  visible: boolean;
  onDismiss: () => void;
  roleData?: any; // Dữ liệu vai trò cần sửa (nếu có)
  onSaveSuccess?: () => void;
}

const RoleEditModal = ({ visible, onDismiss, roleData }: RoleEditModalProps) => {
  const theme = useTheme();

  // State quản lý Form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Hàm xử lý khi bấm Lưu
  const handleSave = () => {
    // TODO: Gọi API create hoặc update role tại đây
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
        {/* 1. Header Modal - Blue Theme */}
        <View
          style={{
            backgroundColor: '#1E88E5',
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View className="flex-row items-center gap-2">
            <IconButton
              icon={roleData ? "pencil" : "plus-circle"}
              iconColor="white"
              size={24}
              style={{ margin: 0 }}
            />
            <Text variant="titleLarge" style={{ color: 'white', fontWeight: '700' }}>
              {roleData ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
            </Text>
          </View>

          {/* Icon đóng với press effect (màu đỏ khi nhấn) */}
          <Pressable
            onPress={onDismiss}
            style={({ pressed }) => ({
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: pressed ? '#EF5350' : 'rgba(255, 255, 255, 0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <IconButton
              icon="close"
              iconColor="white"
              size={20}
              style={{ margin: 0 }}
            />
          </Pressable>
        </View>

        {/* 2. Nội dung Form (ScrollView) */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20 }}
        >
          {/* Section: Thông tin cơ bản */}
          <View className="mb-6">
            <View className="flex-row items-center gap-2 mb-3">
              <View style={{ width: 4, height: 20, backgroundColor: '#1E88E5', borderRadius: 2 }} />
              <Text variant="titleMedium" style={{ fontWeight: '700', color: '#1E88E5' }}>
                Thông tin cơ bản
              </Text>
            </View>

            {/* Input Tên */}
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

            {/* Input Mô tả */}
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

            {/* Row: Level và Status */}
            <View className="flex-row gap-3">
              {/* Input Level */}
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
                />
              </View>

              {/* Switch Trạng thái */}
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3F2FD',
                  borderRadius: 8,
                  padding: 12,
                  backgroundColor: '#F5FAFF',
                  justifyContent: 'center',
                }}
              >
                <Text variant="labelSmall" style={{ color: '#1E88E5', marginBottom: 6, fontWeight: '600' }}>
                  Trạng thái
                </Text>
                <View className="flex-row items-center justify-between">
                  <Text style={{
                    color: isActive ? '#4CAF50' : '#9E9E9E',
                    fontWeight: '600',
                    fontSize: 13
                  }}>
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

          <Divider style={{ backgroundColor: '#E3F2FD', height: 1 }} />

          {/* Section: Phân quyền chức năng */}
          <View className="mt-6">
            <View className="flex-row items-center gap-2 mb-3">
              <View style={{ width: 4, height: 20, backgroundColor: '#1E88E5', borderRadius: 2 }} />
              <Text variant="titleMedium" style={{ fontWeight: '700', color: '#1E88E5' }}>
                Phân quyền chức năng
              </Text>
            </View>

            {/* Placeholder cho permissions */}
            <View
              style={{
                backgroundColor: '#F5FAFF',
                padding: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: '#BBDEFB',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton
                icon="shield-lock"
                iconColor="#1E88E5"
                size={40}
                style={{ margin: 0, marginBottom: 8 }}
              />
              <Text style={{ color: '#64B5F6', textAlign: 'center', fontSize: 14, fontWeight: '600' }}>
                Danh sách quyền sẽ hiển thị tại đây
              </Text>
              <Text style={{ color: '#90CAF9', fontSize: 12, marginTop: 4, textAlign: 'center' }}>
                Dữ liệu lấy từ API Permissions List
              </Text>
            </View>
          </View>

          {/* Khoảng trống để không bị che bởi footer */}
          <View className="h-6" />
        </ScrollView>

        {/* 3. Footer Buttons - Blue Theme */}
        <View
          style={{
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: '#E3F2FD',
            backgroundColor: '#FAFAFA',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            flexDirection: 'row',
            gap: 12,
          }}
        >
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