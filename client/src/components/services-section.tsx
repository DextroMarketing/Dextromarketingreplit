import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Monitor, Lightbulb, BarChart3, Check } from "lucide-react";
import { fadeInUp, staggerChildren } from "@/lib/animations";

const services = [
  {
    id: "web-design",
    title: "Never Miss Another Lead",
    description: "Phone rings while you're on-site, potential customers hang up, competitors get the job. Our AI-powered lead capture system responds instantly, qualifies prospects, and books consultations automatically.",
    icon: Monitor,
    features: ["24/7 Lead Capture", "Instant Response System", "3x More Leads"],
    gradient: "from-dxm-orange to-dxm-gold"
  },
  {
    id: "smart-scheduling",
    title: "Eliminate Scheduling Chaos", 
    description: "Stop playing phone tag with customers, eliminate double bookings, and reduce no-shows. Smart scheduling system handles appointments, sends reminders, and optimises your calendar.",
    icon: Lightbulb,
    features: ["Smart Scheduling", "Automated Reminders", "40% Fewer No-Shows"],
    gradient: "from-dxm-gold to-dxm-orange"
  },
  {
    id: "ai-automation",
    title: "Instant Professional Communication",
    description: "Delayed responses lose customers to faster competitors. AI chat systems provide immediate answers, collect project details, and maintain professional communication even when you're busy.",
    icon: BarChart3,
    features: ["Instant Response", "Project Qualification", "Professional 24/7 Chat"],
    gradient: "from-dxm-orange to-navy"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-lg">Stop Losing Money to Manual Processes</h2>
          <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-md">
            Every missed call, delayed response, and manual task costs you money. Our AI systems handle the business side automatically, so you can focus on building.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="w-16 h-16 from-dxm-orange to-dxm-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-[#ee9d2b]"
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-800 mb-6 font-medium">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-800 font-medium">
                      <Check className="w-5 h-5 text-dxm-orange mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-navy text-white hover:bg-dxm-orange transition-colors duration-300"
                >
                  Learn More
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
