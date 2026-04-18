import { useEffect, useState } from "react";
import { fetchPlayerStats, PlayerStatsDetail } from "@/services/playerService";

export const usePlayerStats = (playerId: string | number | undefined) => {
  const [data, setData] = useState<PlayerStatsDetail | null>(null);
  const [loading, setLoading] = useState(!!playerId);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!playerId) {
      setLoading(false);
      setData(null);
      return;
    }

    const loadPlayerStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchPlayerStats(playerId);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch player stats"));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadPlayerStats();
  }, [playerId]);

  return { data, loading, error };
};
