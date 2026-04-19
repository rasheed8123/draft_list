import { useState, useEffect } from "react";
import { fetchTrendingPlayers, type TrendingPlayer, type TrendingPlayersResponse } from "@/services/playerService";

export interface UseTrendingPlayersReturn {
  data: TrendingPlayer[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching trending players from the API
 * Returns top trending players with query information
 */
export const useTrendingPlayers = (): UseTrendingPlayersReturn => {
  const [data, setData] = useState<TrendingPlayer[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: TrendingPlayersResponse = await fetchTrendingPlayers();
      if (response.status === "success" && response.data) {
        setData(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch trending players");
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error occurred");
      setError(error);
      console.error("Error fetching trending players:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
