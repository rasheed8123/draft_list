import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Target, TrendingUp, Activity, Loader2, AlertCircle, Trophy, Share2 } from "lucide-react";
import { useState } from "react";
import { getPlayer } from "@/data/players";
import { usePlayerStats } from "@/hooks/use-player-stats";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { PerformanceChart } from "@/components/PerformanceChart";
import { AIChatPanel } from "@/components/AIChatPanel";
import { getRandomMotivation } from "@/lib/motivations";
import { getPlayerImageUrl } from "@/lib/cricket-images";
import { getDummyAvatar } from "@/lib/avatar";
import heroImg from "@/assets/hero-stadium.jpg";

const StatCard = ({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string | number; accent?: boolean }) => (
  <div className={`gradient-card border border-border rounded-lg p-4 ${accent ? "border-primary/40 shadow-glow" : ""}`}>
    <div className="flex items-center gap-2 text-muted-foreground mb-2">
      <Icon className="h-3.5 w-3.5" />
      <span className="text-[10px] uppercase tracking-wider">{label}</span>
    </div>
    <p className="font-display text-3xl text-foreground">{value}</p>
  </div>
);

const PlayerDetail = () => {
  const { id } = useParams();
  const [imageError, setImageError] = useState(false);
  const player = id ? getPlayer(id) : undefined;
  const { data: apiPlayerStats, loading: statsLoading, error: statsError } = usePlayerStats(id);

  // If no player found, create dummy data for API player IDs
  const dummyPlayer = player || {
    id: id || "api-player",
    name: `Player #${id}`,
    role: "All-rounder" as const,
    country: "BBL",
    team: "TBD",
    age: 25,
    basePrice: "₹1.5 Cr",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    tagline: getRandomMotivation(),
    stats: {
      matches: 0,
      runs: 0,
      average: 0,
      strikeRate: 0,
      hundreds: 0,
      fifties: 0,
      wickets: 0,
      economy: 0,
      bestBowling: "—",
      catches: 0,
    },
    recentForm: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    highlights: ["API Data", "Loading from backend", "Real stats coming soon"],
  };

  const displayPlayer = player || dummyPlayer;

  // Update name from API if available
  const finalPlayerName = apiPlayerStats?.playerName || displayPlayer.name;
  const finalTagline = apiPlayerStats?.tagline || getRandomMotivation();

  // Get consistent image for this player from assets/players folder, with fallback to dummy avatar
  const playerImage = imageError ? getDummyAvatar(finalPlayerName) : getPlayerImageUrl(id || "");

  // For API players, try to map API response to stats format
  const mappedStats = apiPlayerStats && !player
    ? {
        matches: apiPlayerStats.batting?.matches || 0,
        runs: apiPlayerStats.batting?.runs || 0,
        average: apiPlayerStats.batting?.avg || 0,
        strikeRate: apiPlayerStats.batting?.sr || 0,
        hundreds: apiPlayerStats.batting?.["100s"] || 0,
        fifties: apiPlayerStats.batting?.["50s"] || 0,
        wickets: apiPlayerStats.bowling?.wickets || 0,
        economy: apiPlayerStats.bowling?.economy || 0,
        bestBowling: apiPlayerStats.bowling?.bestbowling || "—",
        catches: apiPlayerStats.fielding?.catches || 0,
      }
    : displayPlayer.stats;

  const s = mappedStats;
  const isBowler = displayPlayer.role === "Bowler";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner */}
      <div className="relative h-[40vh] min-h-[280px] overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 gradient-glow" />
        
        <div className="absolute top-6 left-6 md:left-12 z-10 flex items-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-smooth bg-secondary/60 backdrop-blur-sm border border-border px-3 py-1.5 rounded-md"
          >
            <ArrowLeft className="h-4 w-4" /> Back to roster
          </Link>
          
          <Link
            to={`/share/player/${id}`}
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-glow transition-smooth bg-primary/20 backdrop-blur-sm border border-primary/40 px-3 py-1.5 rounded-md hover:bg-primary/30 shadow-glow"
            title="Create Share Card"
          >
            <Share2 className="h-4 w-4" /> Share Card
          </Link>
        </div>
      </div>

      <main className="px-6 md:px-12 -mt-32 relative z-10 pb-20 max-w-[1400px] mx-auto">
        {/* Loading State */}
        {statsLoading && !player && (
          <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-lg p-6 max-w-2xl mb-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary flex-shrink-0" />
            <span className="text-muted-foreground">Loading player details...</span>
          </div>
        )}

        {/* Error State */}
        {statsError && !player && (
          <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-6 max-w-2xl mb-6">
            <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-destructive">Failed to load player stats</h3>
              <p className="text-sm text-muted-foreground mt-1">{statsError.message}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Profile */}
          <aside className="lg:col-span-3">
            <div className="gradient-card border border-border rounded-xl overflow-hidden shadow-elevated">
              <div className="aspect-square">
                <img 
                  src={playerImage} 
                  alt={displayPlayer.name}
                  className="h-full w-full object-cover"
                  onError={() => {
                    if (!imageError) {
                      setImageError(true);
                    }
                  }}
                />
              </div>
              <div className="p-5">
                {/* <span className="text-xs uppercase tracking-wider text-primary font-semibold">{displayPlayer.role}</span> */}
                <h1 className="font-display text-3xl mt-1 leading-tight">{finalPlayerName}</h1>
                <p className="text-sm text-muted-foreground mt-1">{displayPlayer.country}</p>
                {apiPlayerStats && (
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mt-2">Category: {apiPlayerStats.category.toUpperCase()}</p>
                )}

                <div className="mt-5 space-y-3 text-sm">
                  <Row k="Team" v={displayPlayer.team} />
                  <Row k="Batting" v={displayPlayer.battingStyle} />
                  <Row k="Bowling" v={displayPlayer.bowlingStyle} />
                  <Row
                    k="Base Price"
                    v={
                      <span className="text-primary font-display text-lg">
                        {getBasePriceFromCategory(apiPlayerStats?.category)}
                      </span>
                    }
                  />
                  {apiPlayerStats?.meta && (
                    <>
                      <Row k="Source" v={apiPlayerStats.meta.source || "—"} />
                      <Row k="Last Updated" v={apiPlayerStats.meta.lastUpdated ? new Date(apiPlayerStats.meta.lastUpdated).toLocaleDateString() : "—"} />
                    </>
                  )}
                </div>
              </div>
            </div>


          </aside>

          {/* CENTER: Stats + Chart */}
          <section className="lg:col-span-5">
            <p className="text-base text-foreground/90 leading-relaxed mb-6 italic">"{finalTagline}"</p>

            <h2 className="font-display text-2xl mb-4 tracking-wide">Career Stats</h2>
            
            {/* Batting Stats */}
            {apiPlayerStats?.batting && (
              <div className="mb-8">
                <h3 className="font-display text-lg mb-3 text-primary">Batting Stats</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <StatCard icon={Activity} label="Matches" value={apiPlayerStats.batting.matches} />
                  <StatCard icon={Activity} label="Innings" value={apiPlayerStats.batting.innings} />
                  <StatCard icon={TrendingUp} label="Runs" value={apiPlayerStats.batting.runs} accent />
                  <StatCard icon={Target} label="Strike Rate" value={apiPlayerStats.batting.sr} accent />
                  <StatCard icon={Activity} label="Average" value={apiPlayerStats.batting.avg || "—"} />
                  <StatCard icon={Trophy} label="Highest" value={apiPlayerStats.batting.highestruns || "—"} />
                  <StatCard icon={Activity} label="50s" value={apiPlayerStats.batting["50s"] || 0} />
                  <StatCard icon={Activity} label="100s" value={apiPlayerStats.batting["100s"] || 0} />
                  <StatCard icon={Activity} label="30s" value={apiPlayerStats.batting["30s"] || 0} />
                  <StatCard icon={Activity} label="4s" value={apiPlayerStats.batting["4s"] || 0} />
                  <StatCard icon={Activity} label="6s" value={apiPlayerStats.batting["6s"] || 0} />
                  <StatCard icon={Activity} label="Ducks" value={apiPlayerStats.batting.ducks || 0} />
                  <StatCard icon={Trophy} label="Won" value={apiPlayerStats.batting.won || 0} />
                  <StatCard icon={Activity} label="Loss" value={apiPlayerStats.batting.loss || 0} />
                </div>
              </div>
            )}

            {/* Bowling Stats */}
            {apiPlayerStats?.bowling && (
              <div className="mb-8">
                <h3 className="font-display text-lg mb-3 text-primary">Bowling Stats</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <StatCard icon={Activity} label="Matches" value={apiPlayerStats.bowling.matches} />
                  <StatCard icon={Activity} label="Innings" value={apiPlayerStats.bowling.innings} />
                  <StatCard icon={TrendingUp} label="Wickets" value={apiPlayerStats.bowling.wickets} accent />
                  <StatCard icon={Target} label="Runs" value={apiPlayerStats.bowling.runs} />
                  <StatCard icon={Activity} label="Economy" value={apiPlayerStats.bowling.economy} accent />
                  <StatCard icon={Target} label="Strike Rate" value={apiPlayerStats.bowling.sr} />
                  <StatCard icon={Activity} label="Average" value={apiPlayerStats.bowling.avg} />
                  <StatCard icon={Trophy} label="Best Bowling" value={apiPlayerStats.bowling.bestbowling || "—"} />
                  <StatCard icon={Activity} label="Overs" value={apiPlayerStats.bowling.overs || "—"} />
                  <StatCard icon={Activity} label="Maidens" value={apiPlayerStats.bowling.maidens || 0} />
                  <StatCard icon={Activity} label="3 Wickets" value={apiPlayerStats.bowling["3wickets"] || 0} />
                  <StatCard icon={Activity} label="5 Wickets" value={apiPlayerStats.bowling["5wickets"] || 0} />
                  <StatCard icon={Activity} label="Wides" value={apiPlayerStats.bowling.wides || 0} />
                  <StatCard icon={Activity} label="No Balls" value={apiPlayerStats.bowling.noballs || 0} />
                  <StatCard icon={Activity} label="Dot Balls" value={apiPlayerStats.bowling.dotballs || 0} />
                </div>
              </div>
            )}

            {/* Fielding Stats */}
            {apiPlayerStats?.fielding && (
              <div className="mb-8">
                <h3 className="font-display text-lg mb-3 text-primary">Fielding Stats</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <StatCard icon={Activity} label="Matches" value={apiPlayerStats.fielding.matches} />
                  <StatCard icon={Trophy} label="Catches" value={apiPlayerStats.fielding.catches} accent />
                  <StatCard icon={Activity} label="Caught Behind" value={apiPlayerStats.fielding.caughtbehind || 0} />
                  <StatCard icon={Activity} label="Run Outs" value={apiPlayerStats.fielding.runouts || 0} />
                  <StatCard icon={Activity} label="Stumpings" value={apiPlayerStats.fielding.stumpings || 0} />
                  <StatCard icon={Activity} label="Assisted ROs" value={apiPlayerStats.fielding.assistedrunouts || 0} />
                  <StatCard icon={Activity} label="Bye Runs (WK)" value={apiPlayerStats.fielding.byerunswk || 0} />
                </div>
              </div>
            )}

            {/* Captain Stats */}
            {apiPlayerStats?.captain && (
              <div className="mb-8">
                <h3 className="font-display text-lg mb-3 text-primary">Captain Stats</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <StatCard icon={Activity} label="Matches" value={apiPlayerStats.captain.matches} />
                  <StatCard icon={Trophy} label="Toss Won" value={apiPlayerStats.captain.tosswon || 0} />
                  <StatCard icon={TrendingUp} label="Win %" value={`${apiPlayerStats.captain.winper || 0}%`} accent />
                  <StatCard icon={Activity} label="Loss %" value={`${apiPlayerStats.captain.lossper || 0}%`} />
                </div>
              </div>
            )}

            {/* Default Stats (for old data) */}
            {!apiPlayerStats && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatCard icon={Activity} label="Matches" value={s.matches} />
                {isBowler ? (
                  <>
                    <StatCard icon={Target} label="Wickets" value={s.wickets} accent />
                    <StatCard icon={TrendingUp} label="Economy" value={s.economy} />
                    <StatCard icon={Trophy} label="Best" value={s.bestBowling} />
                    <StatCard icon={Activity} label="Average" value={s.average} />
                    <StatCard icon={Activity} label="Catches" value={s.catches} />
                  </>
                ) : (
                  <>
                    <StatCard icon={TrendingUp} label="Runs" value={s.runs} accent />
                    <StatCard icon={Target} label="Strike Rate" value={s.strikeRate} />
                    <StatCard icon={Activity} label="Average" value={s.average} />
                    <StatCard icon={Trophy} label="100s / 50s" value={`${s.hundreds} / ${s.fifties}`} />
                    <StatCard icon={Activity} label="Catches" value={s.catches} />
                  </>
                )}
              </div>
            )}


          </section>

          {/* RIGHT: AI Chat */}
          <aside className="lg:col-span-4 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <AIChatPanel player={{ ...displayPlayer, name: finalPlayerName }} />
          </aside>
        </div>
      </main>
    </div>
  );
};

const getBasePriceFromCategory = (category?: string) => {
  if (!category) return "500 pts";

  const c = category
    .toLowerCase()
    .replace(/\s+/g, " ") // normalize spaces
    .trim();

  if (c === "all rounder 1" || c === "batsman 1") return "2000 pts";
  if (c === "all rounder 2" || c === "batsman 2") return "1000 pts";

  return "500 pts";
};

const Row = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-2 last:border-0">
    <span className="text-xs uppercase tracking-wider text-muted-foreground">{k}</span>
    <span className="text-foreground text-right">{v}</span>
  </div>
);

export default PlayerDetail;
