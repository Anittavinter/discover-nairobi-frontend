import { Route, Switch } from "wouter";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQs from "@/pages/FAQs";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Events from "@/pages/Events";
import Categories from "@/pages/Categories";
import Calendar from "@/pages/Calendar";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <ThemeProvider>
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
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  );
}