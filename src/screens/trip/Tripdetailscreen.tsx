import { ScrollView } from "react-native";
import { useState } from "react";
import { DetectionType } from "../../types/trip";
import { JourneySummary } from "./_components/summary";
import { DetectionFilter } from "./_components/DetectionFilter";
import { DetectionList } from "./_components/DetectionList";
import { JOURNEY_DETAIL } from "../../mock/trip";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JourneyDetailScreen() {
  const [filter, setFilter] = useState<DetectionType | null>(null);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <JourneySummary data={JOURNEY_DETAIL.summary} />
  
        <DetectionFilter active={filter} onChange={setFilter} />
  
        <DetectionList
          data={JOURNEY_DETAIL.detections}
          filter={filter}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
