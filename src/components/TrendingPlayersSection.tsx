import { Link } from "react-router-dom";
import { TrendingUp, MessageSquare, Flame, Zap, Sparkles, Share2 } from "lucide-react";
import { useTrendingPlayers } from "@/hooks/use-trending-players";
import { getDummyAvatar } from "@/lib/avatar";
import { getPlayerImageUrl } from "@/lib/cricket-images";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export const TrendingPlayersSection = () => {
  const { data: trendingPlayers, loading, error } = useTrendingPlayers();
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  if (error && !loading) {
    return (
      <section className="px-6 md:px-12 py-3 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-2">
          <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-destructive text-xs">Failed to load trending players</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  if (loading || !trendingPlayers) {
    return (
      <section className="px-6 md:px-12 py-3 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-center gap-2 py-3">
          <Loader2 className="h-3 w-3 animate-spin text-primary" />
          <span className="text-xs text-muted-foreground">Loading trending...</span>
        </div>
      </section>
    );
  }

  if (!trendingPlayers || trendingPlayers.length === 0) {
    return null;
  }

  const topThree = trendingPlayers.slice(0, 3);
  const medals = ["🥇", "🥈", "🥉"];
  const colors = [
    { bg: "from-orange-500/20 to-red-500/20", border: "border-orange-500/40", glow: "from-orange-500/30", accent: "text-orange-500" },
    { bg: "from-slate-400/20 to-blue-500/20", border: "border-slate-400/40", glow: "from-slate-400/30", accent: "text-slate-400" },
    { bg: "from-amber-600/20 to-orange-600/20", border: "border-amber-600/40", glow: "from-amber-600/30", accent: "text-amber-600" },
  ];

  return (
    <section className="relative px-6 md:px-12 py-12 md:py-16 pt-20 md:pt-24 max-w-[1400px] mx-auto">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Header */}
      <div className="mb-6 text-center relative z-10">
        <div className="inline-flex items-center justify-center gap-1 mb-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
          <Flame className="h-3 w-3 text-orange-500 animate-bounce" />
          <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
            Trending Now
          </span>
          <Flame className="h-3 w-3 text-orange-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
        <h2 className="font-display text-2xl md:text-3xl mb-1 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">Scout's Hottest Picks</h2>
        <p className="text-xs text-muted-foreground">Most queried players by scouts</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-10">
        {topThree.map((player, idx) => {
          const colorScheme = colors[idx];
          const playerImageUrl = failedImages[player.playerId] ? getDummyAvatar(player.playerName, 300) : getPlayerImageUrl(player.playerId);
          return (
            <div key={player.playerId} className="group relative">
              <Link
                to={`/player/${player.playerId}`}
                className="group/card relative block"
              >
              {/* Premium card container */}
              <div className={`relative overflow-hidden rounded-xl border-2 ${colorScheme.border} bg-gradient-to-br ${colorScheme.bg} backdrop-blur-xl transition-all duration-500 hover:shadow-lg hover:border-opacity-100 p-3 h-full flex flex-col items-center group-hover:scale-105`}>
                
                {/* Animated glow background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.glow} opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-2xl -z-10`} />

                {/* Medal Badge */}
                <div className="text-3xl mb-1.5 animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {medals[idx]}
                </div>

                {/* Main Circular Avatar */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2">
                  {/* Hexagon shape wrapper */}
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <defs>
                        <linearGradient id={`hex-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="currentColor" className={colorScheme.accent} />
                          <stop offset="100%" stopColor="currentColor" className={colorScheme.accent} stopOpacity="0.3" />
                        </linearGradient>
                      </defs>
                      <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke={`url(#hex-${idx})`} strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Outer ring */}
                  <div className={`absolute inset-0 rounded-full border-2 ${colorScheme.border} group-hover:scale-110 transition-transform duration-500`} />

                  {/* Image circle */}
                  <img
                    src={playerImageUrl}
                    alt={player.playerName}
                    className="relative w-full h-full rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-500"
                    onError={() => {
                      if (!failedImages[player.playerId]) {
                        setFailedImages(prev => ({ ...prev, [player.playerId]: true }));
                      }
                    }}
                  />

                  {/* Query badge */}
                  <div className={`absolute -top-1 -right-1 flex items-center gap-0.5 bg-gradient-to-br ${colorScheme.bg} border-2 ${colorScheme.border} rounded-full px-1.5 py-0.5 text-xs font-bold shadow-lg`}>
                    <Zap className="h-2 w-2" />
                    <span className="text-xs">{player.queryCount}</span>
                  </div>

                  {/* Sparkle effect */}
                  <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
                  </div>
                </div>

                {/* Player Name */}
                <h3 className="font-display text-sm md:text-base text-center group-hover:text-primary transition-colors mb-1">
                  {player.playerName}
                </h3>

                {/* Question */}
                <p className="text-xs text-foreground/70 text-center italic line-clamp-2 mb-2.5 leading-snug">
                  "{player.mostAskedQuestion}"
                </p>

                {/* Stats Grid */}
                <div className="w-full grid grid-cols-3 gap-1.5 mb-2.5 pt-2 border-t border-border/50">
                  {player.playerDetails?.batting?.runs !== undefined && (
                    <div className="flex flex-col items-center justify-center p-1 rounded bg-primary/10">
                      <span className="font-bold text-primary text-xs">{player.playerDetails.batting.runs}</span>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-wider">Runs</span>
                    </div>
                  )}
                  {player.playerDetails?.bowling?.wickets !== undefined && (
                    <div className="flex flex-col items-center justify-center p-1 rounded bg-accent/10">
                      <span className="font-bold text-accent text-xs">{player.playerDetails.bowling.wickets}</span>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-wider">Wickets</span>
                    </div>
                  )}
                  {player.playerDetails?.fielding?.catches !== undefined && (
                    <div className="flex flex-col items-center justify-center p-1 rounded bg-green-500/10">
                      <span className="font-bold text-green-500 text-xs">{player.playerDetails.fielding.catches}</span>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-wider">Catches</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="text-xs font-bold text-primary group-hover:text-primary-glow transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details
                  <span className="group-hover:translate-x-0.5 transition-transform text-xs">→</span>
                </div>
              </div>
              </Link>

              {/* Share Button */}
              <Link
                to={`/share/player/${player.playerId}`}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 z-20 bg-primary/90 hover:bg-primary text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-glow hover:scale-110"
                title="Create Share Card"
              >
                <Share2 className="h-4 w-4" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Bottom decoration */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
        <TrendingUp className="h-3 w-3 text-primary" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
      </div>
    </section>
  );
};
