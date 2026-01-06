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
      case 'work': return <Briefcase className="w-6 h-6" />;
      case 'research': return <Zap className="w-6 h-6" />;
      case 'education': return <GraduationCap className="w-6 h-6" />;
      default: return <Briefcase className="w-6 h-6" />;
    }
  };

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-primary mb-4 block">
            Career Journey
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-foreground mb-4">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            My professional journey in AI, data science, and research
          </p>
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <div className="container mx-auto px-6 flex justify-end gap-3 mb-6">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center transition-colors ${
            canScrollLeft ? 'text-foreground hover:bg-muted' : 'text-muted-foreground/30'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center transition-colors ${
            canScrollRight ? 'text-foreground hover:bg-muted' : 'text-muted-foreground/30'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Horizontal scroll container */}
      <div 
        ref={scrollRef}
        onScroll={checkScrollButtons}
        className="horizontal-scroll px-6 gap-6 pb-4"
      >
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="horizontal-scroll-item w-[420px] md:w-[480px]"
          >
            <div className="h-full bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors">
              {/* Icon & Type */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                  {getIcon(exp.type)}
                </div>
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full">
                  {exp.type}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-2">
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
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
