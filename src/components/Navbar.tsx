import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "wouter";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md cursor-pointer">
              <div className="font-display font-bold text-xl bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Discover Nairobi
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button 
              className="gap-2"
              data-testid="button-add-event"
            >
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
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
          <div className="md:hidden border-t py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
            <Button 
              className="w-full gap-2"
              data-testid="button-add-event-mobile"
            >
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}