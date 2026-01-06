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
                I'm a Data Scientist and ML Engineer passionate about building intelligent systems 
                that solve real-world problems. With expertise in NLP, deep learning, and MLOps, 
                I transform complex data into actionable insights and scalable solutions.
              </p>
            </motion.div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6 mb-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { label: "JEE Main", value: "99.2%ile" },
                { label: "JEE Advanced", value: "AIR 4421" },
                { label: "CAT 2024", value: "99.01%ile" },
              ].map((achievement) => (
                <div 
                  key={achievement.label}
                  className="bg-card border border-border rounded-xl p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary mb-1">
                    {achievement.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {achievement.label}
                  </p>
                </div>
              ))}
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
