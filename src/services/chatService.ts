import { API_ENDPOINTS } from "@/config/api";

export interface ChatRequest {
  playerId: string;
  query: string;
}

export interface ChatResponse {
  status: string;
  data: {
    playerId: string;
    playerName: string;
    query: string;
    answer: string;
    characterCount: number;
  };
}

export interface ChatError {
  status: string;
  message?: string;
  error?: string;
}

/**
 * Send a chat query to the AI assistant API
 * @param playerId - The ID of the player
 * @param query - The user's query about the player
 * @returns Promise containing the AI response
 */
export const sendChatMessage = async (playerId: string, query: string): Promise<ChatResponse> => {
  try {
    const response = await fetch(API_ENDPOINTS.CHAT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId,
        query,
      }),
    });

    if (!response.ok) {
      const errorData: ChatError = await response.json();
      throw new Error(errorData.message || errorData.error || `API Error: ${response.status}`);
    }

    const data: ChatResponse = await response.json();

    if (data.status !== "success") {
      throw new Error(data.status);
    }

    return data;
  } catch (error) {
    console.error("Chat API Error:", error);
    throw error instanceof Error ? error : new Error("Failed to send message");
  }
};
