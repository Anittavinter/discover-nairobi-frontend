import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { EventCard, type Event } from "./EventCard";

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
}

export function WeekendSection({ events, onEventClick }: WeekendSectionProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("all");

  const filteredEvents = events.filter(event => {
    if (selectedTimeSlot === "all") return true;
    
    const hour = parseInt(event.time.split(":")[0]);
    const slot = timeSlots.find(s => s.id === selectedTimeSlot);
    return slot?.hours?.includes(hour);
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl font-bold text-center mb-8">
          Happening This Weekend
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {timeSlots.map((slot) => {
            const Icon = slot.icon;
            return (
              <Button
                key={slot.id}
                variant={selectedTimeSlot === slot.id ? "default" : "outline"}
                className="gap-2"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onEventClick(event)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}