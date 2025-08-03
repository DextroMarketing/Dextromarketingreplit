import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeInUp, staggerChildren } from "@/lib/animations";

const testimonials = [
  {
    id: "1",
    name: "Michael Chen",
    title: "Owner, Chen Home Improvements",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    quote: "Dextro Marketing transformed our entire digital presence. The AI chatbot alone increased our qualified leads by 200%, and the website design is absolutely stunning. Best investment we've made.",
    rating: 5
  },
  {
    id: "2",
    name: "Sarah Rodriguez",
    title: "Owner, Rodriguez Roofing",
    image: "https://pixabay.com/get/gb9017780bc9f8c589cb016588a8261347c3ff75e7bb0969727c5ac3d3e0a5a0bef75d5aab0441749515d95ebf0068d9a5369ddcb5612667b4aaba1732ef4b7d1_1280.jpg",
    quote: "Dextro Marketing's AI automation systems transformed our business operations. Our emergency calls tripled, scheduling is automated, and we're booked out 6 weeks. Incredible results!",
    rating: 5
  },
  {
    id: "3",
    name: "James Thompson",
    title: "Founder, Thompson Construction",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    quote: "Professional, innovative, and results-driven. Dextro Marketing didn't just build us a website, they built us a digital growth engine. Our contractor lead generation has never been better.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what construction industry leaders say about working with Dextro Marketing.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center">
                <motion.img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
                <div>
                  <div className="font-semibold text-navy">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
