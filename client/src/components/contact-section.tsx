import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Dribbble } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { fadeInUp, fadeInLeft, fadeInRight, floatAnimation } from "@/lib/animations";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

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
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data: ContactFormData) => 
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitMutation.mutate(data);
  };

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
          {/* Contact Form */}
          <motion.div
            id="contact-form"
            className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-200"
            style={{ scrollMarginTop: '100px' }}
            {...fadeInLeft}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free Consultation</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium">Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium">Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium">Company</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your company name"
                            className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium">Project Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="website-design">Website Design</SelectItem>
                            <SelectItem value="appointment-setting">AI Appointment Setting Agent</SelectItem>
                            <SelectItem value="customer-support">AI Customer Support Ticket Management</SelectItem>
                            <SelectItem value="lead-capture">AI Lead Capture & CRM Integration</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">Budget Range</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2k-5k">$2,000 - $5,000/month</SelectItem>
                          <SelectItem value="5k-10k">$5,000 - $10,000/month</SelectItem>
                          <SelectItem value="10k-20k">$10,000 - $20,000/month</SelectItem>
                          <SelectItem value="20k+">$20,000+/month</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">Project Details</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Tell us about your trade or service business, service area, and biggest operational challenges..."
                          className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full bg-dxm-orange text-white py-4 rounded-lg font-bold text-lg hover:bg-dxm-gold hover:text-navy transition-all duration-300 hover:scale-105 transform"
                >
                  {submitMutation.isPending ? "Sending..." : "Get My Free Consultation"}
                </Button>

                <p className="text-gray-600 text-sm text-center">
                  We'll respond within 24 hours with a custom proposal
                </p>
              </form>
            </Form>
          </motion.div>

          
        </div>
      </div>
    </section>
  );
}
