import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { fadeInUp } from "@/lib/animations";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-navy via-navy/95 to-navy/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Business with <span className="gradient-text">AI Automation</span>?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">
            Join 200+ trades and service businesses who've already automated their operations. 
            Book your free strategy call and discover how AI can revolutionise your workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/book-call">
              <Button 
                size="lg"
                className="bg-dxm-orange text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-dxm-gold hover:text-navy transition-all duration-300 hover:scale-105 transform"
              >
                Book Your Free Strategy Call
              </Button>
            </Link>
            
            <div className="text-white/80 text-sm">
              <p>✓ 30-minute consultation</p>
              <p>✓ Custom AI roadmap</p>
              <p>✓ No-obligation quote</p>
            </div>
          </div>

          <p className="text-white/70 text-sm mt-8">
            We'll contact you within 24 hours to schedule your consultation
          </p>
        </motion.div>
      </div>
    </section>
  );
}