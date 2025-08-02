import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AboutSection from "@/components/about-section";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-navy to-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            {...fadeInUp}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About <span className="gradient-text">Dextro Marketing</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're the only digital marketing agency exclusively focused on construction and home improvement businesses, helping contractors dominate local search and convert more leads into contracts.
            </p>
          </motion.div>
        </div>
      </section>

      <AboutSection />
      <Footer />
    </div>
  );
}
