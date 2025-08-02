import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PortfolioSection from "@/components/portfolio-section";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function Portfolio() {
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
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our collection of award-winning projects that showcase the perfect blend of innovative design and cutting-edge AI technology.
            </p>
          </motion.div>
        </div>
      </section>

      <PortfolioSection />
      <Footer />
    </div>
  );
}
