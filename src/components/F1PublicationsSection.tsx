import { motion } from "framer-motion";
import { FileText, ExternalLink, Eye, Download } from "lucide-react";

const publications = [
  {
    title: "Comparative Analysis of NPS and UPS from an Employee Perspective",
    subtitle: "Evaluation of Fiscal Implications of Pension Reforms",
    platform: "SSRN",
    stats: { views: "2,848+", downloads: "468+" },
    link: "https://ssrn.com/",
    type: "Research Paper"
  }
];

const articles = [
  {
    title: "Teaching AI to Play Ludo: A 10,000-Episode Deep Reinforcement Learning Journey",
    description: "Deep dive into building a DQN agent from scratch with 9,000+ lines of code, achieving 43% win rate in 4-player games.",
    platform: "Medium",
    link: "https://medium.com/@not_mordecai/teaching-ai-to-play-ludo-a-10-000-episode-deep-reinforcement-learning-journey-b8aacebc1044",
    type: "Technical Article"
  },
  {
    title: "I Built a Transformer to Predict Stocks — It Achieved 53.7% Accuracy",
    description: "A journey into building stock prediction models with transformers and the lessons learned.",
    platform: "Medium",
    link: "https://medium.com/@not_mordecai/i-built-a-transformer-to-predict-stocks-it-achieved-53-7-accuracy-and-lost-all-its-money-dfe7a8a44a14",
    type: "Technical Article"
  }
];

export default function F1PublicationsSection() {
  return (
    <section id="publications" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-primary mb-4 block">
            Research & Writing
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-foreground mb-4">
            Publications
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Research papers and technical articles on AI, ML, and data science
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Research Papers */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Research Papers
            </h3>
            
            {publications.map((pub, index) => (
              <motion.a
                key={pub.title}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="block bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors mb-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full">
                    {pub.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{pub.platform}</span>
                </div>

                <h4 className="text-xl font-bold text-foreground mb-2">
                  {pub.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  {pub.subtitle}
                </p>

                <div className="flex items-center gap-6 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    {pub.stats.views} views
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Download className="w-4 h-4" />
                    {pub.stats.downloads} downloads
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Technical Articles */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Technical Articles
            </h3>
            
            {articles.map((article, index) => (
              <motion.a
                key={article.title}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="block bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors mb-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent/20 text-accent rounded-full">
                    {article.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.platform}</span>
                </div>

                <h4 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {article.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-primary">
                  <span className="text-sm font-semibold">Read Article</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
