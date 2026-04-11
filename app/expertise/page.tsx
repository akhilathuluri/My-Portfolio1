import { getPortfolioData } from '@/lib/portfolio-content';
import PageTransition from '@/components/page-transition';
import { Code2, Database, Wrench, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expertise',
  description: 'Technical expertise in frontend, backend, cloud, DevOps, and software delivery best practices.',
  alternates: {
    canonical: '/expertise',
  },
  openGraph: {
    title: 'Expertise | Athuluri Akhil',
    description: 'A structured overview of technical skills, engineering capabilities, and tool proficiency.',
    url: '/expertise',
    type: 'website',
  },
};

const icons = {
  "Frontend": Code2,
  "Backend": Database,
  "DevOps / Tools": Wrench,
  "Best Practices": CheckCircle,
};

export default async function Expertise() {
  const portfolioData = await getPortfolioData();

  return (
    <PageTransition className="pt-32 pb-16 px-6 max-w-5xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Expertise</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A comprehensive overview of my technical skills and areas of proficiency.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {portfolioData.expertise.map((category, i) => {
          const Icon = icons[category.category as keyof typeof icons] || Code2;
          return (
            <div key={i} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  <Icon size={24} />
                </div>
                <h2 className="text-2xl font-semibold">{category.category}</h2>
              </div>
              <p className="text-muted-foreground mb-8">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </PageTransition>
  );
}
