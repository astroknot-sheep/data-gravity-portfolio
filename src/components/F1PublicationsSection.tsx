import { motion } from "framer-motion";
import { ExternalLink, Eye, Download } from "lucide-react";

const publications = [
  {
    title: "Comparative Analysis of NPS and UPS from an Employee Perspective",
    subtitle: "Evaluation of Fiscal Implications of Pension Reforms",
    platform: "SSRN",
    stats: { views: "2,848+", downloads: "468+" },
    link: "https://ssrn.com/",
    type: "Research Paper",
  },
];

const articles = [
  {
    title: "Teaching AI to Play Ludo: A 10,000-Episode Deep Reinforcement Learning Journey",
    description: "Building a DQN agent from scratch with 9,000+ lines of code, achieving 43% win rate in 4-player games.",
    platform: "Medium",
    link: "https://medium.com/@not_mordecai/teaching-ai-to-play-ludo-a-10-000-episode-deep-reinforcement-learning-journey-b8aacebc1044",
  },
  {
    title: "I Built a Transformer to Predict Stocks — It Achieved 53.7% Accuracy",
    description: "Building stock prediction models with transformers and the lessons learned.",
    platform: "Medium",
    link: "https://medium.com/@not_mordecai/i-built-a-transformer-to-predict-stocks-it-achieved-53-7-accuracy-and-lost-all-its-money-dfe7a8a44a14",
  },
];

export default function F1PublicationsSection() {
  return (
    <section id="publications" className="py-48 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <p className="text-sm text-muted-foreground tracking-wide mb-4">Writing</p>
          <h2 className="text-foreground">Research & Articles</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Research Papers */}
          <div>
            <p className="text-sm text-muted-foreground mb-8">Research Papers</p>
            {publications.map((pub) => (
              <motion.a
                key={pub.title}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="block border border-border p-8 hover:border-muted-foreground/30 transition-colors duration-150 mb-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-primary font-medium">{pub.type}</span>
                  <span className="text-xs text-muted-foreground">{pub.platform}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">{pub.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{pub.subtitle}</p>
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5" /> {pub.stats.views} views
                  </span>
                  <span className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5" /> {pub.stats.downloads} downloads
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Articles */}
          <div>
            <p className="text-sm text-muted-foreground mb-8">Technical Articles</p>
            {articles.map((article) => (
              <motion.a
                key={article.title}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group block border border-border p-8 hover:border-muted-foreground/30 transition-colors duration-150 mb-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs text-muted-foreground">{article.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">{article.title}</h3>
                <p className="text-sm text-muted-foreground">{article.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
