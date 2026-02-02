import { View, StyleSheet } from "react-native";
import { InfoCard } from "./info-card";
import { JourneySummary as Summary } from "../../../types/trip";

export function JourneySummary({ data }: { data: Summary }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <InfoCard label="Lộ trình" value={data.route} />
        <InfoCard label="Phương tiện" value={data.vehicle} />
      </View>
      <View style={styles.row}>
        <InfoCard label="Thời gian" value={data.duration} />
        <InfoCard label="Tổng cảnh báo" value={String(data.totalWarnings)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  row: { flexDirection: "row", gap: 12 },
});
