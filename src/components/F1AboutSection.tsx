import { motion, useScroll, useTransform } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRef } from "react";
import RevealText from "./RevealText";

export default function F1AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-10, 0]);

  return (
    <section ref={sectionRef} id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left - Profile Image with parallax */}
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity, rotate: imageRotate }}
            className="lg:col-span-4 flex flex-col items-start"
          >
            <div className="relative mb-6 group">
              {/* Decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 border border-dashed border-primary/20 rounded-full"
              />
              <Avatar className="w-40 h-40 border-2 border-border relative z-10 transition-transform duration-500 group-hover:scale-105">
                <AvatarImage 
                  src="/lovable-uploads/6823fcd0-ca17-4f62-8923-7501bae70db1.png" 
                  alt="Dhriman Deka" 
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl font-bold text-primary">DD</AvatarFallback>
              </Avatar>
            </div>
            
            {/* Quick facts with stagger */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
              className="space-y-3 text-sm text-muted-foreground"
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                📍 Bengaluru, India
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                🎓 IISER Bhopal, Economics
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Open to opportunities</span>
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right - Content with reveal text */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-medium text-primary mb-4 block tracking-wide"
              >
                About
              </motion.span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
                <RevealText delay={0.1}>I like making machines</RevealText>
                <br />
                <span className="text-primary">
                  <RevealText delay={0.3}>understand things.</RevealText>
                </span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed max-w-2xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Started with economics, got hooked on the data side. Now I spend my days 
                  building NLP systems, fine-tuning transformers, and figuring out why models 
                  break in production (spoiler: it's usually the data).
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  Currently working on search systems and document understanding at Probe42. 
                  Before that, I was researching multilingual hate speech detection — teaching 
                  models to understand context across languages.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-foreground font-medium"
                >
                  I care about building things that actually work, not just impressive demos.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}