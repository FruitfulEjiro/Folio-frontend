import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Palette, Plus, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleGeneratePortfolio = () => {
    navigate('/generate');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Helper function to get initials from user name
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
          {isAuthenticated && (
            <Link 
              to="/generate" 
              className={`hover:text-primary transition-colors ${
                location.pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Generate Portfolio
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {/* {/* {isAuthenticated ? ( */}
            <>
              <Button 
                onClick={handleGeneratePortfolio}
                variant="gradient" 
                size="sm"
                className="hidden sm:flex"
              >
                <Plus className="w-4 h-4 mr-2" />
                Generate Portfolio
              </Button>
              
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="Profile" />
                      <AvatarFallback className="bg-gradient-primary text-white text-xs">
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name || 'User'}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleGeneratePortfolio} className="cursor-pointer sm:hidden">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Generate Portfolio</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </>
          {/* ) : ( }*/} 
            {/* <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="gradient">Get Started</Button>
              </Link>
            </> */}
          {/* )} */}
        </div>
      </div>
    </header>
  );
};

export default Header;