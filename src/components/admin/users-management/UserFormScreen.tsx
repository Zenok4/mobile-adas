import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  KeyboardTypeOptions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// --- ĐỊNH NGHĨA PROPS CHO COMPONENT CON ---
interface InputLabelProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

export default function UserFormScreen({ route, navigation }: any) {
  const { editingUser, availableRoles, currentUserLevel } = route.params || {};
  const isEdit = !!editingUser;

  const [form, setForm] = useState({
    username: editingUser?.username || '',
    display_name: editingUser?.display_name || '',
    email: editingUser?.email || '',
    phone: editingUser?.phone || '',
    password: '',
    is_active: editingUser?.is_active ?? true,
    selectedRoleIds:
      editingUser?.roles?.map((r: any) => r.id) || ([] as number[]),
  });

  const toggleRole = (roleId: number) => {
    const isSelected = form.selectedRoleIds.includes(roleId);
    setForm({
      ...form,
      selectedRoleIds: isSelected
        ? form.selectedRoleIds.filter((id: number) => id !== roleId)
        : [...form.selectedRoleIds, roleId],
    });
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-slate-950">
      <View className="pt-12 pb-4 px-6 bg-white dark:bg-slate-900 flex-row justify-between items-center shadow-sm">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-lg font-bold dark:text-white">
          {isEdit ? 'Sửa người dùng' : 'Thêm người dùng'}
        </Text>
        <TouchableOpacity
          onPress={() => Alert.alert('Thành công', 'Đã lưu thay đổi')}
        >
          <Text className="text-blue-600 font-bold">Lưu</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-4 shadow-sm">
          <InputLabel
            label="Tên đăng nhập *"
            value={form.username}
            onChange={(v: string) => setForm({ ...form, username: v })}
          />
          <InputLabel
            label="Email *"
            value={form.email}
            onChange={(v: string) => setForm({ ...form, email: v })}
            keyboardType="email-address"
          />
          {!isEdit && (
            <InputLabel
              label="Mật khẩu *"
              value={form.password}
              onChange={(v: string) => setForm({ ...form, password: v })}
              secureTextEntry
            />
          )}

          <View className="flex-row justify-between items-center py-2">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Trạng thái hoạt động
            </Text>
            <Switch
              value={form.is_active}
              onValueChange={(v: boolean) => setForm({ ...form, is_active: v })}
            />
          </View>
        </View>

        <Text className="text-xs font-bold text-blue-600 uppercase mb-2 ml-1">
          Vai trò hệ thống
        </Text>
        <View className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm mb-10">
          {availableRoles?.map((role: any) => {
            const isDisabled = (role.level || 0) >= currentUserLevel;
            const isSelected = form.selectedRoleIds.includes(role.id);
            return (
              <TouchableOpacity
                key={role.id}
                onPress={() => !isDisabled && toggleRole(role.id)}
                className="flex-row items-center p-3 border-b border-gray-50 dark:border-slate-800 last:border-0"
              >
                <Feather
                  name={isSelected ? 'check-square' : 'square'}
                  size={20}
                  color={
                    isDisabled ? '#E5E7EB' : isSelected ? '#2563EB' : '#9CA3AF'
                  }
                />
                <Text
                  className={`ml-3 ${
                    isDisabled
                      ? 'text-gray-300'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {role.name}{' '}
                  <Text className="text-[10px] text-gray-400">
                    (Lv.{role.level})
                  </Text>
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const InputLabel = ({
  label,
  value,
  onChange,
  keyboardType = 'default',
  secureTextEntry = false,
}: InputLabelProps) => (
  <View className="mb-4">
    <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
      {label}
    </Text>
    <TextInput
      className="bg-gray-50 dark:bg-slate-800 dark:text-white rounded-xl px-4 h-12 border border-gray-100 dark:border-slate-700"
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  </View>
);
