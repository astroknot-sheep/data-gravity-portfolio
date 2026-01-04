import { motion } from "framer-motion";
import { useInView } from "@/lib/animations";
import { ArrowUpRight, BookOpen } from "lucide-react";

const blogPosts = [
  {
    title: "Teaching AI to Play Ludo",
    subtitle: "A 10,000-Episode Deep Reinforcement Learning Journey",
    description: "Deep dive into building a DQN agent from scratch with 9,000+ lines of code, achieving 43% win rate in 4-player games.",
    url: "https://medium.com/@not_mordecai/teaching-ai-to-play-ludo-a-10-000-episode-deep-reinforcement-learning-journey-b8aacebc1044",
    tags: ["Reinforcement Learning", "DQN", "Python"]
  },
  {
    title: "I Built a Transformer to Predict Stocks",
    subtitle: "It Achieved 53.7% Accuracy and Lost All Its Money",
    description: "An honest exploration of applying transformer architecture to stock prediction, lessons learned, and why accuracy isn't everything.",
    url: "https://medium.com/@not_mordecai/i-built-a-transformer-to-predict-stocks-it-achieved-53-7-accuracy-and-lost-all-its-money-dfe7a8a44a14",
    tags: ["Transformers", "Finance", "Deep Learning"]
  }
];

export default function MediumBlogSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blob-shape translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blob-shape-2 -translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-background/60 mb-4">Writing</p>
          <h2 className="text-background mb-6">Latest on Medium</h2>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Technical articles exploring machine learning experiments and lessons learned
          </p>
        </motion.div>

        {/* Blog posts grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group block border border-background/20 p-8 hover:border-primary transition-all duration-300 bg-background/5 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 border border-background/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
                  <BookOpen className="w-5 h-5 text-background/70 group-hover:text-primary-foreground transition-colors" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-background/40 group-hover:text-primary transition-colors transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>

              <h3 className="text-2xl text-background mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {post.title}
              </h3>
              <p className="text-background/60 text-sm mb-4">{post.subtitle}</p>

              <p className="text-background/70 text-sm leading-relaxed mb-6">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 bg-primary/20 text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a 
            href="https://medium.com/@not_mordecai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-background/60 hover:text-primary transition-colors text-sm uppercase tracking-wider"
          >
            View all articles <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
