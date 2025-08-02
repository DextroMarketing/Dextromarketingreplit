import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight, staggerChildren } from "@/lib/animations";

const teamMembers = [
  {
    id: "1",
    name: "Alex Martinez",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    bio: "Leading design innovation with 8+ years in digital experiences",
    color: "text-electric"
  },
  {
    id: "2",
    name: "Jordan Kim",
    role: "AI Tech Lead",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    bio: "Specializing in machine learning and intelligent automation",
    color: "text-purple"
  },
  {
    id: "3",
    name: "Sam Rivera",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    bio: "Full-stack expert building scalable, high-performance applications",
    color: "text-electric"
  },
  {
    id: "4",
    name: "Taylor Foster",
    role: "Strategy Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    bio: "Digital transformation expert with proven ROI optimization",
    color: "text-purple"
  }
];

const achievements = [
  "500+ Projects Delivered",
  "Award-Winning Design Team",
  "AI & Machine Learning Certified",
  "24/7 Support & Maintenance"
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
              We're a team of passionate designers, developers, and AI specialists who believe that every business deserves a digital presence that not only looks amazing but also drives real results.
            </p>
            <p className="text-gray-600 mb-8">
              Founded in 2020, we've grown from a small startup to a leading agency by focusing on one thing: combining beautiful design with intelligent technology to create websites that truly work for our clients.
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
              alt="Nexus team collaborating" 
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

        {/* Team Section */}
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h3 className="text-3xl font-bold text-navy mb-6">Meet Our Team</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The creative minds and technical experts behind every successful project.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="text-center group"
              variants={fadeInUp}
            >
              <motion.div 
                className="relative mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
              <h4 className="text-xl font-bold text-navy mb-2">{member.name}</h4>
              <p className={`${member.color} font-semibold mb-2`}>{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
