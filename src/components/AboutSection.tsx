
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Code, Database, Server, Cloud, Terminal, GitBranch, FileCode, GraduationCap, MapPin, Calendar } from "lucide-react";

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
      className="py-32 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 dark:from-gray-950 dark:via-gray-900/80 dark:to-gray-800/60 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-orange-100/40 via-amber-100/30 to-transparent dark:from-orange-900/30 dark:via-amber-900/20 dark:to-transparent rounded-bl-[120px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-orange-200/20 to-transparent dark:from-orange-800/20 dark:to-transparent rounded-tr-[100px] -z-0"></div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={ref}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-8 font-intro text-gradient"
            >
              About Me
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 text-gray-600 dark:text-gray-300"
            >
              {/* Enhanced Education Section */}
              <div className="enhanced-glassmorphism p-8 enhanced-glow border-gradient">
                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3 font-intro">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-500 dark:to-amber-500 text-white p-3 rounded-xl shadow-lg">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white font-intro">
                        Bachelor of Science (B.S.) in Economics
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-orange-600 dark:text-orange-400 font-league font-semibold">
                        <Calendar className="w-5 h-5" />
                        <span>2021 - 2025</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-300 font-league">
                        <MapPin className="w-5 h-5" />
                        <span>Indian Institute of Science Education and Research, Bhopal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white font-intro">Technical Skills</h3>
                <div className="space-y-6">
                  {technologies.slice(0, 2).map((tech, index) => (
                    <div key={index} className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-lg border border-orange-200/30 dark:border-orange-700/30">
                      <h4 className="text-lg font-bold mb-2 text-gradient font-intro">{tech.category}</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        {tech.items.map((item, i) => (
                          <li key={i} className="text-sm font-league font-medium">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white font-intro">Core Competencies</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="enhanced-glassmorphism px-4 py-3 rounded-full text-sm flex items-center gap-2 font-league font-semibold enhanced-interactive"
                    title={`${skill.name} - ${skill.level}`}
                  >
                    <span className="text-orange-500 dark:text-orange-400">{skill.icon}</span>
                    <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
                    <span className="text-xs px-2 py-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-600 dark:text-orange-400 rounded-full font-bold">{skill.level}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex flex-col items-center"
          >
            {/* Enhanced Profile Image */}
            <div className="mb-10 flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-xl opacity-30 animate-pulse-glow"></div>
              <Avatar className="w-52 h-52 border-4 border-gradient shadow-2xl relative z-10 enhanced-glow">
                <AvatarImage src="/lovable-uploads/6823fcd0-ca17-4f62-8923-7501bae70db1.png" alt="Profile picture of Dhriman Deka" />
                <AvatarFallback className="text-3xl font-bold font-intro">DD</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-6 w-full">
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-lg border border-orange-200/30 dark:border-orange-700/30">
                <h4 className="text-lg font-bold mb-3 text-gradient font-intro">Data Engineering</h4>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                  {technologies[2].items.map((item, i) => (
                    <li key={i} className="font-league font-medium">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-lg border border-orange-200/30 dark:border-orange-700/30">
                <h4 className="text-lg font-bold mb-3 text-gradient font-intro">Cloud & Tools</h4>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                  {technologies[3].items.map((item, i) => (
                    <li key={i} className="font-league font-medium">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-orange-300/30 to-orange-600/30 dark:from-orange-700/30 dark:to-orange-900/30 rounded-full -z-10 animate-float-gentle"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-amber-200/40 to-amber-400/40 dark:from-amber-700/40 dark:to-amber-900/40 rounded-full -z-10 animate-pulse-glow"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
