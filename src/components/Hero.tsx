import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import heroImg from "@/assets/hero-stadium.jpg";
import type { Player } from "@/data/players";

export const Hero = ({ featured }: { featured: Player }) => (
  <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
    <img
      src={heroImg}
      alt="Cricket stadium under floodlights"
      width={1920}
      height={1024}
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 gradient-hero" />
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />

    <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-12 max-w-3xl">
      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 animate-fade-in-up">
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
        Auction Spotlight
      </span>
      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-4 animate-fade-in-up">
        {featured.name}
      </h1>
      <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-2 animate-fade-in-up">
        {featured.tagline}
      </p>
      <p className="text-sm text-foreground/80 mb-6 animate-fade-in-up">
        <span className="text-primary font-semibold">{featured.role}</span> · {featured.country} · Base {featured.basePrice}
      </p>
      <div className="flex gap-3 animate-fade-in-up">
        <Link
          to={`/player/${featured.id}`}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary-glow transition-smooth px-6 py-3 rounded-md font-semibold shadow-glow"
        >
          <Play className="h-5 w-5 fill-current" />
          View Insights
        </Link>
        <Link
          to={`/player/${featured.id}`}
          className="inline-flex items-center gap-2 bg-secondary/70 border border-border text-foreground hover:bg-secondary transition-smooth px-6 py-3 rounded-md font-semibold backdrop-blur-sm"
        >
          <Info className="h-5 w-5" />
          More Info
        </Link>
      </div>
    </div>
  </section>
);
