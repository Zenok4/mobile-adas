import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const HomeScreen = () => {
  const [text, setText] = useState("Welcome to the Home Screen!");

  return (
    <View className="flex-1 justify-center items-center">
      <Button
        mode="contained-tonal"
        icon={({ size, color }) => (
          <FontAwesome5 name="biohazard" size={size} color={color} />
        )}
        onPress={() => setText("Test")}
      >
        {text}
      </Button>
    </View>
  );
};

export default HomeScreen;
