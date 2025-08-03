import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import AIChatbotDemo from "./ai-chatbot-demo";
import { fadeInUp, fadeInLeft, fadeInRight, floatAnimation } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center pt-20">

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
                Build More. Stress Less.<br />
                <span className="text-dxm-orange">Let AI Handle Your Business Operations.</span>
              </motion.h1>
              <motion.p 
                className="text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-2xl"
                {...fadeInUp}
                transition={{ delay: 0.4 }}
              >
                You started your business to build, create, and solve problems — not to chase paperwork, miss calls, or lose sleep over admin tasks. Our AI-powered systems handle the business side, so you can focus on what you do best.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              {...fadeInUp}
              transition={{ delay: 0.6 }}
            >
              <Button 
                size="lg"
                className="bg-dxm-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-dxm-gold hover:text-navy transition-all duration-300 hover:scale-105 transform"
              >
                Get Your Free Digital Assessment
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                See How It Works
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="pt-8"
              {...fadeInUp}
              transition={{ delay: 0.8 }}
            >
              <p className="text-gray-200 text-sm mb-4">Trusted by 200+ construction and home improvement businesses</p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="text-white font-semibold">Premier Roofing</div>
                <div className="text-white font-semibold">BuildRight Contractors</div>
                <div className="text-white font-semibold">HomePro Remodelling</div>
                <div className="text-white font-semibold">Elite Plumbing</div>
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
