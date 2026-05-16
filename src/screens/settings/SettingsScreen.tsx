import { View, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../../context/SessionContext';
import { useAdasSettings } from '../../hooks/useAdasSettings';
import { SettingsRow } from './_components/SettingsRow';
import { ScreenHeader } from '../../components/common/ScreenHeader';

export default function SettingsScreen({ navigation }: any) {
  const { user, logout } = useSession();
  const { settings, toggleDisplay, toggleSetting } = useAdasSettings();

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Huỷ', style: 'cancel' },
      { text: 'Đăng xuất', style: 'destructive', onPress: logout },
    ]);
  };

  const initial = (user?.username?.[0] ?? user?.email?.[0] ?? 'A').toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScreenHeader title="Tài khoản" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <View className="px-4 pt-4">
          <Card
            className="rounded-2xl"
            onPress={() => navigation.navigate('Profile')}>
            <Card.Content className="flex-row items-center gap-4 py-4">
              <View className="w-16 h-16 rounded-full bg-blue-600 items-center justify-center">
                <Text variant="headlineSmall" className="text-white font-black">
                  {initial}
                </Text>
              </View>
              <View className="flex-1">
                <Text variant="titleMedium" className="font-bold text-gray-800">
                  {user?.fullName ?? user?.username ?? 'Người dùng'}
                </Text>
                <Text variant="bodySmall" className="text-gray-500">
                  {user?.email ?? user?.username}
                </Text>
                <View className="bg-blue-100 self-start px-2 py-0.5 rounded-full mt-1">
                  <Text variant="labelSmall" className="text-blue-600 font-semibold">
                    {user?.role ?? 'Tài xế'}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-400 text-2xl">›</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Account section */}
        <View className="px-4 mt-5">
          <Text variant="labelSmall" className="text-gray-400 uppercase tracking-wider mb-2 font-semibold">
            Tài khoản
          </Text>
          <Card className="rounded-2xl overflow-hidden">
            <SettingsRow
              type="nav"
              iconName="account-outline"
              label="Thông tin cá nhân"
              onPress={() => navigation.navigate('Profile')}
            />
            <Divider />
            <SettingsRow
              type="nav"
              iconName="lock-outline"
              label="Đổi mật khẩu"
              onPress={() => navigation.navigate('ChangePassword')}
            />
          </Card>
        </View>

        {/* Display section */}
        <View className="px-4 mt-5">
          <Text variant="labelSmall" className="text-gray-400 uppercase tracking-wider mb-2 font-semibold">
            Hiển thị thông tin
          </Text>
          <Card className="rounded-2xl overflow-hidden">
            <SettingsRow
              type="toggle"
              iconName="map-marker-outline"
              label="Hiển thị vị trí"
              value={settings.display.showLocation}
              onToggle={() => toggleDisplay('showLocation')}
            />
            <Divider />
            <SettingsRow
              type="toggle"
              iconName="weather-sunny"
              label="Hiển thị thời tiết"
              value={settings.display.showWeather}
              onToggle={() => toggleDisplay('showWeather')}
            />
            <Divider />
            <SettingsRow
              type="toggle"
              iconName="thermometer"
              label="Hiển thị nhiệt độ"
              value={settings.display.showTemperature}
              onToggle={() => toggleDisplay('showTemperature')}
            />
            <Divider />
            <SettingsRow
              type="toggle"
              iconName="clock-outline"
              label="Hiển thị thời gian"
              value={settings.display.showTime}
              onToggle={() => toggleDisplay('showTime')}
            />
          </Card>
        </View>

        {/* System section */}
        <View className="px-4 mt-5">
          <Text variant="labelSmall" className="text-gray-400 uppercase tracking-wider mb-2 font-semibold">
            Hệ thống
          </Text>
          <Card className="rounded-2xl overflow-hidden">
            <SettingsRow
              type="toggle"
              iconName="volume-high"
              label="Âm thanh cảnh báo"
              value={settings.soundEnabled}
              onToggle={() => toggleSetting('soundEnabled')}
            />
            <Divider />
            <SettingsRow
              type="toggle"
              iconName="camera-outline"
              label="Tự động bật camera"
              value={settings.autoCamera}
              onToggle={() => toggleSetting('autoCamera')}
            />
          </Card>
        </View>

        {/* App info */}
        <View className="px-4 mt-5">
          <Text variant="labelSmall" className="text-gray-400 uppercase tracking-wider mb-2 font-semibold">
            Thông tin ứng dụng
          </Text>
          <Card className="rounded-2xl overflow-hidden">
            <SettingsRow
              type="info"
              iconName="cellphone"
              label="Phiên bản"
              value="1.0.0"
            />
            <Divider />
            <SettingsRow
              type="info"
              iconName="shield-outline"
              label="ADAS Mobile"
              value="React Native"
            />
          </Card>
        </View>

        {/* Logout */}
        <View className="px-4 mt-5 mb-8">
          <Button
            mode="outlined"
            icon="logout"
            onPress={handleLogout}
            textColor="#ef4444"
            style={{ borderColor: '#ef4444', borderRadius: 16 }}
            contentStyle={{ paddingVertical: 4 }}>
            Đăng xuất
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
