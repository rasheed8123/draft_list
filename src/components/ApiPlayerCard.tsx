import { cn } from "@/lib/utils";
import { getDummyAvatar } from "@/lib/avatar";
import { getPlayerImageUrl } from "@/lib/cricket-images";
import type { ApiPlayer } from "@/services/playerService";
import { useState } from "react";

interface Props {
  player: ApiPlayer;
  image?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "text-base",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl",
};

export const ApiPlayerCard = ({ player, image, className, size = "md" }: Props) => {
  const initials = player.playerName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const [imageError, setImageError] = useState(false);
  // Use provided image, try player folder, then fallback to dummy avatar
  const avatarUrl = image || (imageError ? getDummyAvatar(player.playerName) : getPlayerImageUrl(player.playerId));

  return (
    <div className={cn("relative h-full w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20", className)}>
      <img
        src={avatarUrl}
        alt={player.playerName}
        loading="lazy"
        className="h-full w-full object-cover"
        onError={() => {
          // Fallback to dummy avatar if image fails to load
          if (!imageError) {
            setImageError(true);
          }
        }}
      />
      <div className="absolute inset-0 hidden flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 text-white font-bold">
        <span className={`${sizes[size]}`}>{initials}</span>
      </div>
    </div>
  );
};
