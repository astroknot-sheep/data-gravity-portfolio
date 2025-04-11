
import { useState } from "react";
import { useInView } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, SendHorizontal } from "lucide-react";

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
      // In a real environment, you would implement your email sending logic here
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mailto link as fallback
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
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background decor */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-data-grid opacity-5" />
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-amber-300/20 dark:bg-amber-700/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-green-300/10 dark:bg-green-700/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <h2 className={`text-4xl font-bold font-intro text-gray-800 dark:text-amber-300 transition-all duration-700 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Contact Me
          </h2>
          <p className={`mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            Interested in working together or have a question about my work?
            Send me a message and I'll get back to you soon.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact info cards */}
          <div className={`col-span-1 transition-all duration-700 delay-300 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-full">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-amber-800 dark:text-amber-300 font-intro">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300 break-all">dhrimandekastudy@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-amber-800 dark:text-amber-300 font-intro">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">Bhopal, India</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M14.2 2.875a4.625 4.625 0 0 0-4.625 4.625v.1A9.98 9.98 0 0 0 4.95 12a9.969 9.969 0 0 0 0 9.95v.05h6.675v-.075a9.965 9.965 0 0 0 5.425-2.75v-7.1a9.984 9.984 0 0 0-1.05-4.5A4.624 4.624 0 0 0 14.2 2.875Z"/>
                        <path d="M23.275 12c0 3.925-2.25 7.35-5.55 9v-2.025a7.982 7.982 0 0 0 3.525-6.975c0-2.7-1.35-5.1-3.4-6.55a6.668 6.668 0 0 1 1.45 4.225v.1A7.988 7.988 0 0 1 19.5 13.5v4.15a9.967 9.967 0 0 0 1.7-5.65c0-5.525-4.475-10-10-10a9.963 9.963 0 0 0-8.65 5h2.85A4.625 4.625 0 0 1 14.2 2.875c2.55 0 4.625 2.075 4.625 4.625v.1a9.986 9.986 0 0 0-2.575-4.725A7.948 7.948 0 0 0 12 2c-5.525 0-10 4.475-10 10a9.974 9.974 0 0 0 2.95 7.1 9.996 9.996 0 0 0 4.15 2.85v-2.025a7.95 7.95 0 0 1-5.075-7.425 8.025 8.025 0 0 1 5.075-7.45 7.959 7.959 0 0 1 8.55 1.725A7.976 7.976 0 0 1 20 12a7.927 7.927 0 0 1-1.525 4.625 3.05 3.05 0 0 0-.55-.85L15.8 13.65c-.55-.55-.85-1.275-.85-2.05s.3-1.5.85-2.05l2.125-2.125c.225-.225.35-.525.35-.85a1.163 1.163 0 0 0-.35-.85 1.163 1.163 0 0 0-.85-.35c-.325 0-.625.125-.85.35l-2.125 2.125c-.55.55-1.275.85-2.05.85s-1.5-.3-2.05-.85L8.85 6.6c-.225-.225-.525-.35-.85-.35-.325 0-.625.125-.85.35-.225.225-.35.525-.35.85 0 .325.125.625.35.85l2.125 2.125c.55.55.85 1.275.85 2.05s-.3 1.5-.85 2.05l-2.125 2.125c-.225.225-.35.525-.35.85 0 .325.125.625.35.85.225.225.525.35.85.35.325 0 .625-.125.85-.35l2.125-2.125c.55-.55 1.275-.85 2.05-.85s1.5.3 2.05.85l2.125 2.125c.225.225.525.35.85.35.325 0 .625-.125.85-.35.225-.225.35-.525.35-.85a1.163 1.163 0 0 0-.35-.85Z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-amber-800 dark:text-amber-300 font-intro">Connect</h3>
                    <a 
                      href="https://x.com/kaiser135971256" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400 transition-colors"
                    >
                      Follow me on X.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className={`col-span-1 md:col-span-2 transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-amber-600 text-white font-medium rounded-full shadow-md hover:bg-amber-500 transition-all duration-300 flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <SendHorizontal className="w-5 h-5 ml-2" />
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
