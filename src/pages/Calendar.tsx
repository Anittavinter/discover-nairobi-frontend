import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";

// Sample events with dates
const CALENDAR_EVENTS = [
  { id: 1, title: "Amapiano Night", date: "2025-10-25", time: "8:00 PM", location: "Westlands", category: "Live Music", color: "hsl(var(--primary))" },
  { id: 2, title: "Morning Yoga", date: "2025-10-23", time: "6:30 AM", location: "Karura Forest", category: "Wellness", color: "hsl(var(--chart-2))" },
  { id: 3, title: "Tech Pitch Night", date: "2025-10-24", time: "6:00 PM", location: "iHub", category: "Tech", color: "hsl(var(--accent))" },
  { id: 4, title: "Nyama Choma Festival", date: "2025-10-26", time: "12:00 PM", location: "Karen", category: "Food", color: "hsl(var(--chart-1))" },
  { id: 5, title: "Art Exhibition", date: "2025-10-27", time: "10:00 AM", location: "Lavington", category: "Art", color: "hsl(var(--secondary))" },
  { id: 6, title: "Comedy Night", date: "2025-10-25", time: "7:30 PM", location: "Westlands", category: "Entertainment", color: "hsl(var(--primary))" },
  { id: 7, title: "Dance Workshop", date: "2025-10-28", time: "3:00 PM", location: "Kilimani", category: "Workshop", color: "hsl(var(--secondary))" },
  { id: 8, title: "Rooftop Party", date: "2025-10-26", time: "5:00 PM", location: "Parklands", category: "Social", color: "hsl(var(--accent))" },
  { id: 9, title: "Jazz Evening", date: "2025-10-29", time: "7:00 PM", location: "CBD", category: "Music", color: "hsl(var(--primary))" },
  { id: 10, title: "Startup Meetup", date: "2025-10-30", time: "6:00 PM", location: "Westlands", category: "Tech", color: "hsl(var(--accent))" },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(null);
  };

  // Get events for a specific date
  const getEventsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return CALENDAR_EVENTS.filter(event => event.date === dateStr);
  };

  // Get events for selected date
  const selectedDateEvents = selectedDate ? CALENDAR_EVENTS.filter(event => event.date === selectedDate) : [];

  // Build calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-24 md:h-32" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const events = getEventsForDate(day);
    const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
    const isSelected = selectedDate === dateStr;

    calendarDays.push(
      <div
        key={day}
        onClick={() => setSelectedDate(dateStr)}
        className={`h-24 md:h-32 border border-border p-2 cursor-pointer hover-elevate transition-all ${
          isToday ? 'bg-primary/10 border-primary' : ''
        } ${isSelected ? 'ring-2 ring-primary' : ''}`}
        data-testid={`calendar-day-${day}`}
      >
        <div className="flex flex-col h-full">
          <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-primary' : ''}`}>
            {day}
          </div>
          <div className="flex-1 overflow-hidden space-y-1">
            {events.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className="text-xs px-1.5 py-0.5 rounded truncate"
                style={{ 
                  backgroundColor: `${event.color}20`,
                  color: event.color,
                  borderLeft: `2px solid ${event.color}`
                }}
                data-testid={`calendar-event-${event.id}`}
              >
                {event.title}
              </div>
            ))}
            {events.length > 2 && (
              <div className="text-xs text-muted-foreground px-1">
                +{events.length - 2} more
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="py-12 px-4 md:px-8 border-b relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--accent)) 50%, hsl(var(--chart-2)) 100%)',
          }}
        >
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Event Calendar
            </h1>
            <p className="text-lg text-white/90">
              Your complete guide to what's happening in Nairobi
            </p>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      {MONTHS[currentMonth]} {currentYear}
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToToday}
                        data-testid="button-today"
                      >
                        Today
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToPreviousMonth}
                        data-testid="button-previous-month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToNextMonth}
                        data-testid="button-next-month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-0 mb-2">
                    {DAYS.map((day) => (
                      <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-0 border-t border-l border-border">
                    {calendarDays}
                  </div>

                  {/* Legend */}
                  <div className="mt-6 pt-6 border-t flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Music & Entertainment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary"></div>
                      <span className="text-muted-foreground">Art & Culture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent"></div>
                      <span className="text-muted-foreground">Tech & Innovation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-chart-2"></div>
                      <span className="text-muted-foreground">Wellness & Fitness</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Selected Date Events */}
              <div>
                <Card className="p-6 sticky top-4">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
                  </h3>

                  {selectedDate && selectedDateEvents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-4 rounded-lg border-l-4 hover-elevate"
                          style={{ 
                            borderLeftColor: event.color,
                            backgroundColor: `${event.color}10`
                          }}
                          data-testid={`selected-event-${event.id}`}
                        >
                          <h4 className="font-semibold mb-2">{event.title}</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <Badge className="mt-3" style={{ backgroundColor: event.color, color: "white" }}>
                            {event.category}
                          </Badge>
                        </div>
                      ))}
                      <Button className="w-full" data-testid="button-view-all-date">
                        View All Events
                      </Button>
                    </div>
                  ) : selectedDate && selectedDateEvents.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>No events scheduled for this date</p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>Click on a date to see events</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section 
          className="py-16 px-4 md:px-8"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--secondary) / 0.1) 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Explore More</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Browse events by category or see everything happening in Nairobi
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/categories">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover-elevate active-elevate-2 font-semibold">
                  Browse Categories
                </button>
              </a>
              <a href="/events">
                <button className="px-6 py-3 bg-card border border-input rounded-md hover-elevate active-elevate-2 font-semibold">
                  All Events
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}