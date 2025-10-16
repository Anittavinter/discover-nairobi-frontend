import { Link } from "wouter";
import { Instagram, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card/50 backdrop-blur mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="font-display font-bold text-xl bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              Discover Nairobi
            </div>
            <p className="text-sm text-muted-foreground">
              Where Nairobi Comes Alive
            </p>
            <p className="text-sm text-muted-foreground">
              Discover every event in Nairobi. From sunrise yoga to midnight concerts. One platform, zero FOMO.
            </p>
          </div>

          {/* Discover Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide">Discover</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" data-testid="link-footer-events">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Browse Events
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/categories" data-testid="link-footer-categories">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Categories
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/calendar" data-testid="link-footer-calendar">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Calendar
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" data-testid="link-footer-about">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="link-footer-contact">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/faqs" data-testid="link-footer-faqs">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    FAQs
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide">Get in Touch</h3>
            <div className="space-y-2">
              <a 
                href="mailto:hello@discovernairobi.co.ke" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                data-testid="link-footer-email"
              >
                hello@discovernairobi.co.ke
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com/discovernairobike"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover-elevate rounded-md transition-all"
                  aria-label="Instagram"
                  data-testid="link-footer-instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://tiktok.com/@discovernairobike"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover-elevate rounded-md transition-all"
                  aria-label="TikTok"
                  data-testid="link-footer-tiktok"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/yourusername/discover-nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover-elevate rounded-md transition-all"
                  aria-label="GitHub"
                  data-testid="link-footer-github"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Discover Nairobi. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/terms" data-testid="link-footer-terms">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Terms
              </span>
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/privacy" data-testid="link-footer-privacy">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Privacy
              </span>
            </Link>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">Built in Nairobi 🇰🇪</span>
          </div>
        </div>
      </div>
    </footer>
  );
}