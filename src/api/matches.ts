import { MATCHES_URL } from "../config";

export type MatchStatus =
  | "scheduled"
  | "live"
  | "finished"
  | "postponed"
  | "canceled";

export interface Team {
  id: string;
  name: string;
  city: string;
}

export interface Match {
  id: string;
  startsAt: string | null;
  status: MatchStatus;
  minute?: number;
  home: Team;
  away: Team;
  score: { home: number; away: number } | null;
}

interface ApiResponse {
  round: number;
  matches: Match[];
}

export const fetchMatches = async (): Promise<Match[]> => {
  const response = await fetch(MATCHES_URL);

  if (!response.ok) throw new Error("Network response was not ok");

  const data: ApiResponse = await response.json();
  return data.matches;
};
