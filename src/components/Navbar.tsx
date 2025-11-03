import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Ticket, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Link, useLocation } from "wouter";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

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
              <Link href="/organizer-dashboard">
                <Button
                  variant={location === "/organizer-dashboard" ? "default" : "outline"}
                  size="sm"
                  data-testid="button-nav-organizer-dashboard"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Organizer
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  variant={location === "/profile" ? "default" : "ghost"}
                  size="sm"
                  data-testid="button-nav-profile"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <ThemeToggle />
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

            <Link href="/organizer-dashboard" className="block">
              <Button
                variant={location === "/organizer-dashboard" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="button-nav-mobile-organizer-dashboard"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Organizer Dashboard
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