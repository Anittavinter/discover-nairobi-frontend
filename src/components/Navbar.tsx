import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md" data-testid="link-logo">
              <div className="font-display font-bold text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Discover Nairobi
              </div>
            </a>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              className="gap-2"
              data-testid="button-add-event"
            >
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}