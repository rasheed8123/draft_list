import { Link } from "react-router-dom";
import { Share2 } from "lucide-react";
import type { ApiPlayer } from "@/services/playerService";
import { ApiPlayerAvatar } from "./ApiPlayerAvatar";

interface Props {
  player: ApiPlayer;
}

export const ApiPlayerCardItem = ({ player }: Props) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "a+": "bg-primary/20 text-primary border-primary/50",
      a: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      b: "bg-purple-500/20 text-purple-400 border-purple-500/50",
      c: "bg-green-500/20 text-green-400 border-green-500/50",
      default: "bg-slate-500/20 text-slate-400 border-slate-500/50",
    };
    return colors[category.toLowerCase()] || colors.default;
  };

  return (
    <div className="group relative block w-[200px] sm:w-[230px] md:w-[260px] flex-shrink-0">
      <Link
        to={`/player/${player.playerId}`}
        className="block relative w-full rounded-xl overflow-hidden gradient-card border border-primary/30 shadow-card transition-smooth hover:scale-[1.08] hover:z-10 hover:shadow-glow hover:border-primary/60 cursor-pointer"
      >
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />
        
        <div className="aspect-[3/4] relative overflow-hidden z-[2]">
          <ApiPlayerAvatar player={player} size="xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          
          {/* Category badge with gold theme */}
          <span className={`absolute top-3 right-3 text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-glow ${getCategoryColor(player.category)}`}>
            {player.category}
          </span>
          
          {/* Player info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-[3]">
            <h3 className="font-display text-xl leading-tight group-hover:text-primary transition-colors">{player.playerName}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Cricket Player</p>
          </div>
        </div>
        
        {/* Stats footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-primary/20 bg-gradient-to-r from-secondary/60 to-secondary/40 z-[2]">
          <div className="hover:text-primary transition-colors">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Runs</p>
            <p className="font-display text-lg text-foreground group-hover:text-primary transition-colors">{player.batting.runs}</p>
          </div>
          <div className="w-px h-6 bg-primary/30" />
          <div className="text-right hover:text-primary transition-colors">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Wickets</p>
            <p className="font-display text-lg text-primary group-hover:text-primary-glow transition-colors">{player.bowling.wickets}</p>
          </div>
        </div>
      </Link>

      {/* Share Button Overlay */}
      <Link
        to={`/share/player/${player.playerId}`}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3 left-3 z-20 bg-primary/90 hover:bg-primary text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-glow hover:scale-110 translate-x-0 group-hover:translate-x-0"
        title="Create Share Card"
      >
        <Share2 className="h-4 w-4" />
      </Link>
    </div>
  );
};
