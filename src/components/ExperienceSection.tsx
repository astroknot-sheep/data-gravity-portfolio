
import { useInView } from "@/lib/animations";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const experienceData = [
    {
      period: "2021 - Present",
      title: "Senior Data Scientist",
      company: "TechInnovate Solutions",
      description: "Led end-to-end development of ML systems for Fortune 500 clients, resulting in 25% average cost reduction and 35% efficiency improvement across operations.",
      achievements: [
        "Architected and deployed real-time recommendation engine serving 2M+ daily users",
        "Mentored team of 5 junior data scientists, improving team velocity by 40%",
        "Reduced model training time by 65% through advanced parallelization techniques"
      ]
    },
    {
      period: "2019 - 2021",
      title: "Machine Learning Engineer",
      company: "DataDriven Enterprises",
      description: "Developed and optimized machine learning models for financial forecasting and risk assessment, achieving 92% prediction accuracy.",
      achievements: [
        "Built automated data pipeline reducing manual processing time by 85%",
        "Implemented computer vision solution for document processing with 98% accuracy",
        "Collaborated with product team to integrate ML features into core platform"
      ]
    },
    {
      period: "2017 - 2019",
      title: "Data Analyst",
      company: "Insight Analytics Group",
      description: "Analyzed large datasets to extract actionable business insights, directly contributing to 12% revenue growth through data-driven decisions.",
      achievements: [
        "Designed interactive dashboards for executive team using Tableau",
        "Automated weekly reporting saving 15+ hours of manual work per week",
        "Identified key customer segments leading to targeted marketing campaigns"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <div className={`transition-all duration-700 ${
            isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
          }`}>
            <span className="inline-block px-3 py-1 text-sm font-medium text-amber-800 bg-amber-100 rounded-full dark:bg-amber-900/30 dark:text-amber-300 mb-3">Experience</span>
            <h2 className="text-4xl font-bold mb-4">Professional Journey</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              My career path demonstrates progressive growth in data science expertise and leadership abilities
            </p>
          </div>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {experienceData.map((item, index) => (
            <motion.div 
              key={index} 
              className={`relative pl-10 pb-16 last:pb-0 ${index !== experienceData.length - 1 ? "border-l-2 border-amber-200 dark:border-amber-900/50" : ""}`}
              variants={itemVariants}
            >
              {/* Timeline dot */}
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-amber-500 border-4 border-white dark:border-gray-800 z-10"></div>
              
              {/* Period badge */}
              <div className="absolute left-10 top-0 inline-block px-3 py-1 text-xs font-medium text-amber-800 bg-amber-100 rounded-full dark:bg-amber-900/30 dark:text-amber-300">
                {item.period}
              </div>
              
              {/* Content card */}
              <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-amber-600 dark:text-amber-400 font-medium">{item.company}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-5">{item.description}</p>
                
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Key Achievements</h4>
                <ul className="space-y-2">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start text-gray-700 dark:text-gray-300">
                      <svg 
                        className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action */}
        <div className={`mt-12 text-center transition-all duration-700 delay-300 ${
          isInView ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
        }`}>
          <a 
            href="#" 
            className="inline-flex items-center px-5 py-2.5 bg-transparent border border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors duration-300"
          >
            <span>Download Resume</span>
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16L12 8M12 16L9 13M12 16L15 13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
