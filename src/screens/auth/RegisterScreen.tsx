import { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  SegmentedButtons,
  HelperText,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';

type Method = 'username' | 'email';

export default function RegisterScreen({ navigation }: any) {
  const [method, setMethod] = useState<Method>('username');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    if (!email) { setError('Vui lòng nhập email trước'); return; }
    setOtpLoading(true);
    try {
      // await AuthService.sendOtp(email);
      setOtpSent(true);
      setError('');
    } catch {
      setError('Không thể gửi OTP, thử lại sau');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegister = async () => {
    setError('');
    if (password !== confirmPassword) { setError('Mật khẩu xác nhận không khớp'); return; }
    if (password.length < 6) { setError('Mật khẩu phải có ít nhất 6 ký tự'); return; }

    setLoading(true);
    try {
      await AuthService.registerWithUsername(username, password);
      navigation.navigate('Login');
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Đăng ký thất bại, thử lại sau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-600">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">

          {/* ── Hero ── */}
          <View className="pt-12 pb-8 items-center px-6">
            <Button
              icon="arrow-left"
              textColor="white"
              onPress={() => navigation.goBack()}
              className="self-start -ml-2 mb-4">
              Quay lại
            </Button>
            <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center mb-2">
              <Text className="text-3xl">🛡️</Text>
            </View>
            <Text variant="headlineSmall" className="text-white font-black tracking-widest">
              ADAS
            </Text>
          </View>

          {/* ── Card ── */}
          <View className="flex-1 bg-white rounded-t-3xl px-6 pt-8 pb-10 gap-4">
            <Text variant="headlineSmall" className="font-bold text-gray-800">
              Tạo tài khoản
            </Text>

            <SegmentedButtons
              value={method}
              onValueChange={v => { setMethod(v as Method); setError(''); }}
              buttons={[
                { value: 'username', label: 'Username', icon: 'account' },
                { value: 'email', label: 'Email', icon: 'email' },
              ]}
            />

            {method === 'username' ? (
              <TextInput
                label="Tên đăng nhập"
                value={username}
                onChangeText={setUsername}
                mode="outlined"
                autoCapitalize="none"
                left={<TextInput.Icon icon="account-outline" />}
                className="bg-white"
              />
            ) : (
              <View className="gap-2">
                <View className="flex-row gap-2 items-center">
                  <TextInput
                    label="Địa chỉ Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    left={<TextInput.Icon icon="email-outline" />}
                    style={{ flex: 1 }}
                    className="bg-white"
                  />
                  <Button
                    mode="contained-tonal"
                    onPress={handleSendOtp}
                    loading={otpLoading}
                    disabled={otpLoading}
                    compact>
                    {otpSent ? 'Gửi lại' : 'OTP'}
                  </Button>
                </View>
                {otpSent && (
                  <TextInput
                    label="Mã OTP"
                    value={otpCode}
                    onChangeText={setOtpCode}
                    mode="outlined"
                    keyboardType="numeric"
                    maxLength={6}
                    left={<TextInput.Icon icon="numeric" />}
                    className="bg-white"
                  />
                )}
              </View>
            )}

            <TextInput
              label="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPw}
              left={<TextInput.Icon icon="lock-outline" />}
              right={
                <TextInput.Icon
                  icon={showPw ? 'eye-off' : 'eye'}
                  onPress={() => setShowPw(v => !v)}
                />
              }
              className="bg-white"
            />

            <TextInput
              label="Xác nhận mật khẩu"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry={!showPw}
              left={<TextInput.Icon icon="lock-check-outline" />}
              className="bg-white"
            />

            <HelperText type="error" visible={!!error}>{error}</HelperText>

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              contentStyle={{ paddingVertical: 6 }}
              className="rounded-xl">
              Đăng ký
            </Button>

            <View className="flex-row justify-center">
              <Text variant="bodyMedium" className="text-gray-500">Đã có tài khoản? </Text>
              <Text
                variant="bodyMedium"
                className="text-blue-600 font-bold"
                onPress={() => navigation.navigate('Login')}>
                Đăng nhập
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
