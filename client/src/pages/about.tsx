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
              About <span className="gradient-text">Nexus</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're pioneers in the fusion of creative design and artificial intelligence, dedicated to transforming how businesses connect with their audiences in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      <AboutSection />
      <Footer />
    </div>
  );
}
