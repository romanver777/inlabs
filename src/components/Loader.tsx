import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { COLORS } from "../config/theme";

export const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.accent} />
      <Text style={styles.text}>Загрузка матчей...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  text: {
    marginTop: 12,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});
