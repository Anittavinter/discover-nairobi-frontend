import { CategoryBadge, type Category } from "./CategoryBadge";
import { ScrollArea } from "@/components/ui/scroll-area";

const categories: Category[] = [
  "Live Music",
  "Art Exhibitions",
  "Tech & Innovation",
  "Wellness & Fitness",
  "Food & Dining",
  "Fashion Shows",
  "Cultural Festivals",
  "Open Mics",
  "Community Events",
  "Workshops",
  "Film Screenings",
  "International DJs",
];

interface CategoryFilterProps {
  selectedCategories: Category[];
  onToggle: (category: Category) => void;
}

export function CategoryFilter({ selectedCategories, onToggle }: CategoryFilterProps) {
  return (
    <div className="border-b bg-muted/30">
      <ScrollArea className="w-full">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 flex-wrap md:flex-nowrap">
            {categories.map((category) => (
              <CategoryBadge
                key={category}
                category={category}
                selected={selectedCategories.includes(category)}
                onClick={() => onToggle(category)}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}