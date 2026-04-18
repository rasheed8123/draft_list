import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ApiPlayer } from "@/services/playerService";
import { ApiPlayerCardItem } from "./ApiPlayerCardItem";

interface Props {
  title: string;
  players: ApiPlayer[];
}

export const ApiPlayerRow = ({ title, players }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "l" | "r") => {
    if (!ref.current) return;
    const amount = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({ left: dir === "l" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="relative group/row py-6">
      <div className="flex items-center justify-between px-6 md:px-12 mb-3">
        <h2 className="font-display text-2xl md:text-3xl tracking-wide">{title}</h2>
        <span className="text-xs text-muted-foreground">{players.length} players</span>
      </div>
      <div className="relative">
        <button
          aria-label="Scroll left"
          onClick={() => scroll("l")}
          className="hidden md:flex absolute left-0 top-0 bottom-0 z-20 w-12 items-center justify-center bg-gradient-to-r from-background via-background/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-smooth"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <div
          ref={ref}
          className="no-scrollbar flex gap-4 overflow-x-auto px-6 md:px-12 pb-4 scroll-smooth"
        >
          {players.map((p) => (
            <ApiPlayerCardItem key={p.playerId} player={p} />
          ))}
        </div>
        <button
          aria-label="Scroll right"
          onClick={() => scroll("r")}
          className="hidden md:flex absolute right-0 top-0 bottom-0 z-20 w-12 items-center justify-center bg-gradient-to-l from-background via-background/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-smooth"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};
