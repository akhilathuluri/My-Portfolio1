'use client';

import React from 'react';
import { Github, ExternalLink, Folder } from 'lucide-react';
interface Project {
  name: string;
  description: string;
  tags: string[];
  impact: string;
  link: string;
}

export default function ProjectCard({ project }: { project: Project }) {

  return (
    <div 
      className="group flex flex-col justify-between bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      onClick={() => window.open(project.link, '_blank')}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-primary/5 text-primary rounded-xl">
            <Folder size={24} />
          </div>
          <div className="flex gap-3 relative z-10">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={20} />
            </a>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.name}</h3>
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
      
      <div>
        <div className="text-xs font-medium text-foreground mb-4 pb-4 border-b border-border/50">
          Impact: <span className="text-muted-foreground font-normal">{project.impact}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
