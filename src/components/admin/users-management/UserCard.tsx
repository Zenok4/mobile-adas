import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export const UserCard = ({ user, onEdit, onDelete, currentUserLevel }: any) => {
  // Tìm level cao nhất để check quyền hạn
  const sortedRoles = [...(user.roles || [])].sort(
    (a, b) => (b.level || 0) - (a.level || 0),
  );
  const targetHighestLevel =
    sortedRoles.length > 0 ? sortedRoles[0].level || 0 : 0;
  const isActionDisabled = targetHighestLevel >= currentUserLevel;

  return (
    <View className="bg-white dark:bg-slate-900 mx-4 my-2 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
      <View className="flex-row justify-between">
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900 dark:text-white">
            {user.username}
          </Text>
          <Text className="text-xs text-gray-500">{user.email}</Text>
        </View>
        <View
          className={`px-2 py-1 rounded-lg ${
            user.is_active ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          <Text
            className={`text-[10px] font-bold ${
              user.is_active ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {user.is_active ? 'Hoạt động' : 'Tạm khóa'}
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap mt-2 gap-1">
        {sortedRoles.slice(0, 3).map((role: any) => (
          <View
            key={role.id}
            className="bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md"
          >
            <Text className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
              {role.name}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row justify-between items-center mt-4 pt-3 border-t border-gray-50 dark:border-slate-800">
        <Text className="text-[10px] text-gray-400">
          Ngày tạo: {new Date(user.created_at).toLocaleDateString('vi-VN')}
        </Text>

        <View className="flex-row gap-4">
          {isActionDisabled ? (
            <Feather name="shield" size={18} color="#9CA3AF" />
          ) : (
            <>
              <TouchableOpacity onPress={() => onEdit(user)}>
                <Feather name="edit-2" size={18} color="#2563EB" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete(user)}>
                <Feather name="trash-2" size={18} color="#DC2626" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
