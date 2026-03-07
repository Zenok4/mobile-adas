import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type TabType = 'username' | 'email';

const RegisterScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('username');

  // States cho Form
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // States ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Style chung cho shadow để tái sử dụng
  const shadowStyle = {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: 24,
            paddingVertical: 20,
          }}
        >
          {/* Logo & Tiêu đề */}
          <View className="items-center mb-8">
            <MaterialCommunityIcons
              name="shield-car"
              size={80}
              color="#004D8C"
            />
            <Text className="text-lg font-medium text-gray-800 mt-2">ADAS</Text>
            <Text className="text-2xl font-semibold text-gray-900 mt-1">
              Đăng ký tài khoản
            </Text>
          </View>

          {/* Tab Selector */}
          <View className="flex-row border-b border-gray-300 mb-6">
            <TouchableOpacity
              className={`flex-1 flex-row justify-center items-center pb-3 ${
                activeTab === 'username' ? 'border-b-2 border-black' : ''
              }`}
              onPress={() => setActiveTab('username')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name="account-outline"
                size={20}
                color={activeTab === 'username' ? '#000' : '#4B5563'}
              />
              <Text
                className={`ml-2 text-base ${
                  activeTab === 'username'
                    ? 'font-bold text-black'
                    : 'font-medium text-gray-600'
                }`}
              >
                Username
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 flex-row justify-center items-center pb-3 ${
                activeTab === 'email' ? 'border-b-2 border-black' : ''
              }`}
              onPress={() => setActiveTab('email')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color={activeTab === 'email' ? '#000' : '#4B5563'}
              />
              <Text
                className={`ml-2 text-base ${
                  activeTab === 'email'
                    ? 'font-bold text-black'
                    : 'font-medium text-gray-600'
                }`}
              >
                Email
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Thay Đổi Dựa Trên Tab */}
          {activeTab === 'username' ? (
            <View className="mb-4">
              <Text className="text-gray-800 mb-2 font-medium">
                Tên đăng nhập
              </Text>
              <View
                className="bg-white rounded-2xl border border-gray-100"
                style={shadowStyle}
              >
                <TextInput
                  className="px-4 py-4 text-gray-800 text-base"
                  placeholder="Nhập username"
                  placeholderTextColor="#9CA3AF"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>
          ) : (
            <View className="mb-4">
              <Text className="text-gray-800 mb-2 font-medium">
                Địa chỉ Email
              </Text>
              <View className="flex-row">
                <View
                  className="flex-1 bg-white rounded-2xl border border-gray-100"
                  style={shadowStyle}
                >
                  <TextInput
                    className="px-4 py-4 text-gray-800 text-base"
                    placeholder="name@example.com"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
                {/* Nút Lấy Mã */}
                <TouchableOpacity
                  className="ml-3 bg-white rounded-2xl justify-center px-4 border border-gray-100"
                  style={shadowStyle}
                  activeOpacity={0.7}
                >
                  <Text className="text-gray-800 font-medium text-base">
                    Lấy mã
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Form Chung: Mật khẩu & Xác nhận mật khẩu */}
          <View className="mb-4">
            <Text className="text-gray-800 mb-2 font-medium">Mật khẩu</Text>
            <View
              className="bg-white rounded-2xl flex-row items-center px-4 border border-gray-100"
              style={shadowStyle}
            >
              <TextInput
                className="flex-1 py-4 text-gray-800 text-base"
                placeholder="Mật khẩu bảo mật"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="p-2"
              >
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-gray-800 mb-2 font-medium">Xác mật khẩu</Text>
            <View
              className="bg-white rounded-2xl flex-row items-center px-4 border border-gray-100"
              style={shadowStyle}
            >
              <TextInput
                className="flex-1 py-4 text-gray-800 text-base"
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-2"
              >
                <MaterialCommunityIcons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nút Đăng ký */}
          <TouchableOpacity
            className="bg-[#4C90FF] rounded-2xl py-4 items-center mb-8"
            style={{
              shadowColor: '#4C90FF',
              shadowOpacity: 0.4,
              shadowRadius: 10,
              elevation: 5,
            }}
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-semibold">Đăng ký</Text>
          </TouchableOpacity>

          {/* Link sang Đăng nhập */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-800 text-base font-medium">
              Đã có tài khoản?{' '}
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-[#4C90FF] font-semibold text-base">
                Đăng nhập ngay
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
