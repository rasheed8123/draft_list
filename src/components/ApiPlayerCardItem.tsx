import { Link } from "react-router-dom";
import type { ApiPlayer } from "@/services/playerService";
import { ApiPlayerAvatar } from "./ApiPlayerAvatar";

interface Props {
  player: ApiPlayer;
}

export const ApiPlayerCardItem = ({ player }: Props) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "a+": "bg-amber-500/15 text-amber-600 border-amber-500/30",
      a: "bg-blue-500/15 text-blue-600 border-blue-500/30",
      b: "bg-purple-500/15 text-purple-600 border-purple-500/30",
      c: "bg-green-500/15 text-green-600 border-green-500/30",
      default: "bg-slate-500/15 text-slate-600 border-slate-500/30",
    };
    return colors[category.toLowerCase()] || colors.default;
  };

  return (
    <Link
      to={`/player/${player.playerId}`}
      className="group relative block w-[200px] sm:w-[230px] md:w-[260px] flex-shrink-0 rounded-lg overflow-hidden gradient-card border border-border shadow-card transition-smooth hover:scale-[1.06] hover:z-10 hover:shadow-elevated hover:border-primary/40 cursor-pointer"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <ApiPlayerAvatar player={player} size="xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] tracking-wider uppercase font-semibold px-2 py-1 rounded-full border backdrop-blur-sm ${getCategoryColor(player.category)}`}>
          {player.category}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-2xl leading-tight">{player.playerName}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Category: {player.category.toUpperCase()}</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card/80">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Runs</p>
          <p className="font-display text-lg text-foreground">{player.batting.runs}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Wickets</p>
          <p className="font-display text-lg text-primary">{player.bowling.wickets}</p>
        </div>
      </div>
    </Link>
  );
};
