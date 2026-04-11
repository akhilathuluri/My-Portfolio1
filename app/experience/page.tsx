import { getPortfolioData } from '@/lib/portfolio-content';
import PageTransition from '@/components/page-transition';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience, roles, achievements, and impact across engineering teams and products.',
  alternates: {
    canonical: '/experience',
  },
  openGraph: {
    title: 'Experience | Athuluri Akhil',
    description: 'Career history, accomplishments, and professional milestones.',
    url: '/experience',
    type: 'website',
  },
};

export default async function Experience() {
  const portfolioData = await getPortfolioData();

  return (
    <PageTransition className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Experience</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          My professional journey and the companies I&apos;ve had the pleasure to work with.
        </p>
      </div>

      <div className="space-y-12">
        {portfolioData.experience.map((job, i) => (
          <div key={i} className="relative pl-8 md:pl-0">
            <div className="md:grid md:grid-cols-4 md:gap-8 items-baseline">
              <div className="md:col-span-1 mb-2 md:mb-0">
                <div className="text-sm font-mono text-muted-foreground sticky top-24">
                  {job.duration}
                </div>
              </div>
              <div className="md:col-span-3 relative">
                {/* Timeline line for mobile */}
                <div className="absolute -left-8 top-2 bottom-0 w-px bg-border md:hidden" />
                {/* Timeline dot for mobile */}
                <div className="absolute -left-[37px] top-2 w-3 h-3 rounded-full bg-foreground md:hidden" />
                
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:border-foreground/20 transition-colors">
                  <h3 className="text-2xl font-bold mb-1">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground mb-6">
                    <span className="font-medium text-foreground">{job.company}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                  <ul className="space-y-3">
                    {job.achievements.map((achievement, j) => (
                      <li key={j} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
