import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Palette } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          Folio
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/explore" 
            className={`hover:text-primary transition-colors ${
              location.pathname === '/explore' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Explore Templates
          </Link>
          <Link 
            to="/generate" 
            className={`hover:text-primary transition-colors ${
              location.pathname === '/generate' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Generate Portfolio
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="gradient">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;