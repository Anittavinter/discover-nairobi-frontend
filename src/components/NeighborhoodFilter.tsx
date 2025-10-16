import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const neighborhoods = [
  "Westlands",
  "Karen",
  "Kilimani",
  "Muthaiga",
  "Ruaka",
  "Limuru",
  "Kiambu Road",
  "Lavington",
  "Runda",
  "Spring Valley"
];

interface NeighborhoodFilterProps {
  selectedNeighborhoods: string[];
  onToggle: (neighborhood: string) => void;
}

export function NeighborhoodFilter({ selectedNeighborhoods, onToggle }: NeighborhoodFilterProps) {
  return (
    <div className="bg-muted/30 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-display font-semibold text-sm">Filter by Neighborhood</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          {neighborhoods.map((neighborhood) => (
            <Badge
              key={neighborhood}
              variant={selectedNeighborhoods.includes(neighborhood) ? "default" : "secondary"}
              className="cursor-pointer hover-elevate active-elevate-2"
              onClick={() => onToggle(neighborhood)}
              data-testid={`badge-neighborhood-${neighborhood.toLowerCase()}`}
            >
              {neighborhood}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}