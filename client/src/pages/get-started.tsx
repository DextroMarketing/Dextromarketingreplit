import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ContactSection from "@/components/contact-section";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { CheckCircle, ArrowRight, Users, Clock, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Dedicated Support Team",
    description: "Work directly with our experienced team of digital marketing specialists focused on trade and service businesses."
  },
  {
    icon: Clock,
    title: "Quick Implementation",
    description: "See results within 30 days with our proven systems and AI automation tools designed for your industry."
  },
  {
    icon: TrendingUp,
    title: "Guaranteed Growth",
    description: "Our data-driven approach ensures measurable improvements in lead generation and conversion rates."
  }
];

const process = [
  {
    step: "01",
    title: "Discovery Call",
    description: "We analyse your current digital presence and identify opportunities for growth in your trade or service business."
  },
  {
    step: "02", 
    title: "Strategy Development",
    description: "Our team creates a customised digital marketing strategy with AI automation tailored to your specific trade."
  },
  {
    step: "03",
    title: "Implementation",
    description: "We implement your new systems, train your team, and ensure everything runs smoothly from day one."
  },
  {
    step: "04",
    title: "Growth & Optimisation",
    description: "Continuous monitoring and optimisation to maximise your ROI and scale your business operations."
  }
];

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy/95 to-navy/90">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider mb-6 text-white">
              Ready to
              <span className="block bg-clip-text bg-gradient-to-r from-dxm-orange to-dxm-gold text-[#ee9d2b]">
                Get Started?
              </span>
              <div className="h-2 bg-gradient-to-r from-dxm-orange to-dxm-gold rounded-full mt-4 mx-auto max-w-md"></div>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-4 mb-8">
              Transform your trade or service business with our proven digital marketing solutions and AI automation systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose Dextro Marketing?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We specialise in helping trade and service businesses dominate their local markets with cutting-edge digital solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
              >
                <div className="bg-dxm-orange/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-dxm-orange" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Contact Form Section */}
      <ContactSection />
      <Footer />
    </div>
  );
}