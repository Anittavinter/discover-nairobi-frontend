import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Category = 
  | "Live Music"
  | "Art Exhibitions"
  | "Tech & Innovation"
  | "Wellness & Fitness"
  | "Food & Dining"
  | "Fashion Shows"
  | "Cultural Festivals"
  | "Open Mics"
  | "Community Events"
  | "Workshops"
  | "Film Screenings"
  | "International DJs"
  | "Sports & Adventure";

export const categoryIcons: Record<Category, string> = {
  "Live Music": "🎭",
  "Art Exhibitions": "🎨",
  "Tech & Innovation": "💻",
  "Wellness & Fitness": "🧘",
  "Food & Dining": "🍽️",
  "Fashion Shows": "👗",
  "Cultural Festivals": "🎪",
  "Open Mics": "🎙️",
  "Community Events": "🌍",
  "Workshops": "📚",
  "Film Screenings": "🎬",
  "International DJs": "🎵",
  "Sports & Adventure": "🏇",
};

interface CategoryBadgeProps {
  category: Category;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CategoryBadge({ category, selected = false, onClick, className }: CategoryBadgeProps) {
  return (
    <Badge
      variant={selected ? "default" : "secondary"}
      className={cn(
        "cursor-pointer gap-2 text-xs hover-elevate active-elevate-2 font-medium whitespace-nowrap",
        selected && "bg-primary text-primary-foreground border-primary",
        !selected && "bg-secondary/10 text-secondary border-secondary/30",
        className
      )}
      onClick={onClick}
      data-testid={`badge-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {category !== "International DJs" && <span>{categoryIcons[category]}</span>}
      <span>{category}</span>
    </Badge>
  );
}