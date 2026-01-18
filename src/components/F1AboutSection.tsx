import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function F1AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="about" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left - Image with creative framing */}
          <motion.div
            style={{ y: imageY }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              {/* Frame accents */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-primary/50" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-primary/50" />
              
              {/* Main image container */}
              <div className="relative bg-card p-2">
                <div className="w-full aspect-[3/4] overflow-hidden">
                  <img 
                    src="/lovable-uploads/6823fcd0-ca17-4f62-8923-7501bae70db1.png" 
                    alt="Dhriman Deka" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Section label */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  About
                </span>
                <div className="h-px flex-1 bg-border max-w-24" />
              </div>

              {/* Main heading - editorial style */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-foreground leading-[0.9] mb-8">
                Building <br />
                <span className="text-primary">intelligent</span><br />
                systems
              </h2>

              {/* Bio text */}
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Driven by curiosity to build systems that learn and adapt. 
                  My work spans NLP, deep learning, and MLOps — always pushing to turn raw data into meaningful impact.
                </p>
                <p className="text-base leading-relaxed">
                  Currently focused on large language models, production ML pipelines, and the intersection of 
                  AI with real-world applications.
                </p>
              </div>

              {/* Quick facts - horizontal layout */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                {[
                  { label: "Focus", value: "NLP & LLMs" },
                  { label: "Stack", value: "Python, PyTorch" },
                  { label: "Base", value: "Bengaluru" }
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-primary/30 pl-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
