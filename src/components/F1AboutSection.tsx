import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

export default function F1AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-sm font-bold uppercase tracking-widest text-primary mb-4 block">
                About Me
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold uppercase text-foreground mb-8">
                Transforming Data Into Intelligence
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                I'm a Data Scientist and ML Engineer with a curiosity for building intelligent systems. 
                I enjoy working with NLP, deep learning, and MLOps — always learning and exploring 
                new ways to turn data into meaningful solutions.
              </p>
            </motion.div>
          </div>

          {/* Right - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative">
              <Avatar className="w-64 h-64 md:w-80 md:h-80 border-4 border-border">
                <AvatarImage 
                  src="/lovable-uploads/6823fcd0-ca17-4f62-8923-7501bae70db1.png" 
                  alt="Dhriman Deka" 
                  className="object-cover"
                />
                <AvatarFallback className="text-6xl font-bold text-primary">DD</AvatarFallback>
              </Avatar>

              {/* Status indicator */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-card border border-border rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
