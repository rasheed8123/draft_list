import { Link } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";

interface NavbarProps {
  categories?: string[];
}

export const Navbar = ({ categories = [] }: NavbarProps) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background via-background/80 to-transparent">
    <nav className="flex items-center justify-between px-6 md:px-12 py-4">
      <Link to="/" className="flex items-center gap-2">
        <span className="h-8 w-8 rounded-md gradient-primary flex items-center justify-center shadow-glow">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </span>
        <span className="font-display text-2xl tracking-wider">
          PITCH<span className="text-primary">IQ</span>
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground overflow-x-auto">
        <Link to="/" className="hover:text-foreground transition-smooth whitespace-nowrap">Home</Link>
        {categories.length > 0 ? (
          // Dynamic categories from API
          categories.map(category => (
            <a 
              key={category} 
              href={`#${category}`} 
              className="hover:text-foreground transition-smooth whitespace-nowrap capitalize"
            >
              Category {category.toUpperCase()}
            </a>
          ))
        ) : (
          // Fallback to hardcoded roles
          <>
            <a href="#batsmen" className="hover:text-foreground transition-smooth">Batsmen</a>
            <a href="#bowlers" className="hover:text-foreground transition-smooth">Bowlers</a>
            <a href="#allrounders" className="hover:text-foreground transition-smooth">All-rounders</a>
            <a href="#keepers" className="hover:text-foreground transition-smooth">Keepers</a>
          </>
        )}
      </div>
      <button className="h-9 w-9 rounded-full bg-secondary/60 border border-border flex items-center justify-center hover:bg-secondary transition-smooth" aria-label="Search">
        <Search className="h-4 w-4" />
      </button>
    </nav>
  </header>
);
