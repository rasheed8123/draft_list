import { useRef, useEffect, useState } from "react";
import { Send, Sparkles, AlertCircle } from "lucide-react";
import type { Player } from "@/data/players";
import { useChat } from "@/hooks/use-chat";

const suggestions = [
  "Summarize this player",
  "Is he consistent?",
  "How does he perform under pressure?",
  "Strengths and weaknesses?",
  "Worth the base price?",
];

export const AIChatPanel = ({ player }: { player: Player }) => {
  const [chatKey, setChatKey] = useState(0);
  
  // Re-initialize chat when player name changes
  useEffect(() => {
    setChatKey(prev => prev + 1);
  }, [player.name]);

  const { messages, loading, error, sendMessage, clearError } = useChat(
    `Hi! I'm your scouting assistant for **${player.name}**. Ask me anything about his form, stats, role fit, or auction value.`,
    chatKey
  );
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    sendMessage(player.id, text);
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/40">
        <span className="h-7 w-7 rounded-md gradient-primary flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </span>
        <div>
          <p className="font-semibold text-sm leading-tight">Scout AI</p>
          <p className="text-[10px] text-muted-foreground">Insights · Powered by AI</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[400px]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/60 text-foreground border border-border"
              }`}
              dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>") }}
            />
          </div>
        ))}
        {error && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-lg px-3 py-2 text-sm bg-destructive/10 border border-destructive/30 text-destructive flex gap-2 items-start">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1">{error}</div>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-secondary/60 border border-border rounded-lg px-3 py-2 text-sm">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="px-4 pt-2 pb-3 border-t border-border space-y-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full bg-secondary/60 border border-border hover:border-primary/40 hover:bg-secondary transition-smooth text-muted-foreground hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${player.name.split(" ")[0]}…`}
            className="flex-1 bg-secondary/60 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-smooth"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-primary text-primary-foreground hover:bg-primary-glow disabled:opacity-40 disabled:cursor-not-allowed transition-smooth px-4 rounded-md flex items-center justify-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
