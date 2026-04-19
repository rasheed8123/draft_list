import { useState, useCallback, useEffect } from "react";
import { sendChatMessage, type ChatResponse } from "@/services/chatService";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
}

export interface UseChatReturn {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sendMessage: (playerId: string, query: string) => Promise<void>;
  clearMessages: () => void;
  clearError: () => void;
}

/**
 * Custom hook for managing chat interactions with the AI assistant
 * Handles message state, loading states, and API error handling
 */
export const useChat = (initialMessage?: string, resetKey: number = 0): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessage
      ? [
          {
            role: "assistant",
            content: initialMessage,
            timestamp: Date.now(),
          },
        ]
      : []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Re-initialize messages when resetKey changes
  useEffect(() => {
    if (initialMessage) {
      setMessages([
        {
          role: "assistant",
          content: initialMessage,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [resetKey, initialMessage]);

  const sendMessage = useCallback(async (playerId: string, query: string) => {
    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: query,
        timestamp: Date.now(),
      },
    ]);

    setLoading(true);
    setError(null);

    try {
      const response: ChatResponse = await sendChatMessage(playerId, query);

      // Add assistant message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get response from AI";
      setError(errorMessage);

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
    clearError,
  };
};
