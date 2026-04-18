import { API_ENDPOINTS } from "@/config/api";

export interface BattingStats {
  sr?: number; // Strike rate
  runs?: number;
  matches?: number;
  innings?: number;
  notout?: number;
  avg?: number;
  highestruns?: string;
  hundreds?: number;
  fifties?: number;
  thirties?: number;
  ducks?: number;
  fours?: number;
  sixes?: number;
  won?: number;
  loss?: number;
  "100s"?: number;
  "30s"?: number;
  "4s"?: number;
  "50s"?: number;
  "6s"?: number;
}

export interface BowlingStats {
  sr?: number;
  wickets?: number;
  economy?: number;
  bestbowling?: string;
  matches?: number;
  innings?: number;
  overs?: string;
  maidens?: number;
  runs?: number;
  avg?: number;
  "3wickets"?: number;
  "5wickets"?: number;
  dotballs?: number;
  noballs?: number;
  wides?: number;
  "4s"?: number;
  "6s"?: number;
}

export interface FieldingStats {
  matches?: number;
  catches?: number;
  caughtbehind?: number;
  runouts?: number;
  stumpings?: number;
  assistedrunouts?: number;
  byerunswk?: number;
}

export interface CaptainStats {
  matches?: number;
  tosswon?: number;
  winper?: number;
  lossper?: number;
}

export interface PlayerStatsDetail {
  playerId: string | number;
  playerName: string;
  category: string;
  batting?: BattingStats;
  bowling?: BowlingStats;
  fielding?: FieldingStats;
  captain?: CaptainStats;
  meta?: {
    lastUpdated?: string;
    source?: string;
  };
  raw?: any;
  [key: string]: any;
}

export interface PlayerStatsResponse {
  status: string;
  message?: string;
  data: PlayerStatsDetail;
}

export interface PlayersResponse {
  status: string;
  message: string;
  data: PlayersByCategory;
}

export interface ApiPlayer {
  playerName: string;
  playerId: number;
  category: string;
  batting: BattingStats;
  bowling: BowlingStats;
}

export interface PlayersByCategory {
  [category: string]: ApiPlayer[];
}

export const fetchPlayersByCategory = async (): Promise<PlayersResponse> => {
  try {
    const response = await fetch(API_ENDPOINTS.PLAYERS_BY_CATEGORY);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PlayersResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch players:", error);
    throw error;
  }
};

// Fetch detailed player stats
export const fetchPlayerStats = async (playerId: string | number): Promise<PlayerStatsDetail> => {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://stats-server-sr17.onrender.com/api";
    const response = await fetch(`${baseUrl}/player-stats/${playerId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PlayerStatsResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Failed to fetch player stats for ID ${playerId}:`, error);
    throw error;
  }
};

// Transform API player to a format suitable for display
export const transformApiPlayerForDisplay = (
  player: ApiPlayer,
  avatar?: string
) => {
  return {
    id: String(player.playerId),
    name: player.playerName,
    category: player.category,
    avatar: avatar,
    batting: player.batting,
    bowling: player.bowling,
  };
};
