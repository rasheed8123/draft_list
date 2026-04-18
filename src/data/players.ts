export type PlayerRole = "Batsman" | "Bowler" | "All-rounder" | "Wicket-keeper";

export interface PlayerStats {
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  hundreds: number;
  fifties: number;
  wickets: number;
  economy: number;
  bestBowling: string;
  catches: number;
}

export interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  country: string;
  team: string;
  age: number;
  basePrice: string;
  battingStyle: string;
  bowlingStyle: string;
  image?: string;
  tagline: string;
  stats: PlayerStats;
  recentForm: number[]; // last 10 innings (runs OR wickets*15)
  highlights: string[];
}

const make = (
  id: string,
  name: string,
  role: PlayerRole,
  country: string,
  team: string,
  age: number,
  basePrice: string,
  battingStyle: string,
  bowlingStyle: string,
  tagline: string,
  stats: PlayerStats,
  recentForm: number[],
  highlights: string[],
): Player => ({ id, name, role, country, team, age, basePrice, battingStyle, bowlingStyle, tagline, stats, recentForm, highlights });

export const players: Player[] = [
  make("@ Ali 18", "@ Ali 18", "All-rounder", "Draft", "", 30, "₹ Priceless",
    "Right-handed", "Right-arm medium",
    "Genuine match-winner with bat and ball — the ultimate auction asset.",
    { matches: 178, runs: 1718, average: 14.08, strikeRate: 140.94, hundreds: 0, fifties: 3, wickets: 21, economy: 8, bestBowling: "3/2", catches: 45 },
    [55, 30, 80, 60, 45, 90, 35, 70, 50, 85],
    ["MVP World Cup 2023", "1000+ runs & 100+ wickets", "Power-play strike rate: 162"]),

  make("z-khan", "Zayn Khan", "Wicket-keeper", "Pakistan", "Lahore Lions", 27, "₹1.1 Cr",
    "Right-handed", "—",
    "Calm finisher who reads the game like a captain.",
    { matches: 76, runs: 2180, average: 35.7, strikeRate: 141.2, hundreds: 1, fifties: 13, wickets: 0, economy: 0, bestBowling: "—", catches: 65 },
    [50, 78, 33, 67, 45, 88, 22, 95, 56, 71],
    ["6 chase finishes 2024", "Stumping wizard — 18 stumpings", "ODI century before debut"]),
];

export const playersByRole = (role: PlayerRole) => players.filter(p => p.role === role);
export const getPlayer = (id: string) => players.find(p => p.id === id);
