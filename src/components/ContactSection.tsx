
import { useState } from "react";
import { useInView } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, SendHorizontal, Linkedin } from "lucide-react";

export default function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { toast } = useToast();
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
      
      const mailtoLink = `mailto:dhrimandekastudy@gmail.com?subject=Message from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
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
      className="py-32 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 dark:from-gray-800 dark:via-gray-700/60 dark:to-gray-600/40 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-data-grid opacity-10" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-bl from-amber-300/30 to-orange-300/30 dark:from-amber-700/30 dark:to-orange-700/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-gradient-to-tr from-orange-300/20 to-amber-300/20 dark:from-orange-700/20 dark:to-amber-700/20 rounded-full blur-3xl animate-float-gentle" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20" ref={ref}>
          <h2 className={`type-h2 font-bold font-intro text-gradient transition-all duration-700 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Contact Me
          </h2>
          <p className={`mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-league font-medium transition-all duration-700 delay-100 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Interested in working together or have a question about my work?
            Send me a message and I'll get back to you soon.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Enhanced contact info cards */}
          <div className={`col-span-1 transition-all duration-700 delay-300 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            <div className="enhanced-glassmorphism p-8 h-full enhanced-glow">
              <div className="space-y-10">
                <div className="flex items-start space-x-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 flex items-center justify-center flex-shrink-0 shadow-xl">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gradient font-intro">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300 break-all font-league font-medium">dhrimandekastudy@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-500 dark:from-orange-500 dark:to-amber-600 flex items-center justify-center flex-shrink-0 shadow-xl">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gradient font-intro">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-league font-medium">Bengaluru, India</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 flex items-center justify-center flex-shrink-0 shadow-xl">
                    <Linkedin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gradient font-intro">Connect</h3>
                    <a 
                      href="https://www.linkedin.com/in/dhriman-d-b57b76179/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400 transition-colors font-league font-medium enhanced-link"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced contact form */}
          <div className={`col-span-1 lg:col-span-2 transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            <div className="enhanced-glassmorphism p-8 enhanced-glow">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="block text-base font-bold text-gray-700 dark:text-gray-300 font-league">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-league backdrop-blur-lg"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label htmlFor="email" className="block text-base font-bold text-gray-700 dark:text-gray-300 font-league">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-league backdrop-blur-lg"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="message" className="block text-base font-bold text-gray-700 dark:text-gray-300 font-league">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-league backdrop-blur-lg resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-bold rounded-2xl shadow-2xl hover:from-orange-600 hover:via-orange-700 hover:to-amber-600 transition-all duration-500 flex items-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed font-league enhanced-glow hover:scale-105"
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
