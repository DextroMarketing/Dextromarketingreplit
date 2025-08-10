import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ContactSection from "@/components/contact-section";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { CheckCircle, ArrowRight } from "lucide-react";

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

      

      

      {/* Contact Form Section */}
      <ContactSection />
      <Footer />
    </div>
  );
}