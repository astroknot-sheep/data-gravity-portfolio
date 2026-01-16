import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function F1AboutSection() {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col items-start"
          >
            <div className="relative mb-6">
              <Avatar className="w-40 h-40 border-2 border-border">
                <AvatarImage 
                  src="/lovable-uploads/6823fcd0-ca17-4f62-8923-7501bae70db1.png" 
                  alt="Dhriman Deka" 
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl font-bold text-primary">DD</AvatarFallback>
              </Avatar>
            </div>
            
            {/* Quick facts - stacked vertically */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>📍 Bengaluru, India</p>
              <p>🎓 IISER Bhopal, Economics</p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Open to opportunities</span>
              </p>
            </div>
          </motion.div>

          {/* Right - Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-medium text-primary mb-4 block tracking-wide">
                About
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
                I like making machines<br />
                <span className="text-primary">understand things.</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed max-w-2xl">
                <p>
                  Started with economics, got hooked on the data side. Now I spend my days 
                  building NLP systems, fine-tuning transformers, and figuring out why models 
                  break in production (spoiler: it's usually the data).
                </p>
                <p>
                  Currently working on search systems and document understanding at Probe42. 
                  Before that, I was researching multilingual hate speech detection — teaching 
                  models to understand context across languages.
                </p>
                <p className="text-foreground font-medium">
                  I care about building things that actually work, not just impressive demos.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}