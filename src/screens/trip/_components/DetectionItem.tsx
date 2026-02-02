import { View, Text, StyleSheet } from "react-native";
import { Detection } from "../../../types/trip";

const COLORS = {
  SPEED_SIGN: "#22c55e",
  DROWSY: "#f97316",
  OBSTACLE: "#ef4444",
  LANE_DEVIATION: "#3b82f6",
};

export function DetectionItem({ item }: { item: Detection }) {
  return (
    <View style={[styles.container, { borderLeftColor: COLORS[item.type] }]}>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.text}>{item.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    gap: 4,
  },
  time: {
    fontSize: 12,
    color: "#6b7280",
  },
  text: {
    fontSize: 14,
  },
});
