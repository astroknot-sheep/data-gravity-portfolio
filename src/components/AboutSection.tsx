import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Code, Database, Server, Cloud, Terminal, GitBranch, GraduationCap, MapPin, Calendar, Sparkles } from "lucide-react";

export default function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const technologies = [
    { 
      category: "Programming Languages",
      items: ["Python (NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch)", "SQL", "Shell Scripting"]
    },
    {
      category: "Machine Learning",
      items: [
        "Regression, Classification", 
        "Natural Language Processing (NLP)", 
        "Deep Learning (CNN, RNN, LSTM, Transformers)",
        "Reinforcement Learning",
        "Feature Engineering, EDA",
        "Statistical Modeling",
        "Time Series Forecasting"
      ]
    },
    {
      category: "Data Engineering",
      items: [
        "Data Pipelines (Apache Airflow, PostgreSQL)",
        "ETL Processes",
        "Data Warehousing",
        "Data Cleaning"
      ]
    },
    {
      category: "Cloud & Tools",
      items: [
        "Docker",
        "AWS (S3, EC2, SageMaker, Lambda)",
        "MLFlow, DVC, Git",
        "FastAPI, Flask, Streamlit",
        "Tableau, Power BI"
      ]
    }
  ];
  
  const skills = [
    { name: "Python", level: "Advanced", icon: <Code className="w-5 h-5" /> },
    { name: "ML/Deep Learning", level: "Intermediate", icon: <Server className="w-5 h-5" /> },
    { name: "Data Engineering", level: "Intermediate", icon: <Database className="w-5 h-5" /> },
    { name: "AWS", level: "Intermediate", icon: <Cloud className="w-5 h-5" /> },
    { name: "Shell Scripting", level: "Intermediate", icon: <Terminal className="w-5 h-5" /> },
    { name: "Git/Version Control", level: "Advanced", icon: <GitBranch className="w-5 h-5" /> }
  ];
  
  return (
    <section
      id="about"
      className="py-32 bg-background relative overflow-hidden"
    >
      {/* Geometric background pattern */}
      <div className="absolute inset-0 geometric-grid opacity-10"></div>
      
      {/* Angular decorative shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-secondary border-6 border-black dark:border-white angular-shape"></div>
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-accent border-6 border-black dark:border-white"></div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div ref={ref}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3 }}
              className="type-h2 font-black mb-8 uppercase flex items-center gap-4"
            >
              <Sparkles className="w-10 h-10 text-primary" />
              About Me
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-8"
            >
              {/* Education Section - Neobrutalist card */}
              <div className="neobrutalist-card p-8">
                <h3 className="text-3xl font-black mb-6 uppercase flex items-center gap-4">
                  <div className="p-3 bg-primary border-3 border-black dark:border-white rounded-sm">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 border-3 border-black dark:border-white rounded-sm">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-black uppercase">
                        Bachelor of Science (B.S.) in Economics
                      </h4>
                      <div className="flex items-center gap-2 mt-2 font-bold">
                        <Calendar className="w-4 h-4" />
                        <span>2021 - 2025</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4" />
                        <span>Indian Institute of Science Education and Research, Bhopal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Technical Skills */}
              <div>
                <h3 className="text-2xl font-black mb-6 uppercase">Technical Skills</h3>
                <div className="space-y-6">
                  {technologies.slice(0, 2).map((tech, index) => (
                    <div 
                      key={index} 
                      className="neobrutalist-card p-6"
                    >
                      <h4 className="text-lg font-black mb-4 uppercase">{tech.category}</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        {tech.items.map((item, i) => (
                          <li key={i} className="font-semibold">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Core Competencies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-10"
            >
              <h3 className="text-2xl font-black mb-6 uppercase">Core Competencies</h3>
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.2, delay: 0.3 + index * 0.05 }}
                    className="bg-background border-5 border-black dark:border-white rounded-sm px-6 py-3 flex items-center gap-3 font-bold shadow-brutal-sm hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] quick-transition"
                  >
                    <span className="text-primary">{skill.icon}</span>
                    <span>{skill.name}</span>
                    <span className="text-xs px-3 py-1 bg-primary text-primary-foreground border-2 border-black dark:border-white rounded-sm uppercase">{skill.level}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Profile and additional skills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Profile Image - Neobrutalist style */}
            <div className="mb-10">
              <Avatar className="w-56 h-56 border-8 border-black dark:border-white shadow-brutal-lg">
                <AvatarImage src="/lovable-uploads/6823fcd0-ca17-4f62-8923-7501bae70db1.png" alt="Profile picture of Dhriman Deka" />
                <AvatarFallback className="text-3xl font-black">DD</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-6 w-full">
              <div className="neobrutalist-card p-8">
                <h4 className="text-2xl font-black mb-4 uppercase">Data Engineering</h4>
                <ul className="list-disc pl-6 space-y-2 font-semibold">
                  {technologies[2].items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="neobrutalist-card p-8">
                <h4 className="text-2xl font-black mb-4 uppercase">Cloud & Tools</h4>
                <ul className="list-disc pl-6 space-y-2 font-semibold">
                  {technologies[3].items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
