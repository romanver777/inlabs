import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FilterType, FILTER_LABELS } from "../hooks/useMatchFilter";
import { COLORS, SPACING } from "../config/theme";

interface Props {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
  options?: FilterType[];
}

const DEFAULT_OPTIONS: FilterType[] = ["all", "upcoming", "finished"];

export const MatchFilters = ({
  filter,
  onChange,
  options = DEFAULT_OPTIONS,
}: Props) => {
  return (
    <View style={styles.row}>
      {options.map((f) => (
        <TouchableOpacity
          key={f}
          style={[styles.btn, filter === f && styles.btnActive]}
          onPress={() => onChange(f)}
        >
          <Text style={[styles.text, filter === f && styles.textActive]}>
            {FILTER_LABELS[f]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: SPACING.sm,
  },
  btn: {
    paddingVertical: SPACING.xs + 2,
    paddingHorizontal: SPACING.md - 2,
    borderRadius: 20,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  text: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  textActive: {
    color: COLORS.white,
    fontWeight: "600",
  },
});
