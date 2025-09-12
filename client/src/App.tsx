import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DynamicBackground from "@/components/dynamic-background";
import { VapiWidget } from "@/components/vapi-widget";
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
        <VapiWidget
          publicKey="36530774-8f0e-467f-8c57-1700b2e778ae"
          assistantId="4050a1a9-8faf-4234-8ac3-b75203b1abb2"
          mode="voice"
          theme="dark"
          baseBgColor="#000000"
          accentColor="#004fff"
          ctaButtonColor="#000000"
          ctaButtonTextColor="#ffffff"
          borderRadius="large"
          size="full"
          position="bottom-left"
          title="TALK WITH AI"
          startButtonText="Start"
          endButtonText="End Call"
          chatFirstMessage="Hey, How can I help you today?"
          chatPlaceholder="Type your message..."
          voiceShowTranscript={true}
          consentRequired={true}
          consentTitle="Terms and conditions"
          consentContent="By clicking 'Agree,' and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service."
          consentStorageKey="vapi_widget_consent"
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
