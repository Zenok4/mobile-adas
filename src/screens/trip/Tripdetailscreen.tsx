import { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DetectionType, TripDetail } from '../../types';
import { TripSummary } from './_components/summary';
import { DetectionFilter } from './_components/DetectionFilter';
import { DetectionList } from './_components/DetectionList';
import { tripService } from '../../services/trip-service';

export default function TripDetailScreen({ route }: any) {
  const { tripId } = route.params ?? {};
  const [detail, setDetail] = useState<TripDetail | null>(null);
  const [filter, setFilter] = useState<DetectionType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripService.getTripDetail(tripId).then(data => {
      setDetail(data);
      setLoading(false);
    });
  }, [tripId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!detail) return null;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <TripSummary data={detail.summary} />

        {/* Filter */}
        <View className="gap-2">
          <Text variant="titleSmall" className="font-bold text-gray-700">
            Lọc sự kiện
          </Text>
          <DetectionFilter active={filter} onChange={setFilter} />
        </View>

        {/* List */}
        <View className="gap-2">
          <Text variant="titleSmall" className="font-bold text-gray-700">
            Danh sách sự kiện
          </Text>
          <DetectionList data={detail.detections} filter={filter} />
        </View>

        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
}
