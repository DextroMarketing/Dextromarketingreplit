import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Dribbble } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight, floatAnimation } from "@/lib/animations";



const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@dextromarketing.com",
    description: "We respond within 4 hours",
    color: "bg-dxm-orange"
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri 9AM-6PM PST",
    color: "bg-dxm-gold"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "123 Innovation Street\nSan Francisco, CA 94102",
    description: "By appointment only",
    color: "bg-dxm-orange"
  }
];

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Dribbble, href: "#", label: "Dribbble" }
];

export default function ContactSection() {

  return (
    <section className="py-20 text-white relative overflow-hidden bg-black/20 backdrop-blur-sm">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to Dominate Your Local Market?
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-md">
            Let's discuss how we can help your trade or service business generate more qualified leads and convert more enquiries into signed contracts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            {...fadeInLeft}
          >
            <h3 className="text-3xl font-bold text-white mb-8">Get in Touch</h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                  {...fadeInUp}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${info.color} p-3 rounded-xl shadow-lg`}>
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{info.title}</h4>
                    <p className="text-white font-medium whitespace-pre-line">{info.value}</p>
                    <p className="text-gray-300 text-sm mt-1">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 hover:bg-dxm-orange hover:scale-110 transition-all duration-300"
                    {...floatAnimation}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <social.icon className="h-5 w-5 text-white" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="flex flex-col justify-center items-center text-center space-y-8"
            {...fadeInRight}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-gray-200 w-full">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Book a free 30-minute consultation call to discuss your business goals and discover how we can help you dominate your local market.
              </p>
              
              <Button
                asChild
                className="w-full bg-dxm-orange text-white py-6 rounded-lg font-bold text-xl hover:bg-dxm-gold hover:text-navy transition-all duration-300 hover:scale-105 transform shadow-lg"
              >
                <a href="/book-call">
                  Book Your Free Consultation Call
                </a>
              </Button>
              
              <div className="mt-6 space-y-2">
                <p className="text-gray-600 font-medium">✓ No obligation</p>
                <p className="text-gray-600 font-medium">✓ Custom strategy session</p>
                <p className="text-gray-600 font-medium">✓ Immediate actionable insights</p>
              </div>
            </div>
          </motion.div>
        </div>

          
        </div>
      </div>
    </section>
  );
}
