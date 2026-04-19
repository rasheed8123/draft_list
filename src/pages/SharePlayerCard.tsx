import { useParams, Link } from "react-router-dom";
import { Download, ArrowLeft, Share2 } from "lucide-react";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { getPlayer } from "@/data/players";
import { usePlayerStats } from "@/hooks/use-player-stats";
import { getPlayerImageUrl } from "@/lib/cricket-images";
import { getDummyAvatar } from "@/lib/avatar";

const SharePlayerCard = () => {
  const { id } = useParams();
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const player = id ? getPlayer(id) : undefined;
  const { data: apiPlayerStats } = usePlayerStats(id);

  const displayPlayer = player || {
    id: id || "api-player",
    name: apiPlayerStats?.playerName || `Player #${id}`,
    role: "All-rounder",
    country: "BBL",
    team: "TBD",
  };

  const playerImageUrl = imageError ? getDummyAvatar(displayPlayer.name) : getPlayerImageUrl(id || "");

  // Extract comprehensive stats
  const stats = {
    matches: apiPlayerStats?.batting?.matches || 0,
    runs: apiPlayerStats?.batting?.runs || 0,
    average: apiPlayerStats?.batting?.avg || 0,
    strikeRate: apiPlayerStats?.batting?.sr || 0,
    fifties: apiPlayerStats?.batting?.["50s"] || 0,
    hundreds: apiPlayerStats?.batting?.["100s"] || 0,
    wickets: apiPlayerStats?.bowling?.wickets || 0,
    economy: apiPlayerStats?.bowling?.economy || 0,
    catches: apiPlayerStats?.fielding?.catches || 0,
  };

  const handleDownload = async () => {
    if (!posterRef.current) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: null,
        scale: 2,
        allowTaint: true,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${displayPlayer.name.replace(/\s+/g, "_")}_BBL_Auction.png`;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-[420px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to={`/player/${id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="font-display text-2xl text-primary">Share Card</h1>
        </div>

        {/* Poster Container (Instagram Story 9:16) */}
        <div
          ref={posterRef}
          className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #2d1f0d 0%, #3d2815 25%, #4a3520 50%, #3d2815 75%, #2d1f0d 100%)`,
            boxShadow: '0 25px 50px rgba(215, 165, 85, 0.3), 0 50px 100px rgba(139, 98, 35, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Animated Background Gold Accents */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/35 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl" />
          </div>

          {/* Gradient Overlay - Gold to Dark */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

          <div className="relative z-10 h-full flex flex-col p-4 text-white overflow-hidden">
            {/* Top Spacer */}
            <div className="flex-none h-2" />

            {/* Main Auction Headline - CENTRAL FOCUS */}
            <div className="flex-none mb-6">
              <div className="relative">
                {/* Glowing Background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-yellow-400 to-primary rounded-2xl opacity-20 blur-xl" />
                <div className="relative bg-gradient-to-r from-primary/20 to-yellow-500/20 border-2 border-primary/60 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <div className="text-[10px] font-bold text-yellow-300 uppercase tracking-widest mb-1">⚡ AUCTION SPOTLIGHT ⚡</div>
                  <div className="font-display text-2xl font-black text-transparent bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text leading-tight mb-1">
                    PLAYER TO WATCH
                  </div>
                  <div className="text-lg font-black text-yellow-200 tracking-wider">BBL S4 AUCTION</div>
                  <div className="h-1 w-16 bg-gradient-to-r from-primary to-yellow-400 mx-auto mt-2 rounded-full" />
                </div>
              </div>
            </div>

            {/* Player Section */}
            <div className="flex-1 flex flex-col items-center justify-center mb-3 relative">
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 border-2 border-primary/25 rounded-full" />
                <div className="absolute w-48 h-48 border border-primary/15 rounded-full" />
              </div>

              {/* Glow Effect */}
              <div className="absolute w-44 h-44 bg-gradient-to-b from-primary/30 to-transparent rounded-full blur-3xl opacity-70" />

              {/* Player Image */}
              <div className="relative z-10 w-32 h-40">
                <img
                  src={playerImageUrl}
                  alt={displayPlayer.name}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-primary/70"
                  onError={() => setImageError(true)}
                />
                {/* Shimmer effect on image */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 rounded-2xl" />
              </div>

              {/* Player Name - Large Bold */}
              <h1 className="font-display text-4xl font-black text-center text-white drop-shadow-2xl mt-3 leading-tight">
                {displayPlayer.name}
              </h1>

              {/* Role & ID Badge */}
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-primary/40 border border-primary/60 rounded-full px-3 py-1 text-sm text-primary font-black">
                  {displayPlayer.role}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {/* Runs */}
              <div className="bg-gradient-to-br from-primary/35 to-primary/15 border border-primary/50 rounded-lg p-2 text-center backdrop-blur-sm">
                <div className="text-lg font-display font-black text-primary">
                  {stats.runs}
                </div>
                <p className="text-[8px] text-gray-200 uppercase tracking-wider font-bold mt-0.5">Runs</p>
              </div>

              {/* Wickets */}
              <div className="bg-gradient-to-br from-yellow-500/35 to-yellow-500/15 border border-yellow-500/50 rounded-lg p-2 text-center backdrop-blur-sm">
                <div className="text-lg font-display font-black text-yellow-300">
                  {stats.wickets}
                </div>
                <p className="text-[8px] text-gray-200 uppercase tracking-wider font-bold mt-0.5">Wickets</p>
              </div>

              {/* Catches */}
              <div className="bg-gradient-to-br from-green-500/35 to-green-500/15 border border-green-500/50 rounded-lg p-2 text-center backdrop-blur-sm">
                <div className="text-lg font-display font-black text-green-300">
                  {stats.catches}
                </div>
                <p className="text-[8px] text-gray-200 uppercase tracking-wider font-bold mt-0.5">Catches</p>
              </div>

              {/* Average */}
              <div className="bg-gradient-to-br from-blue-500/35 to-blue-500/15 border border-blue-500/50 rounded-lg p-1.5 text-center backdrop-blur-sm">
                <div className="text-sm font-display font-black text-blue-300">
                  {stats.average.toFixed(1)}
                </div>
                <p className="text-[7px] text-gray-200 uppercase tracking-wider font-bold mt-0.5">Avg</p>
              </div>

              {/* Strike Rate */}
              <div className="bg-gradient-to-br from-orange-500/35 to-orange-500/15 border border-orange-500/50 rounded-lg p-1.5 text-center backdrop-blur-sm">
                <div className="text-sm font-display font-black text-orange-300">
                  {stats.strikeRate.toFixed(0)}
                </div>
                <p className="text-[7px] text-gray-200 uppercase tracking-wider font-bold mt-0.5">SR</p>
              </div>

              {/* Economy */}
              <div className="bg-gradient-to-br from-purple-500/35 to-purple-500/15 border border-purple-500/50 rounded-lg p-1.5 text-center backdrop-blur-sm">
                <div className="text-sm font-display font-black text-purple-300">
                  {stats.economy.toFixed(1)}
                </div>
                <p className="text-[7px] text-gray-200 uppercase tracking-wider font-bold mt-0.5">Eco</p>
              </div>

              {/* Fifties */}
              <div className="bg-gradient-to-br from-indigo-500/35 to-indigo-500/15 border border-indigo-500/50 rounded-lg p-1.5 text-center backdrop-blur-sm">
                <div className="text-sm font-display font-black text-indigo-300">
                  {stats.fifties}
                </div>
                <p className="text-[7px] text-gray-200 uppercase tracking-wider font-bold mt-0.5">50s</p>
              </div>

              {/* Hundreds */}
              <div className="bg-gradient-to-br from-rose-500/35 to-rose-500/15 border border-rose-500/50 rounded-lg p-1.5 text-center backdrop-blur-sm">
                <div className="text-sm font-display font-black text-rose-300">
                  {stats.hundreds}
                </div>
                <p className="text-[7px] text-gray-200 uppercase tracking-wider font-bold mt-0.5">100s</p>
              </div>

              {/* Matches */}
              <div className="bg-gradient-to-br from-cyan-500/35 to-cyan-500/15 border border-cyan-500/50 rounded-lg p-1.5 text-center backdrop-blur-sm">
                <div className="text-sm font-display font-black text-cyan-300">
                  {stats.matches}
                </div>
                <p className="text-[7px] text-gray-200 uppercase tracking-wider font-bold mt-0.5">M</p>
              </div>
            </div>

            {/* Footer Badge */}
            <div className="text-center border-t border-primary/30 pt-2">
              <p className="text-[9px] text-yellow-200 font-black uppercase tracking-wider">
                🏏 <span className="text-primary">PitchIQ</span> BBL Analytics 🏏
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 mb-12">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-yellow-400 text-primary-foreground font-black py-3 px-4 rounded-lg hover:shadow-glow transition-smooth disabled:opacity-50 uppercase text-sm tracking-wider"
          >
            <Download className="h-5 w-5" />
            {downloading ? "Downloading..." : "Download"}
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${displayPlayer.name} - BBL Auction Card`,
                  text: `🔥 ${displayPlayer.name} - Player to watch in BBL Season 4! Don't miss out! 🏏`,
                });
              }
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-primary text-white font-black py-3 px-4 rounded-lg hover:shadow-glow transition-smooth uppercase text-sm tracking-wider"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePlayerCard;
