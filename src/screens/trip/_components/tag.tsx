import { Pressable, Text, StyleSheet } from "react-native";

interface Props {
  label: string;
  color: string;
  active?: boolean;
  onPress?: () => void;
}

export function Tag({ label, color, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tag,
        { backgroundColor: active ? color : `${color}33` },
      ]}
    >
      <Text style={[styles.text, { color: active ? "#fff" : color }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});
