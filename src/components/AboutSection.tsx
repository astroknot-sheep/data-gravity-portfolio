import { motion } from "framer-motion";
import { useInView } from "@/lib/animations";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";

export default function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const stats = [
    { label: "Department Rank", value: "4th", sub: "/ 60 students" },
    { label: "JEE Main", value: "99.2", sub: "percentile" },
    { label: "CAT 2024", value: "99.01", sub: "percentile" },
  ];

  const expertise = [
    "Machine Learning & Deep Learning",
    "Natural Language Processing",
    "Time Series Forecasting",
    "Model Deployment & MLOps",
    "Data Pipeline Engineering",
    "Statistical Modeling"
  ];

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Organic shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-200/30 blob-shape -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blob-shape-2 translate-y-1/4 -translate-x-1/4" />

      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">About</p>
          <h2 className="text-foreground">Background</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="border-l-2 border-primary pl-8 mb-12">
              <p className="text-2xl md:text-3xl leading-relaxed text-foreground font-light">
                Redefining data-driven solutions through <span className="text-primary font-medium">machine learning</span> and <span className="text-primary font-medium">innovative engineering</span>.
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I'm a Data Scientist and ML Engineer passionate about building scalable AI solutions. 
              With a strong foundation in economics and statistics, I bring a unique perspective to 
              solving complex problems with data.
            </p>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              {expertise.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                  className="chip hover-lift"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right column - Education & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Education Card */}
            <div className="border border-border p-8 hover:border-primary transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl text-foreground mb-1">Education</h3>
                  <p className="text-muted-foreground">Academic Background</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Bachelor of Science in Economics</h4>
                  <p className="text-muted-foreground">Indian Institute of Science Education and Research, Bhopal</p>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Dec 2021 – Jul 2025
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Bhopal, India
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Coursework:</strong> Machine Learning, Data Analysis, Econometrics, Statistics, Python Programming
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="border border-border p-6 text-center hover:border-primary transition-colors"
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{stat.sub}</p>
                  <p className="text-xs uppercase tracking-wider text-foreground mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
