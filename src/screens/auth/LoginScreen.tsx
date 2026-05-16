import { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  SegmentedButtons,
  HelperText,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../../context/SessionContext';

type Method = 'username' | 'email';

export default function LoginScreen({ navigation }: any) {
  const { loginWithUsername, loginWithEmail } = useSession();

  const [method, setMethod] = useState<Method>('username');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!password) { setError('Vui lòng nhập mật khẩu'); return; }
    if (method === 'username' && !username) { setError('Vui lòng nhập tên đăng nhập'); return; }
    if (method === 'email' && !email) { setError('Vui lòng nhập email'); return; }

    setLoading(true);
    try {
      const ok = method === 'username'
        ? await loginWithUsername(username, password)
        : await loginWithEmail(email, password);
      if (!ok) setError('Sai tài khoản hoặc mật khẩu');
    } catch {
      setError('Đã có lỗi xảy ra, vui lòng thử lại');
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
          <View className="items-center py-12">
            <View className="w-20 h-20 rounded-full bg-white/20 items-center justify-center mb-3">
              <Text className="text-4xl">🛡️</Text>
            </View>
            <Text variant="headlineMedium" className="text-white font-black tracking-widest">
              ADAS
            </Text>
            <Text variant="bodySmall" className="text-blue-100 mt-1">
              Hệ thống hỗ trợ lái xe thông minh
            </Text>
          </View>

          {/* ── Card ── */}
          <View className="flex-1 bg-white rounded-t-3xl px-6 pt-8 pb-10">
            <Text variant="headlineSmall" className="font-bold text-gray-800 mb-6">
              Đăng nhập
            </Text>

            {/* Tab method */}
            <SegmentedButtons
              value={method}
              onValueChange={v => { setMethod(v as Method); setError(''); }}
              buttons={[
                { value: 'username', label: 'Username', icon: 'account' },
                { value: 'email', label: 'Email', icon: 'email' },
              ]}
              className="mb-5"
            />

            {/* Input */}
            {method === 'username' ? (
              <TextInput
                label="Tên đăng nhập"
                value={username}
                onChangeText={setUsername}
                mode="outlined"
                autoCapitalize="none"
                left={<TextInput.Icon icon="account-outline" />}
                className="mb-3 bg-white"
              />
            ) : (
              <TextInput
                label="Địa chỉ Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email-outline" />}
                className="mb-3 bg-white"
              />
            )}

            <TextInput
              label="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              left={<TextInput.Icon icon="lock-outline" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(v => !v)}
                />
              }
              className="mb-1 bg-white"
            />

            <HelperText type="error" visible={!!error}>{error}</HelperText>

            <Button
              mode="text"
              compact
              onPress={() => navigation.navigate('ForgotPassword')}
              className="self-end mb-3">
              Quên mật khẩu?
            </Button>

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              contentStyle={{ paddingVertical: 6 }}
              className="rounded-xl mb-4">
              Đăng nhập
            </Button>

            <View className="flex-row justify-center">
              <Text variant="bodyMedium" className="text-gray-500">
                Chưa có tài khoản?{' '}
              </Text>
              <Text
                variant="bodyMedium"
                className="text-blue-600 font-bold"
                onPress={() => navigation.navigate('Register')}>
                Đăng ký ngay
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
