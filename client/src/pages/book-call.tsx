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
import { Calendar, Clock, Phone, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { fadeInUp, fadeInLeft } from "@/lib/animations";
import { Link } from "wouter";

const bookCallSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  selectedService: z.string().min(1, "Please select a service"),
  problems: z.string().min(10, "Please describe your problems (at least 10 characters)"),
  additionalInfo: z.string().optional(),
});

type BookCallFormData = z.infer<typeof bookCallSchema>;

const services = [
  { value: "website-design", label: "Website Design" },
  { value: "ai-customer-support", label: "AI Customer Support Agent" },
  { value: "ai-appointment-scheduling", label: "AI Appointment Scheduling Agent" },
  { value: "ai-lead-capture-crm", label: "AI Lead Capture & CRM Integration" },
];

export default function BookCall() {
  const { toast } = useToast();

  const form = useForm<BookCallFormData>({
    resolver: zodResolver(bookCallSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      selectedService: "",
      problems: "",
      additionalInfo: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data: BookCallFormData) => 
      apiRequest("POST", "/api/book-call", data),
    onSuccess: () => {
      toast({
        title: "Call Booked Successfully!",
        description: "We'll contact you within 24 hours to schedule your consultation.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookCallFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy/95 to-navy/90">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          className="pt-20 pb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white hover:text-dxm-orange transition-colors mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <div className="text-center">
              <motion.h1 
                className="text-4xl lg:text-5xl font-bold mb-6 text-white"
                {...fadeInUp}
              >
                Book Your <span className="gradient-text">AI Strategy Call</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
                {...fadeInUp}
              >
                Ready to transform your business with AI automation? Let's discuss your specific needs and create a custom solution.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Benefits */}
            <motion.div 
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-effect p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">What You'll Get</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-dxm-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">30-Minute Strategy Session</p>
                      <p className="text-white/80 text-sm">Personalised consultation about your business needs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-dxm-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Custom AI Roadmap</p>
                      <p className="text-white/80 text-sm">Tailored automation strategy for your industry</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-dxm-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">No-Obligation Quote</p>
                      <p className="text-white/80 text-sm">Transparent pricing with no hidden costs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-effect p-6 rounded-2xl">
                <h4 className="text-lg font-bold text-white mb-3">Response Time</h4>
                <p className="text-white/90">We'll contact you within <span className="text-dxm-orange font-semibold">24 hours</span> to schedule your call at a time that works for you.</p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="glass-effect p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Tell Us About Your Business</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                className="bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange"
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
                            <FormLabel className="text-white font-medium">Email *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@company.com"
                                className="bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Company Name */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Company Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your company or business name"
                              className="bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Selected Service */}
                    <FormField
                      control={form.control}
                      name="selectedService"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Selected Service *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/90 border-gray-300 text-gray-900 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange">
                                <SelectValue placeholder="Choose the service you're interested in" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service.value} value={service.value}>
                                  {service.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Problems */}
                    <FormField
                      control={form.control}
                      name="problems"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">What Problems Are You Looking to Solve? *</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Describe your current challenges: missed appointments, slow customer response times, manual lead tracking, etc."
                              className="bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Additional Information */}
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Additional Information</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="Any additional details about your business, team size, current tools, or specific requirements..."
                              className="bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-dxm-orange focus:ring-1 focus:ring-dxm-orange resize-none"
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
                      {submitMutation.isPending ? "Booking Your Call..." : "Book My Strategy Call"}
                    </Button>

                    <p className="text-white/80 text-sm text-center">
                      We'll contact you within 24 hours to schedule your consultation at a time that works for you.
                    </p>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}