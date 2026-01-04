import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { useScrollReveal } from "@/lib/magnetic";

interface BlogPost {
  title: string;
  excerpt: string;
  url: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    title: "Teaching AI to Play Ludo: A 10,000 Episode Deep Reinforcement Learning Journey",
    excerpt: "An in-depth exploration of training an AI agent to master Ludo through deep reinforcement learning, spanning 10,000 episodes of gameplay and learning.",
    url: "https://medium.com/@not_mordecai/teaching-ai-to-play-ludo-a-10-000-episode-deep-reinforcement-learning-journey-b8aacebc1044",
    readTime: "8 min read",
    tags: ["Deep Learning", "Reinforcement Learning", "AI"]
  },
  {
    title: "I Built a Transformer to Predict Stocks: It Achieved 53.7% Accuracy and Lost All Its Money",
    excerpt: "A brutally honest account of building a transformer model for stock prediction, achieving decent accuracy but failing spectacularly in real trading scenarios.",
    url: "https://medium.com/@not_mordecai/i-built-a-transformer-to-predict-stocks-it-achieved-53-7-accuracy-and-lost-all-its-money-dfe7a8a44a14",
    readTime: "10 min read",
    tags: ["Machine Learning", "Transformers", "Finance"]
  }
];

export default function MediumBlogSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="medium-blogs"
      className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
      ref={ref}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-amber-500/10 border-2 border-amber-500/30 rounded-full">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <span className="text-amber-400 font-bold tracking-wider">MEDIUM ARTICLES</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-['Intro_Rust'] gradient-shift">
            Latest on Medium
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-['League_Spartan']">
            Exploring AI, Machine Learning, and Technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-2xl p-8 overflow-hidden card-tilt transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_50px_rgba(251,191,36,0.3)]">
                {/* Shimmer overlay */}
                <div className="shimmer-overlay"></div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 font-['League_Spartan'] text-white group-hover:text-amber-400 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 mb-6 flex-grow font-['League_Spartan'] leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                    <span className="text-sm text-gray-500 font-['League_Spartan']">
                      {post.readTime}
                    </span>
                    <div className="flex items-center gap-2 text-amber-400 font-bold group-hover:gap-4 transition-all duration-300">
                      <span className="font-['League_Spartan']">Read on Medium</span>
                      <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-[-2px] transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Shadow layer */}
              <div className="absolute inset-0 bg-amber-500/5 rounded-2xl translate-y-2 -z-10 group-hover:translate-y-3 transition-transform duration-300"></div>
            </motion.a>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="https://medium.com/@not_mordecai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold text-lg rounded-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all duration-300 font-['League_Spartan']"
          >
            <span>View All Articles</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
