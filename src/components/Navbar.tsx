import { Link } from "react-router-dom";
import { Search, Sparkles, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface NavbarProps {
  categories?: string[];
}

export const Navbar = ({ categories = [] }: NavbarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background via-background/95 to-background/60 backdrop-blur-md border-b border-primary/10 shadow-glow">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-8 w-8 rounded-md gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-lg transition-smooth group-hover:scale-110">
            <Sparkles className="h-4 w-4 text-primary-foreground animate-rotate-slow" />
          </span>
          <span className="font-display text-2xl tracking-wider bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            PITCH<span className="text-primary">IQ</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground flex-1 mx-8">
          <Link to="/" className="hover:text-primary transition-smooth whitespace-nowrap hover:underline hover:underline-offset-4 decoration-primary">Home</Link>

          {/* Categories Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:text-primary transition-smooth whitespace-nowrap px-3 py-2 rounded hover:bg-primary/10 border border-transparent hover:border-primary/30"
            >
              Categories
              <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180 text-primary' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-secondary/95 backdrop-blur-lg border border-primary/30 rounded-lg shadow-lg py-2 min-w-max z-50">
                {categories.length > 0 ? (
                  categories.map(category => (
                    <a
                      key={category}
                      href={`#${category}`}
                      className="block px-4 py-2 hover:bg-primary/20 hover:text-primary transition-smooth capitalize text-sm"
                      onClick={() => setDropdownOpen(false)}
                    >
                     {category.toUpperCase()}
                    </a>
                  ))
                ) : (
                  <>
                    <a href="#batsmen" className="block px-4 py-2 hover:bg-primary/20 hover:text-primary transition-smooth text-sm" onClick={() => setDropdownOpen(false)}>Batsmen</a>
                    <a href="#bowlers" className="block px-4 py-2 hover:bg-primary/20 hover:text-primary transition-smooth text-sm" onClick={() => setDropdownOpen(false)}>Bowlers</a>
                    <a href="#allrounders" className="block px-4 py-2 hover:bg-primary/20 hover:text-primary transition-smooth text-sm" onClick={() => setDropdownOpen(false)}>All-rounders</a>
                    <a href="#keepers" className="block px-4 py-2 hover:bg-primary/20 hover:text-primary transition-smooth text-sm" onClick={() => setDropdownOpen(false)}>Keepers</a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <button className="h-9 w-9 rounded-full bg-secondary/60 border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-smooth hover:scale-110 shadow-glow" aria-label="Search">
          <Search className="h-4 w-4 text-primary" />
        </button>
      </nav>
    </header>
  );
};
