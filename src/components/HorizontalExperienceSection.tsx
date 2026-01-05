import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Briefcase, GraduationCap, Zap, MapPin, Calendar } from "lucide-react";

const experienceData = [
  {
    type: "work",
    title: "Data Science & ML Engineer",
    company: "Probe42",
    location: "Bangalore, India",
    period: "May 2025 – Present",
    highlights: [
      "Architected generative ML model using 20,000+ PAN records",
      "Designed BERT-based NLP search system boosting accuracy by 45%",
      "Launched models on AWS EC2 via Docker, 10,000+ daily queries, <50ms latency"
    ]
  },
  {
    type: "research",
    title: "Research Intern - LaRGo LLM Research Group",
    company: "Prof. Kripa Bandhu Ghosh",
    location: "Kolkata, India",
    period: "Feb 2024 – Aug 2024",
    highlights: [
      "Fine-tuned multilingual transformer on 1.5M tweets - 92% F1-score",
      "Processing 200+ tweets/second, surpassing baselines by 15%",
      "Constructed data pipelines with PyTorch & Hugging Face, 30% faster training"
    ]
  },
  {
    type: "education",
    title: "B.S. in Economics (Department Rank: 4th / 60)",
    company: "IISER Bhopal",
    location: "Bhopal, India",
    period: "Dec 2021 – Jul 2025",
    highlights: [
      "Coursework: Machine Learning, Data Analysis, Econometrics, Statistics",
      "JEE Main 99.2 percentile; JEE Advanced AIR 4421",
      "CAT 2024 99.01 percentile"
    ]
  }
];

export default function HorizontalExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 500;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'work': return <Briefcase className="w-6 h-6" />;
      case 'research': return <Zap className="w-6 h-6" />;
      case 'education': return <GraduationCap className="w-6 h-6" />;
      default: return <Briefcase className="w-6 h-6" />;
    }
  };

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 f1-grid opacity-20" />
      
      <motion.div style={{ opacity }} className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 hud-glass hud-corners text-sm font-bold uppercase tracking-widest text-amber-400">
              <Zap className="w-4 h-4" />
              Career Journey
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-intro uppercase text-gradient-glow mb-4"
          >
            Experience
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            My professional journey in AI, data science, and research
          </motion.p>
        </div>

        {/* Navigation buttons */}
        <div className="container mx-auto px-6 flex justify-end gap-3 mb-6">
          <motion.button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-lg hud-glass hud-corners flex items-center justify-center transition-all ${
              canScrollLeft ? 'text-foreground hover:neon-glow' : 'text-muted-foreground/30'
            }`}
            whileHover={canScrollLeft ? { scale: 1.1 } : {}}
            whileTap={canScrollLeft ? { scale: 0.9 } : {}}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-lg hud-glass hud-corners flex items-center justify-center transition-all ${
              canScrollRight ? 'text-foreground hover:neon-glow' : 'text-muted-foreground/30'
            }`}
            whileHover={canScrollRight ? { scale: 1.1 } : {}}
            whileTap={canScrollRight ? { scale: 0.9 } : {}}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Horizontal scroll container */}
        <div 
          ref={scrollRef}
          onScroll={checkScrollButtons}
          className="horizontal-scroll pl-6 md:pl-[calc((100vw-1280px)/2+24px)] pr-6 gap-6 pb-8"
        >
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="horizontal-scroll-item w-[450px] md:w-[500px]"
            >
              <div className="h-full bento-card hud-corners-large p-8 group hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
                {/* Scan line effect */}
                <div className="absolute inset-0 scan-line opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon & Type */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-background neon-glow">
                    {getIcon(exp.type)}
                  </div>
                  <div>
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full border border-primary/30">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-gradient transition-all duration-300 font-intro">
                  {exp.title}
                </h3>

                {/* Company */}
                <p className="text-lg text-primary font-semibold mb-4">
                  {exp.company}
                </p>

                {/* Location & Period */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
