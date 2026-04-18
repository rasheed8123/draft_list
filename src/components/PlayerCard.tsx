import { Link } from "react-router-dom";
import type { Player } from "@/data/players";
import { PlayerAvatar } from "./PlayerAvatar";

const roleColor: Record<string, string> = {
  Batsman: "bg-role-batsman/15 text-role-batsman border-role-batsman/30",
  Bowler: "bg-role-bowler/15 text-role-bowler border-role-bowler/30",
  "All-rounder": "bg-role-allrounder/15 text-role-allrounder border-role-allrounder/30",
  "Wicket-keeper": "bg-role-keeper/15 text-role-keeper border-role-keeper/30",
};

const quickStat = (p: Player) => {
  if (p.role === "Bowler") return { label: "Wickets", value: p.stats.wickets };
  if (p.role === "All-rounder") return { label: "Runs / Wkts", value: `${p.stats.runs} / ${p.stats.wickets}` };
  return { label: "Strike Rate", value: p.stats.strikeRate };
};

export const PlayerCard = ({ player }: { player: Player }) => {
  const stat = quickStat(player);

  return (
    <Link
      to={`/player/${player.id}`}
      className="group relative block w-[200px] sm:w-[230px] md:w-[260px] flex-shrink-0 rounded-lg overflow-hidden gradient-card border border-border shadow-card transition-smooth hover:scale-[1.06] hover:z-10 hover:shadow-elevated hover:border-primary/40"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <PlayerAvatar player={player} size="xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <span
          className={`absolute top-3 left-3 text-[10px] tracking-wider uppercase font-semibold px-2 py-1 rounded-full border backdrop-blur-sm ${roleColor[player.role]}`}
        >
          {player.role}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-2xl leading-tight">{player.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{player.country} · {player.team}</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card/80">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</p>
          <p className="font-display text-xl text-foreground">{stat.value}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Base</p>
          <p className="font-display text-xl text-primary">{player.basePrice}</p>
        </div>
      </div>
    </Link>
  );
};
