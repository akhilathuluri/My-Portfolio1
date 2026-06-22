"use client";

import { Github, Linkedin, Twitter, Youtube, FileText } from "lucide-react";
import { useCursor } from "./cursor-context";

type SocialIconLinks = {
  github: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  resume?: string;
};

type SocialIconsProps = {
  links: SocialIconLinks;
  className?: string;
};

export default function SocialIcons({ links, className }: SocialIconsProps) {
  const { setCursorState } = useCursor();

  const items = [
    { href: links.github, label: "GitHub", Icon: Github },
    { href: links.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: links.twitter, label: "X (Twitter)", Icon: Twitter },
    { href: links.youtube, label: "YouTube", Icon: Youtube },
  ];
  if (links.resume) {
    items.push({ href: links.resume, label: "Download Resume", Icon: FileText });
  }

  return (
    <nav aria-label="Social links" className={className}>
      <ul className="flex items-center justify-center gap-4">
        {items.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/40"
              onMouseEnter={() => setCursorState({ variant: "link" })}
              onMouseLeave={() => setCursorState({ variant: "default" })}
            >
              <Icon size={18} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}