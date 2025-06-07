
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
      className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gray-50 dark:bg-gray-900 rounded-bl-[100px] -z-0"></div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={ref}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-6 font-intro text-gray-800 dark:text-orange-300"
            >
              About Me
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-gray-600 dark:text-gray-300 font-league"
            >
              {/* Education Section */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2 font-intro">
                  <GraduationCap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  Education
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-600 dark:bg-orange-500 text-white p-2 rounded-lg">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white font-intro">
                        Bachelor of Science (B.S.) in Economics
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-orange-600 dark:text-orange-400 font-league">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">2021 - 2025</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-300 font-league">
                        <MapPin className="w-4 h-4" />
                        <span>Indian Institute of Science Education and Research, Bhopal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white font-intro">Technical Skills</h3>
                <div className="space-y-4">
                  {technologies.slice(0, 2).map((tech, index) => (
                    <div key={index}>
                      <h4 className="text-base font-semibold mb-1 text-gray-700 dark:text-orange-200 font-intro">{tech.category}</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {tech.items.map((item, i) => (
                          <li key={i} className="text-sm font-league">{item}</li>
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
              className="mt-8"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white font-intro">Core Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-full text-sm flex items-center gap-1 font-league"
                    title={`${skill.name} - ${skill.level}`}
                  >
                    <span className="text-orange-500 dark:text-orange-400 mr-1">{skill.icon}</span>
                    <span>{skill.name}</span>
                    <span className="text-xs ml-1 px-1.5 py-0.5 bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-full">{skill.level}</span>
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
            {/* Profile Image */}
            <div className="mb-8 flex justify-center">
              <Avatar className="w-44 h-44 border-4 border-orange-500 dark:border-orange-400 shadow-xl">
                <AvatarImage src="/lovable-uploads/6823fcd0-ca17-4f62-8923-7501bae70db1.png" alt="Profile picture of Dhriman Deka" />
                <AvatarFallback>DD</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-4 w-full">
              <div>
                <h4 className="text-base font-semibold mb-1 text-gray-700 dark:text-orange-200 font-intro">Data Engineering</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                  {technologies[2].items.map((item, i) => (
                    <li key={i} className="font-league">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-base font-semibold mb-1 text-gray-700 dark:text-orange-200 font-intro">Cloud & Tools</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                  {technologies[3].items.map((item, i) => (
                    <li key={i} className="font-league">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-300 to-orange-600 dark:from-orange-700 dark:to-orange-900 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 rounded-full -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
