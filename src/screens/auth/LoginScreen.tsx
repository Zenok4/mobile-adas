import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen: React.FC = () => {
  // TypeScript tự động hiểu (infer) đây là kiểu string và boolean
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <SafeAreaView className="flex-1 bg-[#E8EAEF]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-6"
      >
        {/* Logo & Tiêu đề */}
        <View className="items-center mb-10">
          <MaterialCommunityIcons name="shield-car" size={90} color="#003B73" />
          <Text className="text-3xl font-bold text-gray-800 mt-2">ADAS</Text>
          <Text className="text-gray-500 text-base mt-1">
            Chào mừng bạn quay lại
          </Text>
        </View>

        {/* Input Tên đăng nhập */}
        <View className="mb-5">
          <View className="flex-row items-center mb-2 pl-1">
            <MaterialCommunityIcons
              name="account-outline"
              size={20}
              color="#374151"
            />
            <Text className="text-gray-700 ml-2 font-medium">
              Tên đăng nhập
            </Text>
          </View>
          <View
            className="bg-white rounded-2xl flex-row items-center border border-gray-100"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 3,
            }}
          >
            <TextInput
              className="flex-1 px-4 py-4 text-gray-800 text-base"
              placeholder="Nhập username"
              placeholderTextColor="#9CA3AF"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Input Mật khẩu */}
        <View className="mb-2">
          <View className="flex-row items-center mb-2 pl-1">
            <MaterialCommunityIcons
              name="lock-outline"
              size={20}
              color="#374151"
            />
            <Text className="text-gray-700 ml-2 font-medium">Mật khẩu</Text>
          </View>
          <View
            className="bg-white rounded-2xl flex-row items-center px-4 border border-gray-100"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 3,
            }}
          >
            <TextInput
              className="flex-1 py-4 text-gray-800 text-base"
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="p-2"
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quên mật khẩu */}
        <View className="items-start mb-8 pl-1">
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-[#72A5D8] font-medium text-sm">
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nút Đăng nhập */}
        <TouchableOpacity
          className="bg-[#85AEE3] rounded-2xl py-4 items-center mb-8"
          style={{
            shadowColor: '#85AEE3',
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 5,
          }}
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-semibold">Đăng nhập</Text>
        </TouchableOpacity>

        {/* Đăng ký */}
        <View className="flex-row justify-center items-center">
          <Text className="text-gray-600 text-base">Chưa có tài khoản? </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-[#72A5D8] font-semibold text-base">
              Đăng ký ngay
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
