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

const getIcon = (type: string) => {
  switch (type) {
    case 'work': return <Briefcase className="w-5 h-5" />;
    case 'research': return <Zap className="w-5 h-5" />;
    case 'education': return <GraduationCap className="w-5 h-5" />;
    default: return <Briefcase className="w-5 h-5" />;
  }
};

export default function HorizontalExperienceSection() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: "linear-gradient(to left, hsl(var(--primary) / 0.05) 0%, transparent 100%)"
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
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
        </motion.div>

        {/* Tree Structure */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central trunk line */}
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: "top" }}
          />

          {experienceData.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-start mb-16 last:mb-0 ${
                  // On mobile always right of the line; on desktop alternate
                  "md:justify-start"
                }`}
              >
                {/* Node dot on the trunk */}
                <motion.div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-4 h-4 border-2 border-primary bg-background rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.2 }}
                />

                {/* Connector branch line (desktop only) */}
                <motion.div
                  className={`hidden md:block absolute top-[7px] h-0.5 w-8 bg-border ${
                    isLeft ? "right-1/2 mr-2" : "left-1/2 ml-2"
                  }`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.2 }}
                  style={{ transformOrigin: isLeft ? "right" : "left" }}
                />

                {/* Card */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${
                    isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                  }`}
                >
                  <motion.div
                    className="group bg-card border border-border p-6 relative overflow-hidden hover:border-primary/50 transition-colors duration-300"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        {getIcon(exp.type)}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        {exp.type}
                      </span>
                      <span className="ml-auto text-3xl font-bold text-border/20">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title & Company */}
                    <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-base text-primary font-semibold mb-3">
                      {exp.company}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}

          {/* Root node at bottom */}
          <motion.div
            className="absolute left-6 md:left-1/2 -translate-x-1/2 -bottom-3 w-3 h-3 bg-primary rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          />
        </div>
      </div>
    </section>
  );
}
