import React, { useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Text, Searchbar, FAB, ActivityIndicator, IconButton, Chip } from 'react-native-paper';
import RoleItem from '../../components/admin/RoleItem';
import RoleEditModal from '../../components/admin/RoleEditModal';

const RoleManagementScreen = () => {
  // --- STATE ---
  const [roles, setRoles] = useState<any[]>([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // State điều khiển Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  // --- HANDLERS ---

  // Mở modal thêm mới
  const handleAdd = () => {
    setSelectedRole(null);
    setModalVisible(true);
  };

  // Mở modal chỉnh sửa
  const handleEdit = (role: any) => {
    setSelectedRole(role);
    setModalVisible(true);
  };

  // Xử lý xóa
  const handleDelete = (roleId: number) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc muốn xóa vai trò này? Hành động này không thể hoàn tác.",
      [
        {
          text: "Hủy bỏ",
          style: "cancel"
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            console.log("Call API Delete Role ID:", roleId);
            // TODO: Gọi API delete và load lại danh sách
          }
        }
      ]
    );
  };

  // Hàm refresh danh sách (sẽ gọi API)
  const handleRefresh = () => {
    console.log("Refresh danh sách roles");
    // TODO: Gọi API load lại danh sách
  };

  // --- RENDER ---
  return (
    <View className="flex-1 bg-gray-50">

      {/* 1. Header Area - Blue Theme */}
      <View
        style={{
          backgroundColor: '#1E88E5',
          paddingTop: 16,
          paddingBottom: 20,
          paddingHorizontal: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        {/* Title & Stats Row */}
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-1">
            <Text
              variant="headlineMedium"
              style={{
                fontWeight: '700',
                color: 'white',
                marginBottom: 4
              }}
            >
              Quản lý vai trò
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              Phân quyền và cấu hình hệ thống
            </Text>
          </View>

          {/* Stats Badge */}
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <Text
              variant="labelSmall"
              style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: 2 }}
            >
              Tổng số
            </Text>
            <Text
              variant="titleLarge"
              style={{ color: 'white', fontWeight: '700', textAlign: 'center' }}
            >
              {roles.filter(r => r !== null).length}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <Searchbar
          placeholder="Tìm kiếm theo tên vai trò..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            elevation: 0,
          }}
          inputStyle={{ fontSize: 14 }}
          iconColor="#1E88E5"
          icon="magnify"
          clearIcon="close-circle"
        />

        {/* Quick Actions */}
        <View className="flex-row gap-2 mt-3">
          <Chip
            mode="flat"
            icon="shield-star"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            textStyle={{ color: 'white', fontSize: 12 }}
            onPress={handleRefresh}
          >
            Tất cả vai trò
          </Chip>
          <Chip
            mode="flat"
            icon="account-check"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            textStyle={{ color: 'white', fontSize: 12 }}
          >
            Đang kích hoạt
          </Chip>
        </View>
      </View>

      {/* 2. Danh sách Roles (Body) */}
      <View className="flex-1">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator
              animating={true}
              size="large"
              color="#1E88E5"
            />
            <Text
              variant="bodyMedium"
              style={{ color: '#64748B', marginTop: 12 }}
            >
              Đang tải dữ liệu...
            </Text>
          </View>
        ) : (
          <FlatList
            data={roles}
            keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
            renderItem={({ item }) => (
              <RoleItem
                role={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item?.id)}
              />
            )}
            // Giao diện khi chưa có dữ liệu (Empty State)
            ListEmptyComponent={
              <View className="items-center justify-center mt-20 px-6">
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: '#E3F2FD',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}
                >
                  <IconButton
                    icon="shield-alert-outline"
                    size={48}
                    iconColor="#1E88E5"
                  />
                </View>
                <Text
                  variant="titleMedium"
                  style={{
                    color: '#1E293B',
                    fontWeight: '700',
                    marginBottom: 8,
                    textAlign: 'center'
                  }}
                >
                  Chưa có vai trò nào
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{
                    color: '#64748B',
                    textAlign: 'center',
                    lineHeight: 20,
                    marginBottom: 20
                  }}
                >
                  Bắt đầu bằng cách tạo vai trò đầu tiên{'\n'}để phân quyền cho hệ thống
                </Text>
                <IconButton
                  icon="plus-circle"
                  size={32}
                  iconColor="#1E88E5"
                  mode="contained"
                  containerColor="#E3F2FD"
                  onPress={handleAdd}
                />
              </View>
            }
            contentContainerStyle={{
              paddingTop: 12,
              paddingHorizontal: 12,
              paddingBottom: 100
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* 3. Nút nổi Thêm mới (Floating Action Button) */}
      <FAB
        icon="plus"
        label="Thêm vai trò"
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#1E88E5',
          borderRadius: 16,
        }}
        color="white"
        onPress={handleAdd}
        visible={!loading}
      />

      {/* 4. Modal (Ẩn/Hiện) */}
      <RoleEditModal
        visible={modalVisible}
        roleData={selectedRole}
        onDismiss={() => setModalVisible(false)}
        onSaveSuccess={handleRefresh}
      />
    </View>
  );
};

export default RoleManagementScreen;