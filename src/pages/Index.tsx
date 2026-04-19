import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ApiPlayerRow } from "@/components/ApiPlayerRow";
import { TrendingPlayersSection } from "@/components/TrendingPlayersSection";
import { usePlayersApi } from "@/hooks/use-players-api";
import { PlayerRow } from "@/components/PlayerRow";
import { players } from "@/data/players";
import { AlertCircle, Loader2 } from "lucide-react";

const Index = () => {
  const { data, loading, error } = usePlayersApi();

  // Fallback featured player from dummy data
  const featured = players[0];

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar categories={[]} />
        <main>
          <TrendingPlayersSection />
          <div className="px-6 md:px-12 py-12 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-6 max-w-2xl">
              <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-destructive">Failed to load players</h3>
                <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar categories={[]} />
        <main>
          <TrendingPlayersSection />
          <div className="px-6 md:px-12 py-12 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-muted-foreground">Loading players...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar categories={data && data.data ? Object.keys(data.data) : []} />
      <main>
        {/* Trending Players Section */}
        <TrendingPlayersSection />

        {/* Players by Category */}
        <div className="relative pb-24">
          {data && data.data && Object.entries(data.data).length > 0 ? (
            // Dynamically render categories from API
            Object.entries(data.data).map(([category, categoryPlayers]) => (
              <section key={category} id={category}>
                <ApiPlayerRow 
                  title={`Category ${category.toUpperCase()}`} 
                  players={categoryPlayers} 
                />
              </section>
            ))
          ) : (
            // Fallback to dummy data if no API data
            <>
              <section id="trending"><PlayerRow title="Trending Auction Picks" players={[players[2], players[7], players[5], players[10], players[3], players[11]]} /></section>
              <section id="batsmen"><PlayerRow title="Top Batsmen" players={players.filter(p => p.role === "Batsman")} /></section>
              <section id="bowlers"><PlayerRow title="Strike Bowlers" players={players.filter(p => p.role === "Bowler")} /></section>
              <section id="allrounders"><PlayerRow title="Match-Winning All-rounders" players={players.filter(p => p.role === "All-rounder")} /></section>
              <section id="keepers"><PlayerRow title="Wicket-keepers" players={players.filter(p => p.role === "Wicket-keeper")} /></section>
            </>
          )}
        </div>
        <footer className="border-t border-border py-8 px-6 md:px-12 text-center text-xs text-muted-foreground">
          PitchIQ · Player Intelligence for Auction Day
        </footer>
      </main>
    </div>
  );
};

export default Index;
