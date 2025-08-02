import { Link } from "wouter";
import { Linkedin, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";
import dxmLogo from "@assets/DXM Logo_1754139841655.jpg";

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "Web Design", href: "/services" },
      { label: "AI Integration", href: "/services" },
      { label: "Digital Strategy", href: "/services" },
      { label: "E-commerce Solutions", href: "/services" },
      { label: "Mobile Apps", href: "/services" },
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "/contact" },
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/portfolio" },
      { label: "White Papers", href: "#" },
      { label: "AI Tools", href: "#" },
      { label: "Design Resources", href: "#" },
      { label: "Support", href: "/contact" },
    ]
  }
];

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" }
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/">
              <span className="flex items-center space-x-3 mb-6 cursor-pointer">
                <img 
                  src={dxmLogo} 
                  alt="Dextro Marketing Logo" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-2xl font-bold">Dextro Marketing</span>
              </span>
            </Link>
            <p className="text-gray-300 mb-6">
              The digital marketing agency that speaks construction. We help contractors and home improvement businesses dominate their local markets.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-dxm-orange transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 Dextro Marketing. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Terms of Service
              </span>
              <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
