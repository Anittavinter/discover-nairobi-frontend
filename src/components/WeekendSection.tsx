import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sunrise, Sun, Sunset, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import { EventCard, type Event } from "./EventCard";
import useEmblaCarousel from "embla-carousel-react";

const timeSlots = [
  { id: "all", label: "All Times", icon: null },
  { id: "morning", label: "Morning", icon: Sunrise, hours: [6, 7, 8, 9, 10, 11] },
  { id: "afternoon", label: "Afternoon", icon: Sun, hours: [12, 13, 14, 15, 16] },
  { id: "evening", label: "Evening", icon: Sunset, hours: [17, 18, 19, 20] },
  { id: "night", label: "Night", icon: Moon, hours: [21, 22, 23, 0, 1, 2, 3, 4, 5] }
];

interface WeekendSectionProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  isFavorite?: (eventId: string) => boolean;
  onToggleFavorite?: (eventId: string) => void;
}

export function WeekendSection({ events, onEventClick, isFavorite, onToggleFavorite }: WeekendSectionProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("all");
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true
  });

  const filteredEvents = events.filter(event => {
    if (selectedTimeSlot === "all") return true;
    
    const hour = parseInt(event.time.split(":")[0]);
    const slot = timeSlots.find(s => s.id === selectedTimeSlot);
    return slot?.hours?.includes(hour);
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl font-bold text-center mb-8">
          Happening This Weekend
        </h2>

        {/* Time Slot Filters - Better Touch Targets on Mobile */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {timeSlots.map((slot) => {
            const Icon = slot.icon;
            return (
              <Button
                key={slot.id}
                variant={selectedTimeSlot === slot.id ? "default" : "outline"}
                className="gap-2 min-h-10 md:min-h-9 px-4 md:px-3 text-base md:text-sm"
                onClick={() => setSelectedTimeSlot(slot.id)}
                data-testid={`button-timeslot-${slot.id}`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {slot.label}
              </Button>
            );
          })}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No events found for this time slot. Try another time!
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => onEventClick(event)}
                  isFavorite={isFavorite?.(event.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>

            {/* Mobile Swipeable Carousel */}
            <div className="md:hidden relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 touch-pan-y">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="flex-[0_0_85%] min-w-0">
                      <EventCard
                        event={event}
                        onClick={() => onEventClick(event)}
                        isFavorite={isFavorite?.(event.id)}
                        onToggleFavorite={onToggleFavorite}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation Buttons */}
              {filteredEvents.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/90 backdrop-blur-sm shadow-lg min-h-12 min-w-12"
                    onClick={scrollPrev}
                    data-testid="button-carousel-prev"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/90 backdrop-blur-sm shadow-lg min-h-12 min-w-12"
                    onClick={scrollNext}
                    data-testid="button-carousel-next"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}