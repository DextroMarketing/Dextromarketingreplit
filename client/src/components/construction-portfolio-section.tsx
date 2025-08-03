import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle } from "lucide-react";
import { fadeInUp, staggerChildren } from "@/lib/animations";

const projects = [
  {
    id: "1",
    title: "Premier Roofing Company",
    description: "How we generated 150+ qualified leads in 90 days",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    categories: ["ai-automation", "lead-generation"],
    technologies: ["AI Lead Capture", "Automated Responses", "Lead Nurturing"],
    challenge: "Seasonal business, intense local competition",
    solution: "AI-powered lead capture, automated responses, smart lead nurturing",
    results: "300% increase in qualified leads, 45% reduction in cost per lead"
  },
  {
    id: "2", 
    title: "BuildRight Home Remodelling",
    description: "From word-of-mouth to digital domination",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    categories: ["web-design", "social-media"],
    technologies: ["Portfolio Website", "Social Media", "Review Management"],
    challenge: "Relied entirely on referrals, inconsistent lead flow",
    solution: "Portfolio website, social media marketing, review management",
    results: "200% increase in project enquiries, expanded service area"
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
    title: "Thompson Construction",
    description: "Streamlining operations with AI automation",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    categories: ["ai-integration", "multi-trade"],
    technologies: ["CRM Integration", "Automated Workflows", "Smart Routing"],
    challenge: "Managing multiple service lines, complex scheduling",
    solution: "Integrated CRM, automated workflows, smart lead routing",
    results: "50% reduction in administrative time, 25% increase in project capacity"
  },
  {
    id: "5",
    title: "Rodriguez Plastering & Textures",
    description: "From artisan craft to digital success",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    categories: ["specialty-trade", "ai-showcase"],
    technologies: ["AI Portfolio Generator", "Smart Galleries", "Automated Marketing"],
    challenge: "Specialised service with limited local awareness, difficulty showcasing craftsmanship",
    solution: "AI-generated portfolio content, smart before/after galleries, automated marketing campaigns",
    results: "180% increase in residential enquiries, expanded into commercial projects"
  },
  {
    id: "6",
    title: "HomePro Multi-Services",
    description: "Franchise-level systems for independent contractor",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    categories: ["multi-location", "ai-integration"],
    technologies: ["AI Territory Management", "Smart Lead Routing", "Unified Automation"],
    challenge: "Competing with franchises, managing multiple service areas",
    solution: "AI territory management, intelligent lead routing, unified automation systems",
    results: "Expanded to 3 new markets, 400% increase in qualified leads"
  }
];

const filterButtons = [
  { id: "all", label: "All Projects" },
  { id: "web-design", label: "Web Design" },
  { id: "ai-integration", label: "AI Integration" },
  { id: "ai-automation", label: "AI Automation" },
  { id: "emergency", label: "Emergency Services" },
  { id: "specialty-trade", label: "Specialty Trades" }
];

export default function ConstructionPortfolioSection() {
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

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          {filterButtons.map((button) => (
            <Button
              key={button.id}
              variant={activeFilter === button.id ? "default" : "outline"}
              onClick={() => setActiveFilter(button.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === button.id 
                  ? 'bg-dxm-orange text-white border-dxm-orange hover:bg-dxm-gold' 
                  : 'text-gray-700 border-gray-300 hover:border-dxm-orange hover:text-dxm-orange'
              }`}
            >
              {button.label}
            </Button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
                variants={fadeInUp}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.categories.map((category) => (
                      <Badge 
                        key={category} 
                        variant="secondary"
                        className="text-xs px-2 py-1 bg-dxm-orange/10 text-dxm-orange border-dxm-orange/20"
                      >
                        {category.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-dxm-orange transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  {project.results && (
                    <div className="border-t pt-4">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700 font-medium">
                          {project.results}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Overlay with Details */}
                <div className="absolute inset-0 bg-navy/95 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-white">
                  <h4 className="text-lg font-bold mb-4">{project.title}</h4>
                  
                  {project.challenge && (
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-dxm-orange mb-1">Challenge:</p>
                      <p className="text-sm">{project.challenge}</p>
                    </div>
                  )}
                  
                  {project.solution && (
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-dxm-gold mb-1">Solution:</p>
                      <p className="text-sm">{project.solution}</p>
                    </div>
                  )}
                  
                  {project.results && (
                    <div>
                      <p className="text-sm font-semibold text-green-400 mb-1">Results:</p>
                      <p className="text-sm">{project.results}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-navy mb-4">Ready to Join These Success Stories?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            See how our construction-focused digital marketing can transform your business like it did for these contractors.
          </p>
          <Button 
            size="lg"
            className="bg-dxm-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-dxm-gold hover:text-navy transition-all duration-300 hover:scale-105"
          >
            Get Your Free Assessment
          </Button>
        </motion.div>
      </div>
    </section>
  );
}