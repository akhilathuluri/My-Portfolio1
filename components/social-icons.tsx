import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

type SocialIconLinks = {
  github: string;
  linkedin: string;
  twitter: string;
  youtube: string;
};

type SocialIconsProps = {
  links: SocialIconLinks;
  className?: string;
};

export default function SocialIcons({ links, className }: SocialIconsProps) {
  const items = [
    { href: links.github, label: "GitHub", Icon: Github },
    { href: links.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: links.twitter, label: "X (Twitter)", Icon: Twitter },
    { href: links.youtube, label: "YouTube", Icon: Youtube },
  ];

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
            >
              <Icon size={18} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}