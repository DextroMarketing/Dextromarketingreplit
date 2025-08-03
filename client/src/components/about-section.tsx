import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight, staggerChildren } from "@/lib/animations";

const teamMembers = [
  {
    id: "1",
    name: "Alex Martinez",
    role: "Construction Marketing Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    bio: "8+ years specializing in contractor lead generation and conversion optimization",
    color: "text-dxm-orange"
  },
  {
    id: "2",
    name: "Jordan Kim",
    role: "Local SEO Specialist",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    bio: "Expert in construction local search domination and Google My Business optimization",
    color: "text-dxm-gold"
  },
  {
    id: "3",
    name: "Sam Rivera",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    bio: "Builds high-performance websites optimized for construction business workflows",
    color: "text-dxm-orange"
  },
  {
    id: "4",
    name: "Taylor Foster",
    role: "Construction Business Strategist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    bio: "Former contractor turned digital strategist, understands the industry inside-out",
    color: "text-dxm-gold"
  }
];

const achievements = [
  "200+ Construction Businesses Served",
  "300% Average Lead Increase",
  "Construction Industry Specialists",
  "24/7 Emergency Service Support"
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* About Content */}
          <motion.div
            {...fadeInLeft}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">About Dextro Marketing</h2>
            <p className="text-xl text-gray-600 mb-6">
              We're a specialized team of digital marketing experts who exclusively serve construction and home improvement businesses. We understand the unique challenges contractors face in generating quality leads and building trust online.
            </p>
            <p className="text-gray-600 mb-8">
              Founded in 2020 with a focus on the construction industry, we've helped over 200 contractors dominate their local markets by combining proven marketing strategies with cutting-edge technology designed specifically for construction businesses.
            </p>
            
            <motion.div 
              className="space-y-4"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  className="flex items-center"
                  variants={fadeInUp}
                >
                  <Check className="w-6 h-6 text-electric mr-3" />
                  <span className="text-gray-700">{achievement}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* About Image */}
          <motion.div 
            className="relative"
            {...fadeInRight}
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Dextro Marketing team collaborating" 
              className="rounded-2xl shadow-2xl w-full"
            />
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-electric text-white p-6 rounded-2xl"
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.3 }}
            >
              <div className="text-2xl font-bold">4+ Years</div>
              <div className="text-sm">Of Innovation</div>
            </motion.div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
