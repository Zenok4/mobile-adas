import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { JourneyCard } from "./_components/trip-card";
import { JOURNEY_LIST, JOURNEY_DETAIL } from "../../mock/trip";
import { JourneySummary } from "./_components/summary";

export default function JourneyListScreen({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={JOURNEY_LIST}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListHeaderComponent={
          <View className="gap-4">
            <Text variant="titleLarge">Tổng quan</Text>

            {/* ✅ DÙNG LẠI JourneySummary */}
            <JourneySummary data={JOURNEY_DETAIL.summary} />

            <Text variant="titleMedium">Lịch sử hành trình</Text>
          </View>
        }
        renderItem={({ item }) => (
          <JourneyCard
            item={item}
            onPress={() =>
              navigation.navigate("JourneyDetail", {
                journeyId: item.id,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}
