import { motion } from "framer-motion";
import { Zap, Lightbulb, DollarSign, Users } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight, staggerChildren } from "@/lib/animations";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description: "Our websites load in under 2 seconds, ensuring your visitors stay engaged and convert at higher rates."
  },
  {
    icon: Lightbulb,
    title: "AI-Powered Intelligence",
    description: "Every website includes smart features like chatbots, personalization, and automated analytics to drive growth."
  },
  {
    icon: DollarSign,
    title: "ROI-Focused Design",
    description: "Every design decision is backed by data and optimized for conversions, ensuring measurable business results."
  },
  {
    icon: Users,
    title: "Dedicated Support Team",
    description: "Get ongoing support, updates, and optimization from our expert team to ensure continued success."
  }
];

const stats = [
  { label: "Projects Completed", value: "500+", color: "text-electric" },
  { label: "Avg. Conversion Increase", value: "340%", color: "text-purple" },
  { label: "Client Satisfaction", value: "98%", color: "text-electric" },
  { label: "Avg. Load Time", value: "1.8s", color: "text-purple" }
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-navy text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-10 right-10 w-64 h-64 bg-electric/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-96 h-96 bg-purple/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">Nexus</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're not just another web design agency. We're your partners in digital transformation, combining creativity with cutting-edge AI technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features */}
          <motion.div 
            className="space-y-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const bgColor = index % 2 === 0 ? "bg-electric" : "bg-purple";
              
              return (
                <motion.div
                  key={feature.title}
                  className="flex items-start space-x-4"
                  variants={fadeInLeft}
                >
                  <motion.div 
                    className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Statistics */}
          <motion.div 
            className="grid grid-cols-2 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 glass-effect rounded-2xl"
                variants={fadeInRight}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className={`text-4xl font-bold ${stat.color} mb-2`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10,
                    delay: index * 0.1 
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
