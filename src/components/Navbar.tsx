import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Ticket, LayoutDashboard, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout, isOrganizer, isLoggedIn } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Browse Events" },
    { href: "/categories", label: "Categories" },
    { href: "/calendar", label: "Calendar" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md cursor-pointer">
              <img 
                src="/logo.png" 
                alt="Discover Nairobi" 
                className="h-14 w-14 object-contain"
              />
              <div className="font-display font-bold text-xl bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Discover Nairobi
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "default" : "ghost"}
                  size="sm"
                  data-testid={`button-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            
            <div className="ml-2 pl-2 border-l flex items-center gap-1">
              {isLoggedIn && (
                <Link href="/my-tickets">
                  <Button
                    variant={location === "/my-tickets" ? "default" : "ghost"}
                    size="sm"
                    data-testid="button-nav-my-tickets"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    My Tickets
                  </Button>
                </Link>
              )}

              {/* Only show Organizer Dashboard if user is an organizer */}
              {isOrganizer && (
                <Link href="/organizer">
                  <Button
                    variant={location.startsWith("/organizer") ? "default" : "outline"}
                    size="sm"
                    data-testid="button-nav-organizer-dashboard"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Organizer
                  </Button>
                </Link>
              )}

              <ThemeToggle />

              {/* Profile Dropdown or Login Button */}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={location === "/profile" ? "default" : "ghost"}
                      size="sm"
                      data-testid="button-nav-profile"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user?.name || user?.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <Link href="/profile">
                      <DropdownMenuItem data-testid="menu-profile">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/my-tickets">
                      <DropdownMenuItem data-testid="menu-my-tickets">
                        <Ticket className="w-4 h-4 mr-2" />
                        My Tickets
                      </DropdownMenuItem>
                    </Link>
                    
                    {isOrganizer && (
                      <Link href="/organizer">
                        <DropdownMenuItem data-testid="menu-organizer">
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Organizer Dashboard
                        </DropdownMenuItem>
                      </Link>
                    )}

                    {/* Show "Become an Organizer" for regular users */}
                    {!isOrganizer && (
                      <>
                        <DropdownMenuSeparator />
                        <Link href="/become-organizer">
                          <DropdownMenuItem 
                            className="text-primary font-semibold"
                            data-testid="menu-become-organizer"
                          >
                            🎤 Become an Organizer
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      data-testid="menu-logout"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button size="sm" data-testid="button-nav-login">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover-elevate rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block">
                <Button
                  variant={location === link.href ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`button-nav-mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            
            {isLoggedIn && (
              <>
                <Link href="/my-tickets" className="block">
                  <Button
                    variant={location === "/my-tickets" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="button-nav-mobile-my-tickets"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    My Tickets
                  </Button>
                </Link>

                <Link href="/profile" className="block">
                  <Button
                    variant={location === "/profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="button-nav-mobile-profile"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
              </>
            )}

            {isOrganizer && (
              <Link href="/organizer" className="block">
                <Button
                  variant={location.startsWith("/organizer") ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="button-nav-mobile-organizer-dashboard"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Organizer Dashboard
                </Button>
              </Link>
            )}

            {!isOrganizer && isLoggedIn && (
              <Link href="/become-organizer" className="block">
                <Button 
                  variant="default"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="button-nav-mobile-become-organizer"
                >
                  🎤 Become an Organizer
                </Button>
              </Link>
            )}

            {isLoggedIn ? (
              <Button 
                variant="ghost"
                className="w-full justify-start"
                onClick={handleLogout}
                data-testid="button-nav-mobile-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Link href="/login" className="block">
                <Button 
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="button-nav-mobile-login"
                >
                  Login
                </Button>
              </Link>
            )}
            
            <div className="flex items-center justify-between pt-2 px-2 border-t">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}