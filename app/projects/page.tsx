import { getPortfolioData } from '@/lib/portfolio-content';
import PageTransition from '@/components/page-transition';
import { Github, ExternalLink, Folder } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected software projects covering web engineering, cloud integrations, and product-focused delivery.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects | Athuluri Akhil',
    description: 'A portfolio of engineering projects with outcomes, technologies, and practical impact.',
    url: '/projects',
    type: 'website',
  },
};

export default async function Projects() {
  const portfolioData = await getPortfolioData();

  return (
    <PageTransition className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A collection of things I&apos;ve built, ranging from open-source tools to complex web applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.projects.map((project, i) => (
          <div key={i} className="group flex flex-col justify-between bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary/5 text-primary rounded-xl">
                  <Folder size={24} />
                </div>
                <div className="flex gap-3">
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github size={20} />
                  </a>
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
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
        ))}
      </div>
    </PageTransition>
  );
}
