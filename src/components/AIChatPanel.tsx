import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import type { Player } from "@/data/players";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Summarize this player",
  "Is he consistent?",
  "How does he perform under pressure?",
  "Strengths and weaknesses?",
  "Worth the base price?",
];

const mockReply = (player: Player, q: string): string => {
  const s = player.stats;
  const lower = q.toLowerCase();
  if (lower.includes("summar")) {
    return `**${player.name}** is a ${player.role.toLowerCase()} from ${player.country} playing for ${player.team}. Across ${s.matches} matches he has scored ${s.runs} runs at an average of ${s.average} and a strike rate of ${s.strikeRate}, with ${s.wickets} wickets. ${player.tagline}`;
  }
  if (lower.includes("consist")) {
    const avg = player.recentForm.reduce((a, b) => a + b, 0) / player.recentForm.length;
    return `Looking at his last 10 outings (avg ${avg.toFixed(1)}), there is **${avg > 55 ? "strong" : avg > 35 ? "moderate" : "patchy"}** consistency. His career average of ${s.average} suggests he can be relied upon in most match situations.`;
  }
  if (lower.includes("pressure") || lower.includes("death") || lower.includes("chase")) {
    return `In high-pressure scenarios ${player.name} ${player.role === "Bowler" ? `holds an economy of ${s.economy} with a best of ${s.bestBowling}` : `strikes at ${s.strikeRate}`}. The recent-form trend shows he ${player.recentForm.slice(-3).reduce((a,b)=>a+b,0) > 150 ? "is peaking right now" : "is finding his rhythm"} — a real asset in knockout games.`;
  }
  if (lower.includes("price") || lower.includes("worth") || lower.includes("value")) {
    return `At a base price of **${player.basePrice}**, ${player.name} offers strong value given his ${s.matches}-match resume and ${player.role === "Bowler" ? `${s.wickets} wickets at ${s.economy} economy` : `${s.runs} runs at SR ${s.strikeRate}`}. Expect bidding wars from teams needing a ${player.role.toLowerCase()}.`;
  }
  if (lower.includes("strength") || lower.includes("weak")) {
    return `**Strengths:** ${player.highlights.join(", ")}. **Areas to watch:** consistency vs top-tier opposition and adapting across overseas conditions. Overall, a high-ceiling pick.`;
  }
  return `Based on ${player.name}'s data — ${s.matches} matches, ${s.runs} runs, ${s.wickets} wickets — here's the take: ${player.tagline} His recent form (last 10: ${player.recentForm.join(", ")}) backs that read.\n\n*This is a preview of the AI insights. Connect the AI engine to get live, deep analysis.*`;
};

export const AIChatPanel = ({ player }: { player: Player }) => {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: `Hi! I'm your scouting assistant for **${player.name}**. Ask me anything about his form, stats, role fit, or auction value.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: mockReply(player, text) }]);
      setLoading(false);
    }, 700);
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
