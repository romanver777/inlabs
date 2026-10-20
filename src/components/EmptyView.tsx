import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../config/theme";

export const EmptyView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Нет матчей для отображения</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: SPACING.lg * 2,
  },
  text: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});
