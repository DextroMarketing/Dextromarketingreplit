import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { fadeInUp, staggerChildren } from "@/lib/animations";

const projects = [
  {
    id: "1",
    title: "Premier Roofing Company",
    description: "How we generated 150+ qualified leads in 90 days",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
    categories: ["ai-automation", "lead-generation"],
    technologies: ["AI Lead Capture", "Automated Responses", "Lead Nurturing"],
    challenge: "Seasonal business, intense local competition",
    solution: "AI-powered lead capture, automated responses, smart lead nurturing",
    results: "300% increase in qualified leads, 45% reduction in cost per lead"
  },
  {
    id: "2", 
    title: "BuildRight Home Remodeling",
    description: "From word-of-mouth to digital domination",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    categories: ["web-design", "social-media"],
    technologies: ["Portfolio Website", "Social Media", "Review Management"],
    challenge: "Relied entirely on referrals, inconsistent lead flow",
    solution: "Portfolio website, social media marketing, review management",
    results: "200% increase in project inquiries, expanded service area"
  },
  {
    id: "3",
    title: "Elite Plumbing Services",
    description: "24/7 lead generation for emergency services",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    categories: ["ai-integration", "emergency"],
    technologies: ["AI Chatbot", "Mobile Optimization", "Auto Scheduling"],
    challenge: "Capturing emergency service calls outside business hours",
    solution: "Mobile-optimized site, AI chatbot, automated scheduling",
    results: "80% increase in emergency service calls, improved customer satisfaction"
  },
  {
    id: "4",
    title: "SaaS Platform",
    description: "AI-powered analytics reducing churn rate by 60%",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx4fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    categories: ["ai-integration", "web-design"],
    technologies: ["React", "Machine Learning", "Node.js"]
  },
  {
    id: "5",
    title: "Fashion E-commerce",
    description: "Luxury fashion brand with 250% mobile conversion increase",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    categories: ["e-commerce", "web-design"],
    technologies: ["Gatsby", "Headless CMS", "AR Try-On"]
  },
  {
    id: "6",
    title: "AI Analytics Suite",
    description: "Predictive analytics platform for enterprise decision making",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    categories: ["ai-integration"],
    technologies: ["Python", "TensorFlow", "D3.js"]
  }
];

const filterButtons = [
  { id: "all", label: "All Projects" },
  { id: "web-design", label: "Web Design" },
  { id: "ai-integration", label: "AI Integration" },
  { id: "local-seo", label: "Local SEO" },
  { id: "emergency", label: "Emergency Services" }
];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projects.filter(project => 
    activeFilter === "all" || project.categories.includes(activeFilter)
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">Construction Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real contractors. See how our AI-powered systems have transformed construction and home improvement businesses.
          </p>
        </motion.div>

        {/* Portfolio Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          {filterButtons.map((button) => (
            <Button
              key={button.id}
              onClick={() => setActiveFilter(button.id)}
              variant={activeFilter === button.id ? "default" : "outline"}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === button.id 
                  ? 'bg-navy text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {button.label}
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                variants={fadeInUp}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-200 mb-3 text-sm">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs bg-white/20 text-white">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="text-dxm-orange hover:text-white transition-colors p-0 h-auto"
                    >
                      View Case Study <ExternalLink className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <Button 
            size="lg"
            className="bg-navy text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-dxm-orange transition-all duration-300 hover:scale-105"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
