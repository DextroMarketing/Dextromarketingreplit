import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DynamicBackground from "@/components/dynamic-background";
import CustomVapiWidget from "./components/custom-vapi-widget";
import Home from "@/pages/home";
import Services from "@/pages/services";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import TryAI from "@/pages/try-ai";
import GetStarted from "@/pages/get-started";
import BookCall from "@/pages/book-call";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/try-ai" component={TryAI} />
      <Route path="/get-started" component={GetStarted} />
      <Route path="/book-call" component={BookCall} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DynamicBackground />
        <Toaster />
        <Router />
        <CustomVapiWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
