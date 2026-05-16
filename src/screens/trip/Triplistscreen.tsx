import { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Searchbar, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TripCard } from './_components/trip-card';
import { TripSummary } from './_components/summary';
import { tripService } from '../../services/trip-service';
import { TripSummary as SummaryType } from '../../types';
import { useSession } from '../../context/SessionContext';
import { TripListItem } from '../../types/trip';

export default function TripListScreen({ navigation }: any) {
  const { user } = useSession();
  const [trips, setTrips] = useState<TripListItem[]>([]);
  const [summary, setSummary] = useState<SummaryType | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const [tripList, tripSummary] = await Promise.all([
          tripService.getTripList(user.id),
          tripService.getTripSummary(user.id),
        ]);

        setTrips(tripList);
        setSummary(
          tripSummary || {
            route: '--',
            vehicle: '--',
            duration: '--',
            totalWarnings: 0,
          }
        );
      } catch (error) {
        console.error('Lỗi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  const filtered = trips.filter(
    j =>
      j.route.toLowerCase().includes(search.toLowerCase()) ||
      j.vehicle.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="gap-4 mb-2">
            {/* Overview */}
            <Text variant="titleLarge" className="font-bold text-gray-800">
              Tổng quan
            </Text>
            {summary && <TripSummary data={summary} />}

            {/* Search */}
            <Searchbar
              placeholder="Tìm theo lộ trình, xe..."
              value={search}
              onChangeText={setSearch}
              className="rounded-xl bg-white"
              elevation={1}
            />

            <Text variant="titleMedium" className="font-bold text-gray-800">
              Lịch sử ({filtered.length})
            </Text>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View className="py-16 items-center">
              <ActivityIndicator size="large" />
              <Text variant="bodyMedium" className="text-gray-500 mt-3">
                Đang tải...
              </Text>
            </View>
          ) : (
            <View className="py-16 items-center">
              <Text className="text-5xl mb-3">📋</Text>
              <Text variant="bodyMedium" className="text-gray-500">
                Không tìm thấy hành trình nào
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <TripCard
            item={item}
            onPress={() =>
              navigation.navigate('TripDetail', { tripId: item.id })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}
