import { Link } from "react-router-dom";
import { Search, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface NavbarProps {
  categories?: string[];
}

export const Navbar = ({ categories = [] }: NavbarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Show arrows only if there are more than 5 categories
  const showArrows = categories.length > 5;

  return (
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
        
        <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground flex-1 mx-8">
          {/* Left Scroll Arrow - Only show if more than 5 categories */}
          {showArrows && (
            <button
              onClick={() => scroll("left")}
              className="flex-shrink-0 h-8 w-8 rounded flex items-center justify-center hover:bg-secondary/60 transition-smooth"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Scrollable Categories Container - Fixed width to show ~5 items */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-8 overflow-x-hidden scroll-smooth flex-1"
            style={{ scrollBehavior: "smooth" }}
          >
            <Link to="/" className="hover:text-foreground transition-smooth whitespace-nowrap flex-shrink-0">Home</Link>
            {categories.length > 0 ? (
              // Dynamic categories from API
              categories.map(category => (
                <a 
                  key={category} 
                  href={`#${category}`} 
                  className="hover:text-foreground transition-smooth whitespace-nowrap capitalize flex-shrink-0"
                >
                  Category {category.toUpperCase()}
                </a>
              ))
            ) : (
              // Fallback to hardcoded roles
              <>
                <a href="#batsmen" className="hover:text-foreground transition-smooth flex-shrink-0">Batsmen</a>
                <a href="#bowlers" className="hover:text-foreground transition-smooth flex-shrink-0">Bowlers</a>
                <a href="#allrounders" className="hover:text-foreground transition-smooth flex-shrink-0">All-rounders</a>
                <a href="#keepers" className="hover:text-foreground transition-smooth flex-shrink-0">Keepers</a>
              </>
            )}
          </div>

          {/* Right Scroll Arrow - Only show if more than 5 categories */}
          {showArrows && (
            <button
              onClick={() => scroll("right")}
              className="flex-shrink-0 h-8 w-8 rounded flex items-center justify-center hover:bg-secondary/60 transition-smooth"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        <button className="h-9 w-9 rounded-full bg-secondary/60 border border-border flex items-center justify-center hover:bg-secondary transition-smooth" aria-label="Search">
          <Search className="h-4 w-4" />
        </button>
      </nav>
    </header>
  );
};
