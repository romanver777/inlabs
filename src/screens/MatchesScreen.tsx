import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useMatches } from "../hooks/useMatches";
import { useMatchFilter } from "../hooks/useMatchFilter";
import { UpdatedAgo } from "../components/UpdatedAgo";
import { Loader } from "../components/Loader";
import { ErrorView } from "../components/ErrorView";
import { EmptyView } from "../components/EmptyView";
import { MatchCard } from "../components/MatchCard";
import { MatchFilters } from "../components/MatchFilters";
import { COLORS, SPACING } from "../config/theme";
import { SearchInput } from "../components/SearchInput";

export function MatchesScreen() {
  const {
    matches,
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    refresh,
    retry,
  } = useMatches();
  const { filter, setFilter, query, setQuery, filteredMatches } =
    useMatchFilter(matches);

  const showLoader = isLoading && !isRefreshing;
  const showError = !!error && !isRefreshing;
  const isBusy = isRefreshing || showLoader;

  const hasData = matches.length > 0;

  return (
    <View style={styles.container}>
      {/* Шапка */}
      <View style={styles.header}>
        <Text style={styles.title}>Матчи тура</Text>
        {hasData && !showLoader && !showError && (
          <TouchableOpacity onPress={refresh} disabled={isBusy}>
            <Text style={[styles.refreshText, isBusy && { opacity: 0.5 }]}>
              Обновить
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Контент */}
      {showLoader ? (
        <Loader />
      ) : showError ? (
        <ErrorView message={error!} onRetry={retry} />
      ) : (
        <View style={styles.content}>
          <View style={styles.filterSection}>
            <SearchInput value={query} onChange={setQuery} />
            <MatchFilters filter={filter} onChange={setFilter} />
            {lastUpdated && <UpdatedAgo since={lastUpdated} />}
          </View>

          <View style={styles.listWrapper}>
            <FlatList
              data={filteredMatches}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MatchCard match={item} />}
              contentContainerStyle={styles.listContent}
              style={isRefreshing && styles.listDimmed}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={refresh}
                  tintColor={COLORS.accent}
                  colors={[COLORS.accent]}
                />
              }
              ListEmptyComponent={<EmptyView />}
            />

            {isRefreshing && (
              <View style={styles.overlay} pointerEvents="auto">
                <ActivityIndicator size="large" color={COLORS.accent} />
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textMain,
  },
  refreshText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "600",
  },
  content: { flex: 1 },
  filterSection: {
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  listWrapper: {
    flex: 1,
    position: "relative",
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.lg + 8,
  },
  listDimmed: {
    opacity: 0.4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(245, 245, 245, 0.6)",
  },
});
