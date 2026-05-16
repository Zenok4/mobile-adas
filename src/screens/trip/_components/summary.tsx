import { View } from 'react-native';
import { InfoCard } from '../../../components/common/InfoCard';
import { TripSummary as Summary } from '../../../types';

export function TripSummary({ data }: { data: Summary }) {
  return (
    <View className="gap-3">
      <View className="flex-row gap-3">
        <InfoCard label="Lộ trình" value={data.route} />
        <InfoCard label="Phương tiện" value={data.vehicle} />
      </View>
      <View className="flex-row gap-3">
        <InfoCard label="Thời gian" value={data.duration} />
        <InfoCard label="Tổng cảnh báo" value={String(data.totalWarnings)} />
      </View>
    </View>
  );
}
