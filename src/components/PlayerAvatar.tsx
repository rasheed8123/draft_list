import { cn } from "@/lib/utils";
import type { Player } from "@/data/players";

const roleAccent: Record<string, string> = {
  Batsman: "from-role-batsman/40 to-role-batsman/10",
  Bowler: "from-role-bowler/40 to-role-bowler/10",
  "All-rounder": "from-role-allrounder/40 to-role-allrounder/10",
  "Wicket-keeper": "from-role-keeper/40 to-role-keeper/10",
};

interface Props {
  player: Pick<Player, "name" | "role" | "image">;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "text-base",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl",
};

export const PlayerAvatar = ({ player, className, size = "md" }: Props) => {
  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (player.image) {
    return (
      <img
        src={player.image}
        alt={player.name}
        loading="lazy"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "h-full w-full bg-gradient-to-br flex items-center justify-center font-display tracking-wider text-foreground/90",
        roleAccent[player.role],
        sizes[size],
        className,
      )}
      aria-label={player.name}
    >
      {initials}
    </div>
  );
};
