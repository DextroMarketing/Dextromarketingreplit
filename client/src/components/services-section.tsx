import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Monitor, Lightbulb, BarChart3, Check } from "lucide-react";
import { fadeInUp, staggerChildren } from "@/lib/animations";

const services = [
  {
    id: "web-design",
    title: "Modern Web Design",
    description: "Responsive, user-focused designs that convert visitors into customers. We create stunning websites that work flawlessly across all devices.",
    icon: Monitor,
    features: ["Responsive Design", "Performance Optimization", "SEO Optimization"],
    gradient: "from-dxm-orange to-dxm-gold"
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description: "Intelligent automation and personalization that enhances user experience and drives business growth through smart technology.",
    icon: Lightbulb,
    features: ["AI Chatbots", "Personalization Engine", "Automated Analytics"],
    gradient: "from-dxm-gold to-dxm-orange"
  },
  {
    id: "digital-strategy",
    title: "Digital Strategy",
    description: "Comprehensive digital transformation consulting to help your business thrive in the digital age with data-driven strategies.",
    icon: BarChart3,
    features: ["Growth Strategy", "Conversion Optimization", "Marketing Automation"],
    gradient: "from-dxm-orange to-navy"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We blend cutting-edge design with intelligent automation to create digital experiences that drive results.
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
