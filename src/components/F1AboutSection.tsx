import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, MapPin, Calendar, Sparkles } from "lucide-react";

export default function F1AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 f1-grid opacity-20" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl blob-morph" />
      
      <motion.div style={{ opacity }} className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 hud-glass hud-corners text-sm font-bold uppercase tracking-widest text-amber-400">
                <Sparkles className="w-4 h-4" />
                About Me
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl font-intro uppercase text-gradient-glow mb-8"
            >
              Transforming Data Into Intelligence
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              I'm a Data Scientist and ML Engineer passionate about building intelligent systems 
              that solve real-world problems. With expertise in NLP, deep learning, and MLOps, 
              I transform complex data into actionable insights and scalable solutions.
            </motion.p>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bento-card hud-corners p-6 mb-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-background neon-glow flex-shrink-0">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1 font-intro">
                    B.S. in Economics
                  </h3>
                  <p className="text-primary font-semibold mb-2">
                    IISER Bhopal • Department Rank: 4th / 60
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      2021 - 2025
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Bhopal, India
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { label: "JEE Main", value: "99.2%ile" },
                { label: "JEE Advanced", value: "AIR 4421" },
                { label: "CAT 2024", value: "99.01%ile" },
              ].map((achievement) => (
                <div 
                  key={achievement.label}
                  className="bento-card hud-corners p-4 text-center hover:border-primary/40 transition-colors"
                >
                  <p className="text-2xl font-bold text-gradient mb-1">
                    {achievement.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {achievement.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Profile Image with blob */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center"
          >
            {/* Morphing blob behind image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-amber-500/30 to-orange-500/20 rounded-full blur-2xl blob-morph" />
            </div>

            {/* Profile image container */}
            <div className="relative">
              {/* HUD frame */}
              <div className="absolute -inset-4 hud-corners-large border-2 border-primary/30" />
              
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary" />

              <Avatar className="w-64 h-64 md:w-80 md:h-80 border-4 border-primary/20 neon-glow">
                <AvatarImage 
                  src="/lovable-uploads/6823fcd0-ca17-4f62-8923-7501bae70db1.png" 
                  alt="Dhriman Deka" 
                  className="object-cover"
                />
                <AvatarFallback className="text-6xl font-intro text-gradient">DD</AvatarFallback>
              </Avatar>

              {/* Status indicator */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 hud-glass hud-corners flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
