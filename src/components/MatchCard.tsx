import { View, Text, StyleSheet } from "react-native";
import { Match } from "../api/matches";
import { COLORS, SPACING } from "../config/theme";

const STATUS_LABELS: Record<string, string> = {
  scheduled: "Запланирован",
  live: "В эфире",
  finished: "Завершен",
  postponed: "Отложен",
  canceled: "Отменен",
};

interface Props {
  match: Match;
}

const formatDate = (isoString: string | null) => {
  if (!isoString) return "Дата не назначена";
  return new Date(isoString).toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const MatchCard = ({ match }: Props) => {
  const hasScore = match.score !== null;
  const isLive = match.status === "live";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, isLive && styles.statusLive]}>
            {STATUS_LABELS[match.status] || match.status}
          </Text>
          {isLive && match.minute !== undefined && (
            <Text style={styles.minuteText}>{match.minute}'</Text>
          )}
        </View>
        <Text style={styles.dateText}>{formatDate(match.startsAt)}</Text>
      </View>

      <View style={styles.teamsRow}>
        <View style={styles.teamBox}>
          <Text style={styles.teamName} numberOfLines={1}>
            {match.home.name}
          </Text>
          <Text style={styles.teamCity} numberOfLines={1}>
            {match.home.city}
          </Text>
        </View>

        <View style={styles.scoreBox}>
          {hasScore ? (
            <Text style={styles.scoreText}>
              {match.score!.home} : {match.score!.away}
            </Text>
          ) : (
            <Text style={styles.vsText}>—</Text>
          )}
        </View>

        <View style={[styles.teamBox, styles.teamBoxRight]}>
          <Text style={[styles.teamName, styles.textRight]} numberOfLines={1}>
            {match.away.name}
          </Text>
          <Text style={[styles.teamCity, styles.textRight]} numberOfLines={1}>
            {match.away.city}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusContainer: { flexDirection: "row", alignItems: "center" },
  statusText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statusLive: { color: COLORS.error },
  minuteText: {
    marginLeft: 6,
    fontSize: 12,
    color: COLORS.error,
    fontWeight: "700",
  },
  dateText: { fontSize: 12, color: COLORS.textSecondary },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamBox: { flex: 1 },
  teamBoxRight: { alignItems: "flex-end" },
  teamName: { fontSize: 16, fontWeight: "500", color: COLORS.textMain },
  teamCity: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  textRight: { textAlign: "right" },
  scoreBox: {
    paddingHorizontal: SPACING.md,
    minWidth: 80,
    alignItems: "center",
  },
  scoreText: { fontSize: 20, fontWeight: "700", color: COLORS.accent },
  vsText: { fontSize: 16, color: COLORS.textSecondary },
});
