import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { UserCard } from './UserCard';

export default function UserManagementScreen({ navigation }: any) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = (user: any) => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc muốn xóa ${user.username}? Hành động này không thể hoàn tác.`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => {} },
      ],
    );
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-slate-950">
      <View className="pt-12 pb-6 px-6 bg-white dark:bg-slate-900 shadow-sm">
        <Text className="text-2xl font-bold dark:text-white">Người dùng</Text>
        <View className="flex-row items-center bg-gray-100 dark:bg-slate-800 rounded-2xl px-4 mt-4">
          <Feather name="search" size={18} color="#9CA3AF" />
          <TextInput
            className="flex-1 h-12 ml-2"
            placeholder="Tìm theo tên, email..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            currentUserLevel={5}
            onEdit={(u: any) =>
              navigation.navigate('UserForm', {
                editingUser: u,
                availableRoles: [],
              })
            }
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <Text className="text-center mt-10 text-gray-400">
            Không tìm thấy người dùng
          </Text>
        }
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('UserForm', { availableRoles: [] })}
        className="absolute bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <Feather name="user-plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
