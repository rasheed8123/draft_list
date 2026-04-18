import { useEffect, useState } from "react";
import { fetchPlayersByCategory, PlayersResponse } from "@/services/playerService";

export const usePlayersApi = () => {
  const [data, setData] = useState<PlayersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setLoading(true);
        const result = await fetchPlayersByCategory();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch players"));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  return { data, loading, error };
};
