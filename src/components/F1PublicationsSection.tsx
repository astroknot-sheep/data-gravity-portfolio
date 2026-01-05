import { motion } from "framer-motion";
import { FileText, ExternalLink, Eye, Download, Sparkles } from "lucide-react";

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
    <section id="publications" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 f1-grid opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 hud-glass hud-corners text-sm font-bold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-4 h-4" />
              Research & Writing
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-intro uppercase text-gradient-glow mb-4"
          >
            Publications
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            Research papers and technical articles on AI, ML, and data science
          </motion.p>
        </div>

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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="block bento-card hud-corners-large p-6 group hover:border-primary/40 transition-all duration-300 mb-4"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full border border-primary/30">
                    {pub.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{pub.platform}</span>
                </div>

                <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-gradient transition-all">
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

                <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-semibold">Read Paper</span>
                  <ExternalLink className="w-4 h-4" />
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="block bento-card hud-corners p-6 group hover:border-primary/40 transition-all duration-300 mb-4"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                    {article.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.platform}</span>
                </div>

                <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-gradient transition-all line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {article.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
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
