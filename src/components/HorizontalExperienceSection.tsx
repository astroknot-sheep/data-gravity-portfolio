import { useRef, useState } from "react";
import { motion } from "framer-motion";
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
    title: "B.S. in Economics",
    company: "IISER Bhopal",
    location: "Bhopal, India",
    period: "Dec 2021 – Jul 2025",
    highlights: [
      "Specialization in Machine Learning & Data Science",
      "Coursework: ML, Deep Learning, Data Analysis, Econometrics, Statistics",
      "Research focus on AI/ML applications in economic modeling"
    ]
  }
];

export default function HorizontalExperienceSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -450 : 450,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
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
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Journey
              </span>
              <div className="h-px flex-1 bg-border max-w-24" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-foreground leading-[0.9]">
              Experience
            </h2>
          </motion.div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 border flex items-center justify-center transition-all ${
                canScrollLeft 
                  ? 'border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground' 
                  : 'border-border/30 text-muted-foreground/30'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 border flex items-center justify-center transition-all ${
                canScrollRight 
                  ? 'border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground' 
                  : 'border-border/30 text-muted-foreground/30'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div 
        ref={scrollRef}
        onScroll={checkScrollButtons}
        className="horizontal-scroll px-6 gap-6 pb-4"
      >
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="horizontal-scroll-item w-[380px] md:w-[450px]"
          >
            <div className="group h-full bg-card border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      {getIcon(exp.type)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                  {exp.title}
                </h3>

                {/* Company */}
                <p className="text-lg text-primary font-semibold mb-4">
                  {exp.company}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
