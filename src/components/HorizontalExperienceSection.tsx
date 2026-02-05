import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Briefcase, GraduationCap, Zap, MapPin, Calendar } from "lucide-react";

const experienceData = [
  {
    type: "work",
    title: "Data Science & ML Engineer",
    company: "Probe42",
    location: "Bangalore, India",
    period: "Present",
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
    title: "B.S. in Economics",
    company: "IISER Bhopal",
    location: "Bhopal, India",
    period: "Completed",
    highlights: [
      "Focus on Machine Learning & Data Science",
      "Coursework: ML, Deep Learning, Data Analysis, Econometrics, Statistics",
      "Research focus on AI/ML applications in economic modeling"
    ]
  }
];

interface ExperienceCardProps {
  exp: typeof experienceData[0];
  index: number;
}

function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'work': return <Briefcase className="w-5 h-5" />;
      case 'research': return <Zap className="w-5 h-5" />;
      case 'education': return <GraduationCap className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="flex-shrink-0 w-[360px] md:w-[420px] snap-start"
    >
      <motion.div 
        className="group h-full bg-card border border-border relative overflow-hidden"
        animate={{
          borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border))"
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Top accent bar with animation */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          animate={{ 
            translateX: isHovered ? "200%" : "-100%" 
          }}
          transition={{ duration: 0.6 }}
        />
        
        <div className="p-8 relative">
          {/* Header */}
          <motion.div 
            className="flex items-center justify-between mb-6"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary"
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : "hsl(var(--primary) / 0.2)"
                }}
                transition={{ duration: 0.2 }}
              >
                {getIcon(exp.type)}
              </motion.div>
              <motion.span 
                className="text-[10px] font-bold uppercase tracking-widest text-primary"
                animate={{ opacity: isHovered ? 1 : 0.8 }}
              >
                {exp.type}
              </motion.span>
            </div>
            
            {/* Index number */}
            <motion.span
              className="text-4xl font-bold text-border/30"
              animate={{ 
                color: isHovered ? "hsl(var(--primary) / 0.2)" : "hsl(var(--border) / 0.3)"
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="text-xl font-bold text-foreground mb-2 leading-tight"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            {exp.title}
          </motion.h3>

          {/* Company */}
          <motion.p 
            className="text-lg text-primary font-semibold mb-4"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {exp.company}
          </motion.p>

          {/* Meta */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-6 text-xs text-muted-foreground"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>{exp.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>{exp.period}</span>
            </div>
          </motion.div>

          {/* Highlights with staggered animation */}
          <ul className="space-y-3">
            {exp.highlights.map((highlight, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-3 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <motion.span 
                  className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"
                  animate={{ 
                    scale: isHovered ? [1, 1.5, 1] : 1
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: i * 0.1,
                    repeat: isHovered ? Infinity : 0,
                    repeatDelay: 2
                  }}
                />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HorizontalExperienceSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      const cardWidth = 450;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(index, experienceData.length - 1));
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScrollButtons, { passive: true });
      return () => scrollEl.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -450 : 450,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Animated background accent */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: "linear-gradient(to left, hsl(var(--primary) / 0.05) 0%, transparent 100%)"
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />
      
      <div className="container mx-auto px-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <motion.div 
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Journey
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
                Experience
              </motion.h2>
            </div>
          </div>

          {/* Navigation */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.span 
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground hidden sm:block"
              key={currentIndex}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {String(currentIndex + 1).padStart(2, '0')} / {String(experienceData.length).padStart(2, '0')}
            </motion.span>
            <div className="flex gap-2">
              <motion.button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-12 h-12 border flex items-center justify-center transition-all ${
                  canScrollLeft 
                    ? 'border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground' 
                    : 'border-border/30 text-muted-foreground/30 cursor-not-allowed'
                }`}
                whileHover={canScrollLeft ? { scale: 1.05 } : {}}
                whileTap={canScrollLeft ? { scale: 0.95 } : {}}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-12 h-12 border flex items-center justify-center transition-all ${
                  canScrollRight 
                    ? 'border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground' 
                    : 'border-border/30 text-muted-foreground/30 cursor-not-allowed'
                }`}
                whileHover={canScrollRight ? { scale: 1.05 } : {}}
                whileTap={canScrollRight ? { scale: 0.95 } : {}}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Cards with perspective */}
      <div style={{ perspective: "1000px" }}>
        <motion.div 
          ref={scrollRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex overflow-x-auto gap-6 px-6 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {experienceData.map((exp, index) => (
            <ExperienceCard key={exp.title} exp={exp} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Progress dots */}
      <motion.div 
        className="flex justify-center gap-2 mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {experienceData.map((_, index) => (
          <motion.div
            key={index}
            className="h-1 rounded-full transition-all duration-300"
            animate={{
              width: currentIndex === index ? 24 : 8,
              backgroundColor: currentIndex === index ? "hsl(var(--primary))" : "hsl(var(--border))"
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
