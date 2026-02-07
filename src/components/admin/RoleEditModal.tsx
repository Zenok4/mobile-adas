import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, ScrollView, Pressable, Alert } from 'react-native';
import { Modal, Portal, TextInput, Button, Switch, Divider, IconButton, Checkbox, Searchbar, ActivityIndicator } from 'react-native-paper';
import { authService, RolePayload } from '../../services/authService';

interface RoleEditModalProps {
  visible: boolean;
  onDismiss: () => void;
  roleData?: any;
  onSaveSuccess?: () => void;
  existingRoles?: any[]; 
  currentUserLevel?: number;
}

const RoleEditModal = ({
  visible,
  onDismiss,
  roleData,
  onSaveSuccess,
  existingRoles = [],
  currentUserLevel = 99
}: RoleEditModalProps) => {

  // --- STATE ---
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('1');
  const [isActive, setIsActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // --- PERMISSION STATE ---
  const [allPermissions, setAllPermissions] = useState<any[]>([]);
  const [selectedPermIds, setSelectedPermIds] = useState<number[]>([]);
  const [searchPerm, setSearchPerm] = useState('');
  const [loadingPerms, setLoadingPerms] = useState(false);

  // Load Data
  useEffect(() => {
    if (visible) {
      if (roleData) {
        setName(roleData.name || '');
        setDescription(roleData.description || '');
        setLevel(roleData.level?.toString() || '1');
        setIsActive(roleData.is_active ?? true);
      } else {
        setName('');
        setDescription('');
        setLevel('1');
        setIsActive(true);
      }
      loadPermissionData();
    }
  }, [visible, roleData]);

  const loadPermissionData = async () => {
    setLoadingPerms(true);
    try {
      const perms = await authService.listPermissions();
      setAllPermissions(perms);

      if (roleData?.id) {
        const roleDetail = await authService.getRole(roleData.id, true);
        const currentPerms = roleDetail.role?.permissions || roleDetail.permissions || roleDetail.data?.permissions || [];
        const currentIds = currentPerms.map((p: any) => p.id);
        setSelectedPermIds(currentIds);
      } else {
        setSelectedPermIds([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPerms(false);
    }
  };

  // Filter Search
  const filteredPermissions = useMemo(() => {
    if (!searchPerm) return allPermissions;
    return allPermissions.filter(p =>
      (p.description || '').toLowerCase().includes(searchPerm.toLowerCase()) ||
      (p.code || '').toLowerCase().includes(searchPerm.toLowerCase()) ||
      (p.name || '').toLowerCase().includes(searchPerm.toLowerCase())
    );
  }, [allPermissions, searchPerm]);

  const togglePerm = (id: number) => {
    if (selectedPermIds.includes(id)) {
      setSelectedPermIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedPermIds(prev => [...prev, id]);
    }
  };

  // --- LOGIC SAVE ---
  const handleSave = async () => {
    const trimmedName = name.trim();
    const currentLevelInt = parseInt(level) || 1;

    // 1. Validate Tên rỗng
    if (!trimmedName) {
      Alert.alert("Cảnh báo", "Tên vai trò không được để trống!");
      return;
    }

    // 2. Validate Trùng tên 
    const isDuplicate = existingRoles?.some(r =>
        r.name.trim().toLowerCase() === trimmedName.toLowerCase() &&
        r.id !== roleData?.id // Nếu đang sửa thì bỏ qua chính nó (để không tự báo trùng với mình)
    );

    if (isDuplicate) {
      Alert.alert(
        "Tên vai trò đã tồn tại",
        `Tên "${trimmedName}" đã được sử dụng trong hệ thống. Vui lòng chọn tên khác.`
      );
      return; // Dừng lại ngay lập tức
    }

    // 3. Validate Quyền rỗng
    if (selectedPermIds.length === 0) {
      Alert.alert("Cảnh báo", "Vui lòng chọn ít nhất một quyền cho vai trò!");
      return;
    }

    // 4. Validate Level
    if (currentLevelInt >= currentUserLevel) {
      Alert.alert(
        "Lỗi quyền hạn",
        `Bạn không thể tạo hoặc gán level (${currentLevelInt}) cao hơn hoặc bằng level của chính bạn (${currentUserLevel}).`
      );
      return;
    }

    try {
      setIsSaving(true);
      const payload: RolePayload = {
        name: trimmedName,
        description: description,
        level: currentLevelInt,
        is_active: isActive,
        current_user_level: currentUserLevel
      };

      let targetRoleId = roleData?.id;

      // Bước 1: Lưu Role
      if (roleData?.id) {
        await authService.updateRole(roleData.id, payload);
      } else {
        const res = await authService.createRole(payload);
        targetRoleId = res.role?.id || res.id || res.data?.role?.id;
      }

      // Bước 2: Gán Quyền
      if (targetRoleId) {
         await authService.assignPermissionToRole(targetRoleId, selectedPermIds);
      }

      Alert.alert(
        "Thành công",
        roleData?.id ? "Cập nhật thành công!" : "Thêm mới thành công!",
        [{ text: "OK", onPress: () => { if (onSaveSuccess) onSaveSuccess(); onDismiss(); } }]
      );

    } catch (error) {
      console.error("Save Error:", error);
      Alert.alert("Lỗi", "Lưu thất bại. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ backgroundColor: 'white', margin: 20, borderRadius: 16, height: '92%', padding: 0 }}
      >
        {/* === HEADER === */}
        <View className="bg-blue-600 px-5 py-4 rounded-t-2xl flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
                <IconButton icon={roleData ? "pencil" : "plus-circle"} iconColor="white" size={24} className="m-0" />
                <Text className="text-white text-2xl font-bold">{roleData ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}</Text>
            </View>
            <Pressable onPress={onDismiss} className="w-9 h-9 rounded-full justify-center items-center active:bg-red-500" style={({ pressed }) => ({ backgroundColor: pressed ? '#EF5350' : 'rgba(255, 255, 255, 0.2)' })}>
                <IconButton icon="close" iconColor="white" size={20} className="m-0" />
            </Pressable>
        </View>

        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>

                {/* === PHẦN THÔNG TIN CHUNG === */}
                <View className="mb-6">
                    <TextInput label="Tên vai trò" mode="outlined" value={name} onChangeText={setName} className="mb-4 bg-white" outlineColor="#E3F2FD" activeOutlineColor="#1E88E5" left={<TextInput.Icon icon="account-circle" color="#1E88E5" />} />

                    <TextInput label="Mô tả vai trò" mode="outlined" value={description} onChangeText={setDescription} multiline numberOfLines={4} className="mb-4 bg-white" outlineColor="#E3F2FD" activeOutlineColor="#1E88E5" left={<TextInput.Icon icon="text-box" color="#1E88E5" />} />

                    <View className="flex-row gap-3">
                        <View className="flex-1">
                            <TextInput label="Cấp độ" mode="outlined" keyboardType="numeric" value={level} onChangeText={setLevel} className="bg-white" outlineColor="#E3F2FD" activeOutlineColor="#1E88E5" left={<TextInput.Icon icon="star" color="#1E88E5" />} style={{ height: 60 }} />
                        </View>
                        <View className="flex-1 mt-2 border border-blue-100 rounded px-2.5 py-1.5 bg-blue-50 justify-center">
                            <Text className="text-blue-600 text-xs font-semibold mb-1">Trạng thái</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className={`font-semibold text-sm ${isActive ? 'text-green-600' : 'text-gray-500'}`}>{isActive ? "✓ Kích hoạt" : "○ Tạm ngưng"}</Text>
                                <Switch value={isActive} onValueChange={setIsActive} color="#1E88E5" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* === PHẦN DANH SÁCH QUYỀN === */}
                <View className="flex-1 min-h-[300px]">
                    <View className="mb-3">
                         <Searchbar
                          placeholder="Tìm kiếm quyền..."
                          onChangeText={setSearchPerm}
                          value={searchPerm}
                          className="bg-white border border-gray-200 rounded-lg "
                          inputStyle={{ minHeight: 0, paddingVertical: 0, fontSize: 14 }}
                          iconColor="#9E9E9E"
                        />
                    </View>

                    <View className="border border-gray-200 rounded-lg overflow-hidden bg-blue-50 flex-1 ">
                        <View className="px-4 py-3 border-b border-gray-400 bg-gray-50/50">
                            <Text className="text-blue-400 font-bold text-xl">Danh sách quyền</Text>
                        </View>

                        <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 300 }}>
                            {loadingPerms ? (
                                <View className="py-8 items-center"><ActivityIndicator size="small" color="#1E88E5" /><Text className="text-gray-400 text-xs mt-2">Đang tải...</Text></View>
                            ) : filteredPermissions.length === 0 ? (
                                <View className="py-8 items-center"><Text className="text-gray-400 text-sm">Không tìm thấy quyền nào</Text></View>
                            ) : (
                                filteredPermissions.map((perm, index) => (
                                    <View key={perm.id}>
                                        <Pressable className="flex-row items-center justify-between px-4 py-3 active:bg-gray-50" onPress={() => togglePerm(perm.id)}>
                                          <View className="flex-1 pr-3">
                                            <Text className="font-semibold text-blue-500 text-xl mb-0.5">{perm.code || perm.name}</Text>
                                            <Text className="text-blue-500 text-xm">{perm.description}</Text>
                                          </View>
                                          <View pointerEvents="none"><Checkbox.Android status={selectedPermIds.includes(perm.id) ? 'checked' : 'unchecked'} color="#1E88E5" /></View>
                                        </Pressable>
                                        {index < filteredPermissions.length - 1 && <Divider className="bg-gray-50 ml-4" />}
                                    </View>
                                ))
                            )}
                        </ScrollView>
                    </View>
                </View>

                <View className="h-6" />
            </ScrollView>
        </View>

        {/* === FOOTER BUTTONS === */}
        <View className="p-4 border-t border-blue-100 bg-gray-50 rounded-b-2xl flex-row gap-3">
          <Button mode="outlined" onPress={onDismiss} className="flex-1" textColor="#757575" style={{ borderColor: '#E0E0E0', borderRadius: 8 }} icon="close-circle">
            Hủy bỏ
          </Button>
          <Button mode="contained" onPress={handleSave} loading={isSaving} disabled={isSaving} className="flex-1 bg-blue-600" style={{ backgroundColor: '#1E88E5', borderRadius: 8 }} icon="content-save">
            Lưu lại
          </Button>
        </View>

      </Modal>
    </Portal>
  );
};

export default RoleEditModal;