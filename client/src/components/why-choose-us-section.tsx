import { motion } from "framer-motion";
import { Zap, Lightbulb, DollarSign, Users } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight, staggerChildren } from "@/lib/animations";

const features = [
  {
    icon: Zap,
    title: "Emergency Service Optimization",
    description: "Capture after-hours emergency calls 24/7 with smart routing and automated responses that never miss a lead."
  },
  {
    icon: Lightbulb,
    title: "Local SEO Domination",
    description: "Rank #1 for 'contractor near me' searches in your service area and dominate local competition."
  },
  {
    icon: DollarSign,
    title: "Lead Quality Improvement",
    description: "Pre-qualify prospects automatically and focus your time on high-value leads ready to sign contracts."
  },
  {
    icon: Users,
    title: "Construction Industry Expertise",
    description: "We understand seasonal business, trust barriers, and lead generation challenges specific to construction."
  }
];

const stats = [
  { label: "Construction Projects", value: "200+", color: "text-dxm-orange" },
  { label: "Avg. Lead Increase", value: "300%", color: "text-dxm-gold" },
  { label: "Client Retention", value: "95%", color: "text-dxm-orange" },
  { label: "Emergency Calls Captured", value: "24/7", color: "text-dxm-gold" }
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 text-white relative overflow-hidden bg-black/20 backdrop-blur-sm">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">Dextro Marketing</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're the only digital marketing agency that exclusively serves construction businesses. We understand your industry, your challenges, and how to get you results.
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
              const bgColor = index % 2 === 0 ? "bg-dxm-orange" : "bg-dxm-gold";
              
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
