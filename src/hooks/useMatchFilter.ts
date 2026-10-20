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

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      if (filter === "upcoming") return match.status === "scheduled";
      if (filter === "finished") return match.status === "finished";
      return true;
    });
  }, [matches, filter]);

  return {
    filter,
    setFilter,
    filteredMatches,
    filterOptions: Object.keys(FILTER_LABELS) as FilterType[],
    filterLabels: FILTER_LABELS,
  };
}
