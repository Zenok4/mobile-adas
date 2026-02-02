import { View, Text, StyleSheet } from "react-native";

interface Props {
  label: string;
  value: string;
}

export function InfoCard({ label, value }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
  },
  value: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
  },
});
