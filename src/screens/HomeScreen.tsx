import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = () => {
    const [text, setText] = useState("Welcome to the Home Screen!")
  return (
    <View className="flex flex-1 justify-center items-center">
      <Text className="font-bold text-2xl text-red-500">
        <Button mode="contained-tonal" onPress={() => setText("Test")}>
          {text}
        </Button>
      </Text>
    </View>
  );
};

export default HomeScreen;
