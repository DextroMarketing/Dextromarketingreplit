import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Lightbulb, BarChart3, Check, ArrowRight } from "lucide-react";
import { fadeInUp, staggerChildren } from "@/lib/animations";

const services = [
  {
    id: "web-design",
    title: "Modern Web Design",
    description: "Stunning, responsive websites that convert visitors into customers",
    icon: Monitor,
    features: [
      "Responsive Design",
      "Performance Optimization",
      "SEO Optimization",
      "User Experience Design",
      "Cross-browser Compatibility",
      "Mobile-first Approach"
    ],
    process: [
      "Discovery & Research",
      "Wireframing & Prototyping",
      "Visual Design",
      "Development & Testing",
      "Launch & Optimization"
    ],
    benefits: [
      "Increased user engagement",
      "Higher conversion rates",
      "Better search rankings",
      "Professional brand image"
    ]
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description: "Intelligent automation that enhances user experience and drives growth",
    icon: Lightbulb,
    features: [
      "AI Chatbots",
      "Personalization Engine",
      "Automated Analytics",
      "Machine Learning Models",
      "Natural Language Processing",
      "Predictive Analytics"
    ],
    process: [
      "AI Strategy Planning",
      "Data Analysis & Preparation",
      "Model Development",
      "Integration & Testing",
      "Monitoring & Optimization"
    ],
    benefits: [
      "24/7 customer support",
      "Personalized user experiences",
      "Automated business processes",
      "Data-driven insights"
    ]
  },
  {
    id: "digital-strategy",
    title: "Digital Strategy",
    description: "Comprehensive digital transformation consulting for business growth",
    icon: BarChart3,
    features: [
      "Growth Strategy",
      "Conversion Optimization",
      "Marketing Automation",
      "Analytics & Reporting",
      "Competitive Analysis",
      "ROI Optimization"
    ],
    process: [
      "Business Analysis",
      "Strategy Development",
      "Implementation Planning",
      "Execution & Monitoring",
      "Performance Optimization"
    ],
    benefits: [
      "Increased online visibility",
      "Higher conversion rates",
      "Better customer retention",
      "Measurable ROI growth"
    ]
  }
];

export default function Services() {
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
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Comprehensive digital solutions combining cutting-edge design with intelligent AI technology to transform your business.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Services Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="space-y-20"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}
                  variants={fadeInUp}
                >
                  {/* Service Content */}
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-electric to-purple rounded-2xl flex items-center justify-center mr-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-5xl font-black uppercase tracking-tight leading-tight text-[#ee9d2b]">{service.title}</h2>
                    </div>
                    
                    <p className="text-xl text-black font-medium mb-8">{service.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-3xl font-black mb-6 uppercase tracking-wide border-b-4 border-electric pb-2 text-[#ee9d2b]">Key Features</h3>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center text-black font-medium">
                              <Check className="w-5 h-5 text-electric mr-3" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-3xl font-black text-navy mb-6 uppercase tracking-wide border-b-4 border-purple pb-2">Benefits</h3>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center text-black font-medium">
                              <ArrowRight className="w-5 h-5 text-purple mr-3" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Button size="lg" className="bg-navy text-white hover:bg-electric">
                      Get Started with {service.title}
                    </Button>
                  </div>
                  {/* Process Card */}
                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <Card className="shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-4xl font-black text-navy uppercase tracking-wide border-b-4 border-dxm-orange pb-3 mb-4">Our Process</CardTitle>
                        <CardDescription className="text-black font-medium">How we deliver {service.title.toLowerCase()}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {service.process.map((step, stepIndex) => (
                            <motion.div
                              key={step}
                              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: stepIndex * 0.1 }}
                            >
                              <div className="w-8 h-8 bg-electric text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                                {stepIndex + 1}
                              </div>
                              <span className="font-bold text-black">{step}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-6xl font-black text-navy mb-8 uppercase tracking-wide">Ready to Get Started?</h2>
            <p className="text-xl text-black font-bold mb-8">
              Let's discuss how our services can transform your digital presence and drive real business results.
            </p>
            <Button size="lg" className="bg-electric text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg">
              Schedule Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
