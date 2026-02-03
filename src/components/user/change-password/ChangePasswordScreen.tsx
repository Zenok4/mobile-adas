import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { PasswordInput } from './PasswordInput';

export default function ChangePasswordScreen({ navigation, userEmail }: any) {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Validation Logic
  const isLengthValid = newPass.length >= 8;
  const isComplexityValid =
    /[A-Z]/.test(newPass) &&
    /[0-9]/.test(newPass) &&
    /[!@#$%^&*]/.test(newPass);
  const isMatch = newPass === confirmPass && newPass !== '';

  const handleSendOtp = () => {
    // Gọi ProfileService.requestChangePasswordOtp("email")
    setOtpSent(true);
    Alert.alert('Đã gửi mã', `Mã OTP đã được gửi đến email: ${userEmail}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white dark:bg-slate-950"
    >
      <ScrollView className="flex-1 px-6 pt-12">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 -ml-2"
          >
            <Feather name="arrow-left" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold ml-2 dark:text-white">
            Đổi mật khẩu
          </Text>
        </View>

        <PasswordInput
          label="Mật khẩu hiện tại"
          value={currentPass}
          onChangeText={setCurrentPass}
          placeholder="••••••••"
        />
        <PasswordInput
          label="Mật khẩu mới"
          value={newPass}
          onChangeText={setNewPass}
          placeholder="••••••••"
        />
        <PasswordInput
          label="Xác nhận mật khẩu mới"
          value={confirmPass}
          onChangeText={setConfirmPass}
          placeholder="••••••••"
        />

        {/* Bảo mật mật khẩu - Giao diện gọn hơn Web */}
        <View className="bg-gray-50 dark:bg-slate-900 p-4 rounded-2xl mb-6">
          <RequirementItem isValid={isLengthValid} text="Ít nhất 8 ký tự" />
          <RequirementItem
            isValid={isComplexityValid}
            text="Có chữ hoa, số & ký tự đặc biệt"
          />
          <RequirementItem isValid={isMatch} text="Mật khẩu khớp nhau" />
        </View>

        {/* Section OTP */}
        <View className="border-t border-gray-100 pt-6 mb-10">
          <Text className="text-sm font-medium mb-3">
            Xác thực Email: {userEmail}
          </Text>
          <View className="flex-row gap-2">
            <TextInput
              value={otpCode}
              onChangeText={setOtpCode}
              placeholder="000000"
              keyboardType="number-pad"
              maxLength={6}
              className="flex-1 h-12 bg-gray-50 border border-gray-200 rounded-xl text-center font-bold text-lg tracking-[10px]"
            />
            <TouchableOpacity
              onPress={handleSendOtp}
              className={`px-4 justify-center rounded-xl ${
                otpSent ? 'bg-green-100' : 'bg-blue-600'
              }`}
            >
              <Text
                className={`${
                  otpSent ? 'text-green-700' : 'text-white'
                } font-bold`}
              >
                {otpSent ? 'Gửi lại' : 'Lấy mã'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className={`h-14 rounded-2xl items-center justify-center shadow-lg mb-10 ${
            isComplexityValid &&
            isLengthValid &&
            isMatch &&
            otpCode.length === 6
              ? 'bg-blue-600'
              : 'bg-gray-300'
          }`}
          disabled={
            !(
              isComplexityValid &&
              isLengthValid &&
              isMatch &&
              otpCode.length === 6
            )
          }
          onPress={() => Alert.alert('Thành công', 'Mật khẩu đã được đổi!')}
        >
          <Text className="text-white font-bold text-lg">
            Cập nhật mật khẩu
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const RequirementItem = ({ isValid, text }: any) => (
  <View className="flex-row items-center mb-1">
    <Feather
      name={isValid ? 'check-circle' : 'circle'}
      size={14}
      color={isValid ? '#10B981' : '#9CA3AF'}
    />
    <Text
      className={`text-xs ml-2 ${isValid ? 'text-green-600' : 'text-gray-500'}`}
    >
      {text}
    </Text>
  </View>
);
