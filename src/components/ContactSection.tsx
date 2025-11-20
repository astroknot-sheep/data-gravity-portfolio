import { useState } from "react";
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, SendHorizontal, Linkedin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mailtoLink = `mailto:contact@dhrimandeka.com?subject=Message from ${formData.name}&body=${formData.message}`;
    window.open(mailtoLink);
    
    toast({ title: "Message sent", description: "Thank you! I'll get back to you soon." });
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-32 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 geometric-grid opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="type-h2 font-black uppercase mb-6"
          >
            Contact Me
          </motion.h2>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="neobrutalist-card p-8 h-full">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary border-5 border-black dark:border-white rounded-sm flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase mb-2">Email</h3>
                    <p className="break-all font-bold">contact@dhrimandeka.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-secondary border-5 border-black dark:border-white rounded-sm flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase mb-2">Location</h3>
                    <p className="font-bold">Bengaluru, India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-accent border-5 border-black dark:border-white rounded-sm flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase mb-2">Connect</h3>
                    <a 
                      href="https://www.linkedin.com/in/dhriman-d-b57b76179/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold hover:text-primary quick-transition"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 lg:col-span-2">
            <div className="neobrutalist-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-lg font-black uppercase mb-2">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="neobrutalist-input w-full px-4 py-3 font-semibold" placeholder="Your name" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-lg font-black uppercase mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="neobrutalist-input w-full px-4 py-3 font-semibold" placeholder="Your email" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-lg font-black uppercase mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="neobrutalist-input w-full px-4 py-3 font-semibold resize-none" placeholder="Your message"></textarea>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting} variant="brutal" size="lg">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <SendHorizontal className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
