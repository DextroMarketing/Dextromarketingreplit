import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Monitor, Lightbulb, BarChart3, Check } from "lucide-react";
import { fadeInUp, staggerChildren } from "@/lib/animations";

const services = [
  {
    id: "web-design",
    title: "Construction-Focused Web Design",
    description: "Websites that work as hard as you do. Mobile-first designs built for contractors, featuring project galleries, service area maps, and lead capture systems.",
    icon: Monitor,
    features: ["Mobile-First Design", "Project Galleries", "Lead Capture Forms"],
    gradient: "from-dxm-orange to-dxm-gold"
  },
  {
    id: "local-seo",
    title: "Local SEO Domination",
    description: "Dominate local search when customers need you most. We help contractors rank #1 for 'near me' searches and capture emergency service calls.",
    icon: Lightbulb,
    features: ["Google My Business", "Local Keywords", "Review Management"],
    gradient: "from-dxm-gold to-dxm-orange"
  },
  {
    id: "ai-automation",
    title: "AI Lead Automation",
    description: "Automate quotes, scheduling, and customer communication. Our AI systems pre-qualify leads, book appointments, and follow up automatically.",
    icon: BarChart3,
    features: ["Smart Lead Qualification", "Automated Scheduling", "Follow-up Sequences"],
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
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#ee9d2b]">Services Built for Construction</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From mobile-first websites to local SEO domination, we deliver digital solutions specifically designed to help contractors and home improvement businesses grow.
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
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-navy mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
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
