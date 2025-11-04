import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQs from "@/pages/FAQs";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Events from "@/pages/Events";
import Categories from "@/pages/Categories";
import Calendar from "@/pages/Calendar";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login"; 
import Booking from "@/pages/Booking";
import Confirmation from "@/pages/Confirmation";
import MyTickets from "@/pages/MyTickets";
import Refund from "@/pages/Refund";
import Profile from "@/pages/Profile";
import AddEvent from "@/pages/AddEvent";
import OrganizerDashboard from "@/pages/OrganizerDashboard";
import BecomeOrganizer from "@/pages/BecomeOrganizer";
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/faqs" component={FAQs} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/events" component={Events} />
      <Route path="/categories" component={Categories} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/become-organizer" component={BecomeOrganizer} />
      <Route path="/booking" component={Booking} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/my-tickets" component={MyTickets} />
      <Route path="/refund" component={Refund} />
      <Route path="/profile" component={Profile} />
      <Route path="/add-event" component={AddEvent} />
      <Route path="/organizer" component={OrganizerDashboard} />
      <Route path="/organizer-dashboard" component={OrganizerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}