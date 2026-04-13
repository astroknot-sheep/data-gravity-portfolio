import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Linkedin, Send, ArrowRight } from "lucide-react";

export default function F1ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const mailtoLink = `mailto:contact@dhrimandeka.com?subject=Message from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
      window.open(mailtoLink);
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "contact@dhrimandeka.com", href: "mailto:contact@dhrimandeka.com" },
    { icon: MapPin, label: "Location", value: "Bengaluru, India", href: null },
    { icon: Linkedin, label: "LinkedIn", value: "Connect with me", href: "https://www.linkedin.com/in/dhrimandeka" },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.05) 0%, transparent 60%)"
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Connect
            </span>
            <motion.div 
              className="h-px bg-border"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-foreground leading-[0.9]"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get In<br />
              <motion.span 
                className="text-primary inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Touch
              </motion.span>
            </motion.h2>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Contact Info Cards with hover effects */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const content = (
                <motion.div 
                  className="bg-card border border-border p-6 relative overflow-hidden group"
                  whileHover={{ 
                    borderColor: "hsl(var(--primary) / 0.5)",
                    x: 4
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700"
                  />
                  
                  <div className="flex items-center gap-4 relative">
                    <motion.div 
                      className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                        {info.label}
                      </p>
                      <p className="font-semibold text-foreground">
                        {info.value}
                      </p>
                    </div>
                    {info.href && (
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );

              return info.href ? (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 30, x: -20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="block"
                >
                  {content}
                </motion.a>
              ) : (
                <motion.div 
                  key={info.label}
                  initial={{ opacity: 0, y: 30, x: -20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  {content}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <motion.div 
              className="bg-card border border-border p-8 relative overflow-hidden"
              whileHover={{ borderColor: "hsl(var(--primary) / 0.3)" }}
            >
              {/* Animated corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="absolute top-4 right-4 w-8 h-px bg-primary/30" />
                <div className="absolute top-4 right-4 w-px h-8 bg-primary/30" />
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6 relative">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                      Name
                    </label>
                    <motion.div
                      animate={{
                        borderColor: focusedField === 'name' ? "hsl(var(--primary))" : "hsl(var(--border))"
                      }}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:border-primary transition-colors text-foreground"
                        placeholder="Your name"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === 'name' ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                      Email
                    </label>
                    <motion.div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:border-primary transition-colors text-foreground"
                        placeholder="your@email.com"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === 'email' ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Message
                  </label>
                  <motion.div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:border-primary transition-colors resize-none text-foreground"
                      placeholder="Tell me about your project..."
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'message' ? "100%" : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                >
                  {/* Button hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-accent"
                    initial={{ x: "-101%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
