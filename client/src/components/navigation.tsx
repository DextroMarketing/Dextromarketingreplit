import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import dxmLogo from "@assets/DXM Logo_1754139841655.jpg";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
  ];

  const NavLink = ({ href, label, mobile = false }: { href: string; label: string; mobile?: boolean }) => (
    <Link href={href}>
      <span 
        className={`${
          mobile ? 'block py-2 px-4' : ''
        } text-gray-700 hover:text-dxm-orange transition-colors duration-200 font-medium cursor-pointer ${
          location === href ? 'text-dxm-orange' : ''
        }`}
        onClick={() => mobile && setIsOpen(false)}
      >
        {label}
      </span>
    </Link>
  );

  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <span className="flex items-center space-x-3 cursor-pointer">
              <img 
                src={dxmLogo} 
                alt="DXM Logo" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-2xl font-bold text-navy">Dextro Marketing</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
            <Link href="/contact">
              <Button className="bg-navy text-white hover:bg-dxm-orange transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} mobile />
                ))}
                <Link href="/contact">
                  <Button className="w-full bg-navy text-white hover:bg-dxm-orange transition-all duration-300" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
