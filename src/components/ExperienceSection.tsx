import { motion } from "framer-motion";
import { useInView } from "@/lib/animations";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Data Science & ML Engineer",
    company: "Probe42",
    location: "Bangalore, India",
    period: "May 2025 – Present",
    type: "Full-time",
    highlights: [
      "Architected a generative ML model using 20,000+ PAN records, generating 100% valid PAN and GST numbers",
      "Designed a BERT-based NLP search system, boosting query accuracy by 45%",
      "Launched models on AWS EC2 via Docker, supporting 10,000+ daily queries with latency under 50ms"
    ]
  },
  {
    title: "Research Intern",
    company: "LaRGo - Large Language Models Research Group",
    location: "Kolkata, India",
    period: "Feb 2024 – Aug 2024",
    type: "Research",
    highlights: [
      "Fine-tuned multilingual transformer on 1.5M tweets, attaining 92% F1-score in hate speech detection",
      "Constructed data pipelines with PyTorch and Hugging Face, accelerating training time by 30%",
      "Contributed to peer-reviewed submission through model evaluation via cross-validation and A/B testing"
    ]
  }
];

export default function ExperienceSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="experience" className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/5 blob-shape -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-stone-200/40 blob-shape-2 translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Career</p>
          <h2 className="text-foreground">Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative grid lg:grid-cols-[300px_1fr] gap-8 border border-border p-8 hover:border-primary transition-colors bg-background"
            >
              {/* Left column - Meta */}
              <div className="space-y-4">
                <div>
                  <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider bg-primary text-primary-foreground mb-4">
                    {exp.type}
                  </span>
                  <h3 className="text-2xl text-foreground mb-1">{exp.title}</h3>
                  <p className="text-primary text-lg">{exp.company}</p>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </p>
                </div>
              </div>

              {/* Right column - Highlights */}
              <div>
                <ul className="space-y-4">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Index number */}
              <span className="absolute top-4 right-4 text-6xl font-bold text-muted/20" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                0{index + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
