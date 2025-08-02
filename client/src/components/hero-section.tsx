import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import AIChatbotDemo from "./ai-chatbot-demo";
import { fadeInUp, fadeInLeft, fadeInRight, floatAnimation } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-navy via-navy to-purple overflow-hidden flex items-center pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-electric/10 rounded-full blur-3xl"
          {...floatAnimation}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple/10 rounded-full blur-3xl"
          {...floatAnimation}
          transition={{ ...floatAnimation.animate.transition, delay: 3 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div 
            className="text-white space-y-8"
            {...fadeInLeft}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="gradient-text">AI-Powered</span><br />
                Web Design<br />
                <span className="text-electric">Revolution</span>
              </motion.h1>
              <motion.p 
                className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl"
                {...fadeInUp}
                transition={{ delay: 0.4 }}
              >
                Transform your digital presence with cutting-edge web design and intelligent AI integration. We create websites that think, adapt, and convert.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              {...fadeInUp}
              transition={{ delay: 0.6 }}
            >
              <Button 
                size="lg"
                className="bg-electric text-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300 hover:scale-105 transform"
              >
                Get Your AI Website
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="pt-8"
              {...fadeInUp}
              transition={{ delay: 0.8 }}
            >
              <p className="text-gray-400 text-sm mb-4">Trusted by 500+ companies worldwide</p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="text-white font-semibold">Google</div>
                <div className="text-white font-semibold">Microsoft</div>
                <div className="text-white font-semibold">Shopify</div>
                <div className="text-white font-semibold">Stripe</div>
              </div>
            </motion.div>
          </motion.div>

          {/* AI Demo Widget */}
          <motion.div
            {...fadeInRight}
            transition={{ delay: 0.4 }}
          >
            <AIChatbotDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
