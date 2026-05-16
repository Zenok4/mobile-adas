import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../../context/SessionContext';
// import { profileService } from '../../services/profile-service';

export default function ProfileScreen({ navigation }: any) {
  // const { user, updateUser } = useSession();

  // const [fullName, setFullName] = useState(user?.fullName ?? '');
  // const [email, setEmail] = useState(user?.email ?? '');
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState(false);

  // const initial = (user?.username?.[0] ?? 'A').toUpperCase();

  // const handleSave = async () => {
  //   setError('');
  //   setSuccess(false);
  //   setLoading(true);
  //   try {
  //     await profileService.updateProfile({ fullName, email });
  //     await updateUser({ fullName, email });
  //     setSuccess(true);
  //   } catch {
  //     setError('Không thể cập nhật thông tin, vui lòng thử lại');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      
    </SafeAreaView>
  );
}
