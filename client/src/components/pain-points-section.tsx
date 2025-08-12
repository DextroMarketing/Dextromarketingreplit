import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, MessageCircle, Calculator, FileText, Check } from "lucide-react";
import { fadeInUp, staggerChildren } from "@/lib/animations";

const painPoints = [
  {
    icon: Phone,
    problem: "Never Miss Another Lead",
    description: "Phone rings while you're on-site, potential customers hang up, competitors get the job",
    solution: "AI-powered lead capture system responds instantly, qualifies prospects, and books consultations automatically",
    result: "Capture 3x more leads without hiring additional staff"
  },
  {
    icon: Calendar,
    problem: "Eliminate Scheduling Chaos", 
    description: "Playing phone tag with customers, double bookings, no-shows eating into your profits",
    solution: "Smart scheduling system that handles appointments, sends reminders, and optimises your calendar",
    result: "40% reduction in no-shows, perfectly organised schedule"
  },
  {
    icon: MessageCircle,
    problem: "Instant Professional Communication",
    description: "Delayed responses lose customers to faster competitors",
    solution: "AI chat systems provide immediate answers, collect project details, and maintain professional communication",
    result: "Respond in seconds, not hours — even when you're busy"
  },
  {
    icon: Calculator,
    problem: "Automated Quote Generation",
    description: "Spending hours creating estimates, losing jobs to delayed pricing",
    solution: "Intelligent quote calculators provide instant estimates based on project specifics",
    result: "Faster quotes, higher conversion rates, more time for actual work"
  },
  {
    icon: FileText,
    problem: "Streamlined Customer Management",
    description: "Juggling project updates, invoices, and customer communications manually",
    solution: "Automated workflows handle status updates, payment reminders, and follow-ups",
    result: "Happier customers, faster payments, zero administrative stress"
  }
];

export default function PainPointsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">Transform Your Business</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See exactly how AI solves the biggest problems facing contractors and home improvement businesses today.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-12"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {painPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={fadeInUp}
              >
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-dxm-orange to-dxm-gold rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="lg:col-span-11">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Problem */}
                      <div>
                        <h3 className="text-xl font-bold text-navy mb-3">🔧 {point.problem}</h3>
                        <p className="text-gray-600 mb-4">
                          <strong>The Problem:</strong> {point.description}
                        </p>
                      </div>
                      
                      {/* Solution */}
                      <div>
                        <h4 className="text-lg font-semibold text-dxm-orange mb-3">The Solution:</h4>
                        <p className="text-gray-600 mb-4">{point.solution}</p>
                      </div>
                      
                      {/* Result */}
                      <div>
                        <h4 className="text-lg font-semibold text-green-600 mb-3">The Result:</h4>
                        <p className="text-gray-600 font-medium">{point.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          {...fadeInUp}
        >
          <h3 className="text-3xl font-bold text-navy mb-6">Ready to Transform Your Construction Business?</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            See exactly how much time and money you're losing to manual processes — and how AI can fix it.
          </p>
          
          
        </motion.div>
      </div>
    </section>
  );
}