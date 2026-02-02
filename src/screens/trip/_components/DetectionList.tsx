import { FlatList } from "react-native";
import { DetectionItem } from "./DetectionItem";
import { Detection, DetectionType } from "../../../types/trip";

export function DetectionList({
  data,
  filter,
}: {
  data: Detection[];
  filter: DetectionType | null;
}) {
  const filtered = filter
    ? data.filter((d) => d.type === filter)
    : data;

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => <DetectionItem item={item} />}
    />
  );
}
