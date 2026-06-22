"use client";

import { portfolioData } from '@/lib/data';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useCursor } from './cursor-context';

export default function Footer() {
  const { setCursorState } = useCursor();
  return (
    <footer className="border-t border-border mt-20 py-10 bg-background">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm bg-foreground flex items-center justify-center">
            <span className="text-background text-[10px] font-mono">AA</span>
          </div>
          <span className="font-mono text-sm text-muted-foreground">
            © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href={portfolioData.personal.socials.github} 
            target="_blank" 
            rel="noreferrer" 
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            onMouseEnter={() => setCursorState({ variant: 'link' })}
            onMouseLeave={() => setCursorState({ variant: 'default' })}
          >
            <Github size={18} />
          </a>
          <a 
            href={portfolioData.personal.socials.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            onMouseEnter={() => setCursorState({ variant: 'link' })}
            onMouseLeave={() => setCursorState({ variant: 'default' })}
          >
            <Linkedin size={18} />
          </a>
          <a 
            href={portfolioData.personal.socials.twitter} 
            target="_blank" 
            rel="noreferrer" 
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            onMouseEnter={() => setCursorState({ variant: 'link' })}
            onMouseLeave={() => setCursorState({ variant: 'default' })}
          >
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
