import { getPortfolioData } from '@/lib/portfolio-content';
import PageTransition from '@/components/page-transition';
import ProjectCard from '@/components/project-card';
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
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </PageTransition>
  );
}
