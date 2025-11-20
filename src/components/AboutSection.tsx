import { useInView } from "@/lib/animations";
import { useMagneticEffect, useCardTilt3D, useScrollReveal } from "@/lib/magnetic";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Code, Database, Server, Cloud, Terminal, GitBranch, FileCode, GraduationCap, MapPin, Calendar, Sparkles } from "lucide-react";

export default function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const cardTiltRef = useCardTilt3D();
  const educationRevealRef = useScrollReveal();
  
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
      className="py-40 bg-gradient-to-br from-white via-orange-50/40 to-amber-50/30 dark:from-gray-950 dark:via-gray-900/90 dark:to-gray-800/70 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-orange-100/50 via-amber-100/40 to-transparent dark:from-orange-900/40 dark:via-amber-900/30 dark:to-transparent rounded-bl-[150px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-orange-200/30 to-transparent dark:from-orange-800/30 dark:to-transparent rounded-tr-[120px] -z-0"></div>
      <div className="absolute inset-0 bg-data-grid bg-[length:100px_100px] opacity-20 dark:opacity-10 -z-10"></div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div ref={ref}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="type-h2 font-bold mb-10 font-intro text-gradient flex items-center gap-4"
            >
              <Sparkles className="w-10 h-10 text-orange-500 animate-pulse-glow" />
              About Me
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-10 text-gray-600 dark:text-gray-300"
            >
              {/* Enhanced Education Section */}
              <div 
                ref={educationRevealRef as any}
                className="enhanced-glassmorphism p-10 enhanced-glow border-gradient card-tilt opacity-0 overflow-hidden shimmer-overlay"
              >
                <h3 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white flex items-center gap-4 font-intro">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-2xl">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  Education
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-5">
                    <div className="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-500 dark:to-amber-500 text-white p-4 rounded-2xl shadow-2xl">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-800 dark:text-white font-intro">
                        Bachelor of Science (B.S.) in Economics
                      </h4>
                      <div className="flex items-center gap-3 mt-3 text-orange-600 dark:text-orange-400 font-league font-semibold text-lg">
                        <Calendar className="w-5 h-5" />
                        <span>2021 - 2025</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-gray-600 dark:text-gray-300 font-league text-base">
                        <MapPin className="w-5 h-5" />
                        <span>Indian Institute of Science Education and Research, Bhopal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white font-intro">Technical Skills</h3>
                <div className="space-y-8">
                  {technologies.slice(0, 2).map((tech, index) => (
                    <div 
                      key={index} 
                      className="p-6 bg-white/70 dark:bg-gray-800/70 rounded-2xl backdrop-blur-lg border-2 border-orange-200/40 dark:border-orange-700/40 card-tilt transition-all duration-500 hover:border-orange-400/70 dark:hover:border-orange-600/70 hover:shadow-2xl shimmer-overlay overflow-hidden"
                    >
                      <h4 className="text-xl font-bold mb-4 text-gradient font-intro">{tech.category}</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        {tech.items.map((item, i) => (
                          <li key={i} className="text-base font-league font-medium">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-12"
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white font-intro">Core Competencies</h3>
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                    className="enhanced-glassmorphism px-6 py-4 rounded-2xl text-base flex items-center gap-3 font-league font-semibold enhanced-interactive shadow-lg hover:shadow-2xl"
                    title={`${skill.name} - ${skill.level}`}
                  >
                    <span className="text-orange-500 dark:text-orange-400">{skill.icon}</span>
                    <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
                    <span className="text-sm px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-600 dark:text-orange-400 rounded-full font-bold">{skill.level}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex flex-col items-center"
            ref={cardTiltRef as any}
          >
            {/* Enhanced Profile Image */}
            <div className="mb-12 flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-2xl opacity-40 animate-pulse-glow"></div>
              <Avatar className="w-64 h-64 border-4 border-gradient shadow-2xl relative z-10 enhanced-glow">
                <AvatarImage src="/lovable-uploads/6823fcd0-ca17-4f62-8923-7501bae70db1.png" alt="Profile picture of Dhriman Deka" />
                <AvatarFallback className="text-4xl font-bold font-intro">DD</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-8 w-full">
              <div className="p-8 bg-white/70 dark:bg-gray-800/70 rounded-2xl backdrop-blur-lg border-2 border-orange-200/40 dark:border-orange-700/40 card-tilt transition-all duration-500 hover:border-orange-400/70 dark:hover:border-orange-600/70 shimmer-overlay overflow-hidden shadow-xl hover:shadow-2xl">
                <h4 className="text-2xl font-bold mb-4 text-gradient font-intro">Data Engineering</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 text-base">
                  {technologies[2].items.map((item, i) => (
                    <li key={i} className="font-league font-medium">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="p-8 bg-white/70 dark:bg-gray-800/70 rounded-2xl backdrop-blur-lg border-2 border-orange-200/40 dark:border-orange-700/40 card-tilt transition-all duration-500 hover:border-orange-400/70 dark:hover:border-orange-600/70 shimmer-overlay overflow-hidden shadow-xl hover:shadow-2xl">
                <h4 className="text-2xl font-bold mb-4 text-gradient font-intro">Cloud & Tools</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 text-base">
                  {technologies[3].items.map((item, i) => (
                    <li key={i} className="font-league font-medium">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-br from-orange-300/40 to-orange-600/40 dark:from-orange-700/40 dark:to-orange-900/40 rounded-full -z-10 animate-float-gentle blur-2xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-amber-200/50 to-amber-400/50 dark:from-amber-700/50 dark:to-amber-900/50 rounded-full -z-10 animate-pulse-glow blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
