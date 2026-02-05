import React, { useState } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { Searchbar, FAB, ActivityIndicator, IconButton, Chip } from 'react-native-paper';
import RoleItem from '../../components/admin/RoleItem';
import RoleEditModal from '../../components/admin/RoleEditModal';

const RoleManagementScreen = () => {
  // --- STATE ---
  const [roles, setRoles] = useState<any[]>([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal Control State
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  // --- HANDLERS ---

  // Open modal for adding new role
  const handleAdd = () => {
    setSelectedRole(null);
    setModalVisible(true);
  };

  // Open modal for editing role
  const handleEdit = (role: any) => {
    setSelectedRole(role);
    setModalVisible(true);
  };

  // Handle delete
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
            // TODO: Call API delete and reload list
          }
        }
      ]
    );
  };

  // Refresh list function (will call API)
  const handleRefresh = () => {
    console.log("Refresh danh sách roles");
    // TODO: Call API to reload list
  };

  // --- RENDER ---
  return (
    <View className="flex-1 bg-gray-50">

      {/* 1. Header Area - Blue Theme */}
      <View className="bg-blue-600 pt-4 pb-5 px-4 shadow-md">
        {/* Title & Stats Row */}
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-1">
            <Text className="text-white text-3xl font-bold mb-1">
              Quản lý vai trò
            </Text>
            <Text className="text-white/80 text-base">
              Phân quyền và cấu hình hệ thống
            </Text>
          </View>

          {/* Stats Badge */}
          <View className="bg-white/20 rounded-2xl px-4 py-2 border border-white/30">
            <Text className="text-white/80 text-xs font-bold mb-0.5">
              Tổng số
            </Text>
            <Text className="text-white text-2xl font-bold text-center">
              {roles.filter(r => r !== null).length}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <Searchbar
          placeholder="Tìm kiếm theo tên vai trò..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          className="bg-white rounded-xl"
          style={{ elevation: 0 }}
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
            className="bg-white/20"
            textStyle={{ color: 'green', fontSize: 12 }}
            onPress={handleRefresh}
          >
            Tất cả vai trò
          </Chip>
          <Chip
            mode="flat"
            icon="account-check"
            className="bg-white/15"
            textStyle={{ color: 'green', fontSize: 12 }}
          >
            Đang kích hoạt
          </Chip>
        </View>
      </View>

      {/* 2. Roles List (Body) */}
      <View className="flex-1">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator
              animating={true}
              size="large"
              color="#1E88E5"
            />
            <Text className="text-slate-500 mt-3">
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
            // Empty State UI
            ListEmptyComponent={
              <View className="items-center justify-center mt-20 px-6">
                <View className="w-25 h-25 rounded-full bg-blue-100 justify-center items-center mb-4">
                  <IconButton
                    icon="shield-alert-outline"
                    size={48}
                    iconColor="#1E88E5"
                  />
                </View>
                <Text className="text-slate-900 text-lg font-bold mb-2 text-center">
                  Chưa có vai trò nào
                </Text>
                <Text className="text-slate-500 text-center leading-5 mb-5">
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

      {/* 3. Floating Add Button */}
      <FAB
        icon="plus"
        label="Thêm vai trò"
        className="absolute bottom-5 right-5 bg-blue-600 rounded-2xl"
        color="white"
        onPress={handleAdd}
        visible={!loading}
      />

      {/* 4. Modal (Show/Hide) */}
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