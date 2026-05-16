import { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../../services/authService';

type Step = 'email' | 'otp' | 'newpass';

const STEP_INFO: Record<Step, { emoji: string; title: string; sub: string }> = {
  email: { emoji: '📧', title: 'Quên mật khẩu', sub: 'Nhập email để nhận mã OTP' },
  otp: { emoji: '🔐', title: 'Xác nhận OTP', sub: 'Nhập mã đã gửi đến email của bạn' },
  newpass: { emoji: '🔑', title: 'Mật khẩu mới', sub: 'Đặt mật khẩu mới cho tài khoản' },
};

export default function ForgotPasswordScreen({ navigation }: any) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);

  const info = STEP_INFO[step];

  const handleStep = async () => {
    setError('');
    setLoading(true);
    try {
      if (step === 'email') {
        if (!email) { setError('Vui lòng nhập email'); return; }
        // await AuthService.sendOtp(email);
        setStep('otp');
      } else if (step === 'otp') {
        if (otp.length < 4) { setError('Mã OTP không hợp lệ'); return; }
        // await authService.verifyOtp(email, otp);
        setStep('newpass');
      } else {
        if (newPw !== confirmPw) { setError('Mật khẩu không khớp'); return; }
        if (newPw.length < 6) { setError('Mật khẩu phải có ít nhất 6 ký tự'); return; }
        // await authService.resetPassword(email, newPw, otp);
        navigation.navigate('Login');
      }
    } catch {
      setError('Đã có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const btnLabel = step === 'email' ? 'Gửi mã OTP' : step === 'otp' ? 'Xác nhận' : 'Đặt lại mật khẩu';

  return (
    <SafeAreaView className="flex-1 bg-blue-600">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

          {/* Hero */}
          <View className="items-center pt-12 pb-8 px-6">
            <Button
              icon="arrow-left"
              textColor="white"
              onPress={() => navigation.goBack()}
              className="self-start -ml-2 mb-6">
              Quay lại
            </Button>
            <View className="w-20 h-20 rounded-full bg-white/20 items-center justify-center mb-3">
              <Text className="text-4xl">{info.emoji}</Text>
            </View>
            <Text variant="headlineSmall" className="text-white font-bold">{info.title}</Text>
            <Text variant="bodySmall" className="text-blue-100 mt-1 text-center">{info.sub}</Text>
          </View>

          {/* Card */}
          <View className="flex-1 bg-white rounded-t-3xl px-6 pt-8 pb-10 gap-4">
            {step === 'email' && (
              <TextInput
                label="Địa chỉ Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email-outline" />}
                className="bg-white"
              />
            )}

            {step === 'otp' && (
              <>
                <TextInput
                  label="Mã OTP (6 chữ số)"
                  value={otp}
                  onChangeText={setOtp}
                  mode="outlined"
                  keyboardType="numeric"
                  maxLength={6}
                  left={<TextInput.Icon icon="numeric" />}
                  style={{ textAlign: 'center', letterSpacing: 8 }}
                  className="bg-white"
                />
                <Button mode="text" compact onPress={() => handleStep()} className="self-center">
                  Gửi lại OTP
                </Button>
              </>
            )}

            {step === 'newpass' && (
              <>
                <TextInput
                  label="Mật khẩu mới"
                  value={newPw}
                  onChangeText={setNewPw}
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
                  value={confirmPw}
                  onChangeText={setConfirmPw}
                  mode="outlined"
                  secureTextEntry={!showPw}
                  left={<TextInput.Icon icon="lock-check-outline" />}
                  className="bg-white"
                />
              </>
            )}

            <HelperText type="error" visible={!!error}>{error}</HelperText>

            <Button
              mode="contained"
              onPress={handleStep}
              loading={loading}
              disabled={loading}
              contentStyle={{ paddingVertical: 6 }}
              className="rounded-xl">
              {btnLabel}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
