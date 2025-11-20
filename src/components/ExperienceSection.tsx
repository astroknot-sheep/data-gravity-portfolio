import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";

export default function ExperienceSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const experienceData = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Engineer - Data Science and ML",
      company: "Probe42",
      location: "India",
      period: "Current",
      description: "Leading data science and machine learning initiatives, developing advanced ML models and data-driven solutions."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Research Intern, LaRGo - LLMs Research Group",
      location: "Kolkata, India",
      period: "Feb 2024 – Present",
      description: "Developing innovative AI solutions using large language models. Co-authoring research papers for top AI conferences."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Winter Intern, MOON Lab, IISER Bhopal",
      location: "Bhopal, India",
      period: "Dec 2023 – Present",
      description: "Researching RAG architecture optimization and embedding model implementation."
    }
  ];
  
  return (
    <section id="experience" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 geometric-grid opacity-10"></div>
      <div className="absolute top-20 left-20 w-40 h-40 bg-accent border-6 border-black dark:border-white angular-shape"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="type-h2 font-black mb-6 uppercase"
          >
            Experience
          </motion.h2>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="neobrutalist-card p-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary border-5 border-black dark:border-white rounded-sm flex items-center justify-center flex-shrink-0">
                  <div className="text-primary-foreground">{experience.icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black uppercase mb-2">{experience.title}</h3>
                  {experience.company && <p className="text-xl font-bold text-primary mb-2">{experience.company}</p>}
                  <p className="text-lg font-bold mb-2">{experience.location}</p>
                  <div className="inline-block bg-accent border-3 border-black dark:border-white px-4 py-2 rounded-sm font-bold uppercase text-sm mb-4">
                    {experience.period}
                  </div>
                  <p className="font-semibold leading-relaxed">{experience.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
