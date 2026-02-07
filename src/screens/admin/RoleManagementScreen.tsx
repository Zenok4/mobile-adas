import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { Searchbar, FAB, ActivityIndicator, Button, Chip, IconButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import RoleItem from '../../components/admin/RoleItem';
import RoleEditModal from '../../components/admin/RoleEditModal';
import { authService } from '../../services/authService';

const RoleManagementScreen = () => {
  // --- CẤU HÌNH ---
  const ITEMS_PER_PAGE = 10;

  // --- STATE ---
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // State lọc trạng thái: null (Tất cả) | true (Kích hoạt) | false (Tạm ngưng)
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);
  // State Phân trang
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ITEMS_PER_PAGE,
    total: 0,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  // --- API CALL ---
  const fetchRoles = async (pageToLoad: number = pagination.page) => {
    setLoading(true);
    try {
      const data = await authService.listRoles({
        page: pageToLoad,
        limit: ITEMS_PER_PAGE,
        name: searchQuery,
        is_active: filterStatus
      });

      setRoles(data.roles);
      setPagination(prev => ({
        ...prev,
        page: pageToLoad,
        total: data.total
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchRoles(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery, filterStatus]);

  useFocusEffect(
    useCallback(() => {
      fetchRoles(pagination.page);
    }, [])
  );

  // --- HANDLERS ---
  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    if (newPage > 0 && newPage <= totalPages) {
      fetchRoles(newPage);
    }
  };

  const handleAdd = () => { setSelectedRole(null); setModalVisible(true); };
  const handleEdit = (role: any) => { setSelectedRole(role); setModalVisible(true); };
  const handleDelete = (roleId: number) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc muốn xóa?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", style: "destructive", onPress: async () => {
          try {
            await authService.deleteRole(roleId);
            fetchRoles(pagination.page);
          } catch (e) { Alert.alert("Lỗi", "Xóa thất bại"); }
      }}
    ]);
  };

  // --- UI PHÂN TRANG (Footer) ---
  const renderPagination = () => {
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    if (pagination.total === 0) return null;

    return (
      <View className="flex-row justify-between items-center py-4 px-4 bg-gray-50 border-t border-gray-200 mb-20">
        <Button
          mode="outlined"
          onPress={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
          icon="chevron-left"
          contentStyle={{ height: 40, alignItems: 'center', justifyContent: 'center' }}
          style={{ justifyContent: 'center' }}
        >
          Trước
        </Button>

        <Text className="text-gray-600 font-medium">
          Trang {pagination.page} / {totalPages || 1}
        </Text>

        <Button
          mode="outlined"
          onPress={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page >= totalPages}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse', height: 40, alignItems: 'center', justifyContent: 'center' }}
          style={{ justifyContent: 'center' }}
        >
          Sau
        </Button>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 pt-4 pb-5 px-4 shadow-md">
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-1">
            <Text className="text-white text-3xl font-bold mb-1">Quản lý vai trò</Text>
            <Text className="text-white/80 text-base">Phân quyền hệ thống</Text>
          </View>
          <View className="bg-white/20 rounded-2xl px-4 py-2 border border-white/30">
            <Text className="text-white/80 text-xs font-bold mb-0.5">Tổng số</Text>
            <Text className="text-white text-2xl font-bold text-center">{pagination.total}</Text>
          </View>
        </View>

        <Searchbar
          placeholder="Tìm kiếm..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          className="bg-white rounded-xl"
          iconColor="#1E88E5"
        />

        {/* --- Filter Quick Actions Chips --- */}
        <View className="flex-row gap-2 mt-3">
          <Chip
            mode="flat"
            icon="shield-star"
            className="bg-white/20"
            textStyle={{ color: 'green', fontSize: 12 }}
            onPress={() => setFilterStatus(null)}
            selected={filterStatus === null}
            showSelectedOverlay={true}
          >
            Tất cả vai trò
          </Chip>
          <Chip
            mode="flat"
            icon="account-check"
            className="bg-white/15"
            textStyle={{ color: 'green', fontSize: 12 }}
            onPress={() => setFilterStatus(true)}
            selected={filterStatus === true}            
          >
            Kích hoạt
          </Chip>
          <Chip
            mode="flat"
            icon="account-off"
            className="bg-white/15"
            textStyle={{ color: 'red', fontSize: 12 }}
            onPress={() => setFilterStatus(false)}
            selected={filterStatus === false}            
          >
            Tạm ngưng
          </Chip>
        </View>
        {/* --------------------------------------------- */}

      </View>

      {/* List */}
      <View className="flex-1">
        {loading ? (
          <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#1E88E5" /></View>
        ) : (
          <FlatList
            data={roles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RoleItem role={item} onEdit={() => handleEdit(item)} onDelete={() => handleDelete(item.id)} />
            )}
            ListFooterComponent={renderPagination}
            // Thêm ListEmptyComponent khi không có dữ liệu
            ListEmptyComponent={
                <View className="items-center justify-center mt-20 px-6">
                  <View className="w-25 h-25 rounded-full bg-blue-100 justify-center items-center mb-4">
                    <IconButton icon="shield-alert-outline" size={48} iconColor="#1E88E5" />
                  </View>
                  <Text className="text-slate-900 text-lg font-bold mb-2 text-center">Chưa có vai trò nào</Text>
                  <Button mode="contained" onPress={handleAdd} buttonColor="#1E88E5">Thêm ngay</Button>
                </View>
            }
            contentContainerStyle={{ paddingTop: 12, paddingHorizontal: 12 }}
          />
        )}
      </View>

      <FAB icon="plus" className="absolute bottom-5 right-5 bg-blue-600 rounded-2xl" color="white" onPress={handleAdd} />

      <RoleEditModal
        visible={modalVisible}
        roleData={selectedRole}
        onDismiss={() => setModalVisible(false)}
        onSaveSuccess={() => fetchRoles(pagination.page)}
        existingRoles={roles}   // Truyền danh sách để check trùng tên
        currentUserLevel={99}
      />
    </View>
  );
};

export default RoleManagementScreen;