import { useState, useMemo } from "react";
import { Match } from "../api/matches";

export type FilterType = "all" | "upcoming" | "finished";

export const FILTER_LABELS: Record<FilterType, string> = {
  all: "Все",
  upcoming: "Предстоящие",
  finished: "Завершённые",
};

export function useMatchFilter(matches: Match[]) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [query, setQuery] = useState("");

  const filteredMatches = useMemo(() => {
    const q = query.trim().toLowerCase();

    return matches.filter((match) => {
      // 1) Фильтр по статусу
      if (filter === "upcoming" && match.status !== "scheduled") return false;
      if (filter === "finished" && match.status !== "finished") return false;

      // 2) Поиск по названию клуба (хозяева или гости)
      if (q) {
        const homeMatch =
          match.home.name.toLowerCase().includes(q) ||
          match.home.city.toLowerCase().includes(q);
        const awayMatch =
          match.away.name.toLowerCase().includes(q) ||
          match.away.city.toLowerCase().includes(q);

        if (!homeMatch && !awayMatch) return false;
      }

      return true;
    });
  }, [matches, filter, query]);

  return {
    filter,
    setFilter,
    query,
    setQuery,
    filteredMatches,
    filterOptions: Object.keys(FILTER_LABELS) as FilterType[],
    filterLabels: FILTER_LABELS,
  };
}
