import { motion } from "framer-motion";
import { FileText, ExternalLink, Eye, Download, BookOpen } from "lucide-react";

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
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Writing
            </span>
            <div className="h-px flex-1 bg-border max-w-24" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-foreground leading-[0.9]">
            Research &<br />
            <span className="text-primary">Publications</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Research Papers */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Research Papers
              </h3>
            </div>
            
            {publications.map((pub, index) => (
              <motion.a
                key={pub.title}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group block bg-card border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden mb-4"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/30 px-3 py-1">
                      {pub.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{pub.platform}</span>
                  </div>

                  <h4 className="text-xl font-bold text-foreground mb-2 leading-tight">
                    {pub.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-6">
                    {pub.subtitle}
                  </p>

                  <div className="flex items-center gap-6 text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {pub.stats.views} views
                    </span>
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      {pub.stats.downloads} downloads
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Technical Articles */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Technical Articles
              </h3>
            </div>
            
            {articles.map((article, index) => (
              <motion.a
                key={article.title}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group block bg-card border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden mb-4"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent border border-accent/30 px-3 py-1">
                      {article.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.platform}</span>
                  </div>

                  <h4 className="text-lg font-bold text-foreground mb-2 leading-tight line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {article.description}
                  </p>

                  <div className="flex items-center gap-2 text-primary">
                    <span className="text-xs font-bold uppercase tracking-wider">Read Article</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
