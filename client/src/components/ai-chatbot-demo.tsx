import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, User, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    text: "Hi! I help contractors like you generate more leads. What type of construction business do you run?",
    isBot: true,
    timestamp: new Date()
  }
];

const botResponses = [
  "Great! I can help you capture more emergency service calls and pre-qualify leads automatically.",
  "Our contractors typically see 300% more qualified leads within 90 days. What's your biggest challenge right now?",
  "Would you like to see how we help plumbers capture after-hours emergency calls?",
  "I can show you examples of contractor websites that dominate local search results.",
  "Let me help you set up automated quote systems for your most common services."
];

export default function AIChatbotDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (text: string, isBot = false) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    addMessage(inputValue);
    setInputValue("");
    
    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      addMessage(randomResponse, true);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="glass-effect rounded-3xl p-6 relative text-[#ee9d2b]">
      {/* Window Controls */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        <span className="text-white text-sm ml-4 font-medium">AI Lead Generation Assistant</span>
      </div>
      {/* Chat Messages */}
      <div className="space-y-3 max-h-64 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-white/20">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-start space-x-3 ${message.isBot ? '' : 'justify-end'}`}
            >
              {message.isBot && (
                <div className="w-8 h-8 bg-dxm-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-xs rounded-lg p-3 ${
                message.isBot 
                  ? 'bg-dxm-orange/90 text-white' 
                  : 'bg-white/90 text-navy'
              }`}>
                <p className="text-sm">{message.text}</p>
              </div>
              {!message.isBot && (
                <div className="w-8 h-8 bg-dxm-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start space-x-3"
          >
            <div className="w-8 h-8 bg-dxm-orange rounded-full flex items-center justify-center animate-pulse">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div className="bg-dxm-orange/20 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      {/* Input */}
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Ask about lead generation..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-white/90 border-gray-300 text-navy placeholder-gray-600"
        />
        <Button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className="bg-dxm-orange text-white hover:bg-dxm-gold hover:text-navy px-4"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
