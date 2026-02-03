import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  KeyboardTypeOptions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU ---
interface ProfileFormData {
  display_name: string;
  email: string;
  phone: string;
  address: string;
  vehicle_name: string;
  license_plate: string;
}

interface FormInputProps {
  label: string;
  icon: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  lastItem?: boolean;
}

export default function EditProfileScreen({ navigation, profileData }: any) {
  const [formData, setFormData] = useState<ProfileFormData>({
    display_name: profileData?.username || '',
    email: profileData?.email || '',
    phone: profileData?.phone || '',
    address: profileData?.address || '',
    vehicle_name: profileData?.vehicle_name || '',
    license_plate: profileData?.license_plate || '',
  });

  const handleSave = () => {
    Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50 dark:bg-slate-950"
    >
      <View className="pt-12 pb-4 px-6 bg-white dark:bg-slate-900 flex-row justify-between items-center shadow-sm">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-lg font-bold dark:text-white">
          Chỉnh sửa hồ sơ
        </Text>
        <TouchableOpacity onPress={handleSave}>
          <Text className="text-blue-600 font-bold">Lưu</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-6">
        <Text className="text-blue-600 font-bold text-xs uppercase mb-3 ml-1">
          Thông tin cơ bản
        </Text>
        <View className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-6 shadow-sm">
          <FormInput
            label="Tên hiển thị"
            icon="user"
            value={formData.display_name}
            onChangeText={(val: string) =>
              setFormData({ ...formData, display_name: val })
            }
            placeholder="Nhập tên của bạn"
          />
          <FormInput
            label="Email"
            icon="mail"
            value={formData.email}
            onChangeText={(val: string) =>
              setFormData({ ...formData, email: val })
            }
            placeholder="example@gmail.com"
            keyboardType="email-address"
          />
          <FormInput
            label="Số điện thoại"
            icon="phone"
            value={formData.phone}
            onChangeText={(val: string) =>
              setFormData({ ...formData, phone: val })
            }
            placeholder="+84..."
            keyboardType="phone-pad"
          />
          <FormInput
            label="Địa chỉ"
            icon="map-pin"
            value={formData.address}
            onChangeText={(val: string) =>
              setFormData({ ...formData, address: val })
            }
            placeholder="Đà Nẵng, Việt Nam"
          />
        </View>

        <Text className="text-blue-600 font-bold text-xs uppercase mb-3 ml-1">
          Thông tin xe
        </Text>
        <View className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-10 shadow-sm">
          <FormInput
            label="Phương tiện"
            icon="truck"
            value={formData.vehicle_name}
            onChangeText={(val: string) =>
              setFormData({ ...formData, vehicle_name: val })
            }
            placeholder="Ví dụ: Honda City 2023"
          />
          <FormInput
            label="Biển số xe"
            icon="hash"
            value={formData.license_plate}
            onChangeText={(val: string) =>
              setFormData({ ...formData, license_plate: val })
            }
            placeholder="43E1-11111"
            lastItem
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const FormInput = ({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  lastItem = false,
}: FormInputProps) => (
  <View
    className={`mb-4 ${
      lastItem ? 'mb-0' : 'border-b border-gray-100 dark:border-slate-800 pb-4'
    }`}
  >
    <Text className="text-xs text-gray-500 mb-2 ml-1">{label}</Text>
    <View className="flex-row items-center bg-gray-50 dark:bg-slate-800 rounded-xl px-3 py-1">
      <Feather name={icon} size={16} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-3 h-10 text-sm text-gray-900 dark:text-gray-100"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
      />
    </View>
  </View>
);
