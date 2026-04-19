// API Configuration
// Base URL can be easily changed for different environments
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://stats-server-sr17.onrender.com/api";

export const API_ENDPOINTS = {
  PLAYERS_BY_CATEGORY: `${API_BASE_URL}/players-by-category`,
  CHAT: `${API_BASE_URL}/chat`,
  TRENDING_PLAYERS: `${API_BASE_URL}/trending-players`,
};
