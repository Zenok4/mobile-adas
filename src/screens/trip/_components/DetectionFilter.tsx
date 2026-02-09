import { View, StyleSheet } from "react-native";
import { DetectionType } from "../../../types/trip";
import { Tag } from "./tag";

const FILTERS: {
  type: DetectionType;
  label: string;
  color: string;
}[] = [
  { type: "DROWSY", label: "Buồn ngủ", color: "#f97316" },
  { type: "OBSTACLE", label: "Vật cản", color: "#ef4444" },
  { type: "LANE_DEVIATION", label: "Làn đường", color: "#3b82f6" },
  { type: "SPEED_SIGN", label: "Biển báo", color: "#22c55e" },
];

export function DetectionFilter({
  active,
  onChange,
}: {
  active: DetectionType | null;
  onChange: (type: DetectionType | null) => void;
}) {
  return (
    <View style={styles.container}>
      {FILTERS.map((f) => (
        <Tag
          key={f.type}
          label={f.label}
          color={f.color}
          active={active === f.type}
          onPress={() => onChange(active === f.type ? null : f.type)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
