import { useState, useEffect, useCallback } from "react";
import { fetchMatches, Match } from "../api/matches";

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setIsLoading(true);
    setError(null);

    try {
      const data = await fetchMatches();

      // Сортировка: live вверху, затем по дате, матчи без даты — в конец
      const sorted = [...data].sort((a, b) => {
        if (a.status === "live" && b.status !== "live") return -1;
        if (b.status === "live" && a.status !== "live") return 1;
        if (!a.startsAt) return 1;
        if (!b.startsAt) return -1;
        return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
      });

      setMatches(sorted);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Не удалось загрузить матчи.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    loadData(true);
  }, [loadData]);

  const retry = useCallback(() => {
    loadData();
  }, [loadData]);

  return {
    matches,
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    refresh,
    retry,
  };
}
