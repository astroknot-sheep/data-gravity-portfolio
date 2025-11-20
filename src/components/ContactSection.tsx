
import { useState } from "react";
import { useInView } from "@/lib/animations";
import { useMagneticEffect } from "@/lib/magnetic";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, SendHorizontal, Linkedin, Sparkles } from "lucide-react";

export default function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { toast } = useToast();
  const submitBtnRef = useMagneticEffect(0.3);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mailtoLink = `mailto:contact@dhrimandeka.com?subject=Message from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
      window.open(mailtoLink);
      
      toast({
        title: "Message sent",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-40 bg-gradient-to-br from-white via-orange-50/40 to-amber-50/30 dark:from-gray-800 dark:via-gray-700/70 dark:to-gray-600/50 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-data-grid opacity-15" />
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-bl from-amber-300/35 to-orange-300/35 dark:from-amber-700/35 dark:to-orange-700/35 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-orange-300/25 to-amber-300/25 dark:from-orange-700/25 dark:to-amber-700/25 rounded-full blur-3xl animate-float-gentle" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium bg-gradient-to-r from-orange-100/90 to-amber-100/90 dark:from-orange-900/70 dark:to-amber-900/70 text-orange-800 dark:text-orange-200 border-2 border-orange-200/60 dark:border-orange-700/60 font-league shadow-xl">
              <Sparkles className="w-5 h-5 mr-2 animate-pulse-glow" />
              Get In Touch
            </span>
          </motion.div>
          
          <h2 className={`type-h2 font-bold font-intro text-gradient transition-all duration-900 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Contact Me
          </h2>
          <p className={`mt-8 text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-league font-medium transition-all duration-900 delay-100 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Interested in working together or have a question about my work?
            Send me a message and I'll get back to you soon.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Enhanced contact info cards */}
          <div className={`col-span-1 transition-all duration-900 delay-300 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            <div className="enhanced-glassmorphism p-10 h-full enhanced-glow card-tilt">
              <div className="space-y-12">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 flex items-center justify-center flex-shrink-0 shadow-2xl animate-pulse-glow">
                    <Mail className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gradient font-intro">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300 break-all font-league font-medium text-lg">contact@dhrimandeka.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-orange-400 to-amber-500 dark:from-orange-500 dark:to-amber-600 flex items-center justify-center flex-shrink-0 shadow-2xl animate-pulse-glow">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gradient font-intro">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-league font-medium text-lg">Bengaluru, India</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 flex items-center justify-center flex-shrink-0 shadow-2xl animate-pulse-glow">
                    <Linkedin className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gradient font-intro">Connect</h3>
                    <a 
                      href="https://www.linkedin.com/in/dhriman-d-b57b76179/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400 transition-colors font-league font-medium enhanced-link text-lg"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced contact form */}
          <div className={`col-span-1 lg:col-span-2 transition-all duration-900 delay-200 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            <div className="enhanced-glassmorphism p-10 enhanced-glow card-tilt shimmer-overlay overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label htmlFor="name" className="block text-lg font-bold text-gray-700 dark:text-gray-300 font-league">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-5 border-3 border-gray-300 dark:border-gray-700 rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-league backdrop-blur-xl text-lg"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label htmlFor="email" className="block text-lg font-bold text-gray-700 dark:text-gray-300 font-league">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-5 border-3 border-gray-300 dark:border-gray-700 rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-league backdrop-blur-xl text-lg"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label htmlFor="message" className="block text-lg font-bold text-gray-700 dark:text-gray-300 font-league">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={9}
                    className="w-full px-6 py-5 border-3 border-gray-300 dark:border-gray-700 rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-league backdrop-blur-xl resize-none text-lg"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    ref={submitBtnRef as any}
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-5 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-bold rounded-2xl shadow-2xl hover:from-orange-600 hover:via-orange-700 hover:to-amber-600 transition-all duration-500 flex items-center space-x-4 disabled:opacity-70 disabled:cursor-not-allowed font-league enhanced-glow shimmer-overlay overflow-hidden text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <SendHorizontal className="w-6 h-6 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
