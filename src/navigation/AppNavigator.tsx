import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JourneyListScreen from "../screens/trip/Triplistscreen";
import JourneyDetailScreen from "../screens/trip/Tripdetailscreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JourneyList"
        component={JourneyListScreen}
        options={{ title: "Lịch sử hành trình" }}
      />
      <Stack.Screen
        name="JourneyDetail"
        component={JourneyDetailScreen}
        options={{ title: "Chi tiết hành trình" }}
      />
    </Stack.Navigator>
  );
}
