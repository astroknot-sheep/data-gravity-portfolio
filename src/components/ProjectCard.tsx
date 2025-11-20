import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  technologies: string[];
  description: string[];
  index: number;
  isInView: boolean;
  link?: string;
}

export default function ProjectCard({ title, technologies, description, link = "#" }: ProjectCardProps) {
  return (
    <div className="neobrutalist-card p-6 h-full flex flex-col quick-transition hover:shadow-brutal-lg">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-black uppercase flex-1">{title}</h3>
        <span className="bg-primary text-primary-foreground px-3 py-1 border-3 border-black dark:border-white rounded-sm text-xs font-bold uppercase ml-2">
          {technologies[0]}
        </span>
      </div>
      
      <p className="font-semibold mb-4 flex-1">{description[0]}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.slice(1).map((tech, i) => (
          <span key={i} className="text-xs py-1 px-2 bg-muted border-2 border-black dark:border-white rounded-sm font-bold uppercase">
            {tech}
          </span>
        ))}
      </div>
      
      <Button variant="outline" size="sm" className="w-full" asChild>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <span className="uppercase font-black">View Project</span>
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </Button>
    </div>
  );
}
