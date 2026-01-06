import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const blogPosts = [
  {
    title: "Teaching AI to Play Ludo: A 10,000 Episode Deep RL Journey",
    excerpt: "Deep dive into building a DQN agent from scratch with 9,000+ lines of code.",
    url: "https://medium.com/@not_mordecai/teaching-ai-to-play-ludo-a-10-000-episode-deep-reinforcement-learning-journey-b8aacebc1044",
    tags: ["Deep RL", "DQN", "AI"]
  },
  {
    title: "I Built a Transformer to Predict Stocks — 53.7% Accuracy",
    excerpt: "A journey into stock prediction with transformers and lessons learned.",
    url: "https://medium.com/@not_mordecai/i-built-a-transformer-to-predict-stocks-it-achieved-53-7-accuracy-and-lost-all-its-money-dfe7a8a44a14",
    tags: ["Transformers", "ML", "Finance"]
  }
];

export default function MediumBlogSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-primary mb-4 block">
            Latest on Medium
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-foreground">
            Technical Articles
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="block bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs font-medium bg-primary/10 border border-primary/20 rounded text-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <span>Read Article</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
