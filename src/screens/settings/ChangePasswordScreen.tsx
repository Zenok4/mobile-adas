import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePasswordScreen({ navigation }: any) {
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = async () => {
    setError('');
    if (newPw !== confirmPw) { setError('Mật khẩu mới không khớp'); return; }
    if (newPw.length < 6) { setError('Mật khẩu phải có ít nhất 6 ký tự'); return; }

    setLoading(true);
    try {
      // await profileService.changePassword(oldPw, newPw);
      navigation.goBack();
    } catch {
      setError('Mật khẩu cũ không đúng hoặc có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 14 }}
        keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View className="items-center py-6">
          <Text className="text-5xl mb-3">🔑</Text>
          <Text variant="titleLarge" className="font-bold text-gray-800">
            Đổi mật khẩu
          </Text>
          <Text variant="bodySmall" className="text-gray-500 mt-1">
            Đặt mật khẩu mạnh để bảo vệ tài khoản
          </Text>
        </View>

        <TextInput
          label="Mật khẩu hiện tại"
          value={oldPw}
          onChangeText={setOldPw}
          mode="outlined"
          secureTextEntry={!showOld}
          left={<TextInput.Icon icon="lock-outline" />}
          right={
            <TextInput.Icon
              icon={showOld ? 'eye-off' : 'eye'}
              onPress={() => setShowOld(v => !v)}
            />
          }
          className="bg-white"
        />

        <TextInput
          label="Mật khẩu mới"
          value={newPw}
          onChangeText={setNewPw}
          mode="outlined"
          secureTextEntry={!showNew}
          left={<TextInput.Icon icon="lock-plus-outline" />}
          right={
            <TextInput.Icon
              icon={showNew ? 'eye-off' : 'eye'}
              onPress={() => setShowNew(v => !v)}
            />
          }
          className="bg-white"
        />

        <TextInput
          label="Xác nhận mật khẩu mới"
          value={confirmPw}
          onChangeText={setConfirmPw}
          mode="outlined"
          secureTextEntry={!showNew}
          left={<TextInput.Icon icon="lock-check-outline" />}
          className="bg-white"
        />

        <HelperText type="error" visible={!!error}>{error}</HelperText>

        <Button
          mode="contained"
          onPress={handleChange}
          loading={loading}
          disabled={loading}
          icon="content-save-outline"
          contentStyle={{ paddingVertical: 6 }}
          className="rounded-xl">
          Đổi mật khẩu
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
