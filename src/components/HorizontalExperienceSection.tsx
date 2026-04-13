import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Zap, MapPin, Calendar } from "lucide-react";

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
      "Launched models on AWS EC2 via Docker, 10,000+ daily queries, <50ms latency",
    ],
  },
  {
    type: "research",
    title: "Research Intern",
    company: "LaRGo LLM Research Group",
    location: "Kolkata, India",
    period: "Feb 2024 – Aug 2024",
    highlights: [
      "Fine-tuned multilingual transformer on 1.5M tweets – 92% F1-score",
      "Processing 200+ tweets/second, surpassing baselines by 15%",
      "Constructed data pipelines with PyTorch & Hugging Face, 30% faster training",
    ],
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
      "Research focus on AI/ML applications in economic modeling",
    ],
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "work": return <Briefcase className="w-4 h-4" />;
    case "research": return <Zap className="w-4 h-4" />;
    case "education": return <GraduationCap className="w-4 h-4" />;
    default: return <Briefcase className="w-4 h-4" />;
  }
};

export default function HorizontalExperienceSection() {
  return (
    <section id="experience" className="py-48 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <p className="text-sm text-muted-foreground tracking-wide mb-4">Journey</p>
          <h2 className="text-foreground">Experience</h2>
        </motion.div>

        {/* Tree Structure */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central trunk line */}
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transformOrigin: "top" }}
          />

          {experienceData.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex items-start mb-16 last:mb-0"
              >
                {/* Node dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-3 h-3 border-2 border-primary bg-background rounded-full" />

                {/* Branch line (desktop) */}
                <div
                  className={`hidden md:block absolute top-[5px] h-px w-8 bg-border ${
                    isLeft ? "right-1/2 mr-2" : "left-1/2 ml-2"
                  }`}
                />

                {/* Card */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${
                    isLeft ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="border border-border p-6 hover:border-muted-foreground/30 transition-colors duration-150">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-primary">{getIcon(exp.type)}</div>
                      <span className="text-xs text-muted-foreground capitalize">{exp.type}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-base text-primary font-medium mb-3">{exp.company}</p>

                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Root node */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 -bottom-2 w-2 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}
