import { getPortfolioData } from '@/lib/portfolio-content';
import PageTransition from '@/components/page-transition';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Athuluri Akhil, professional background, mission, and journey as a software engineer.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Athuluri Akhil',
    description: 'Professional background, mission, and career journey of Athuluri Akhil.',
    url: '/about',
    type: 'website',
  },
};

export default async function About() {
  const portfolioData = await getPortfolioData();

  return (
    <PageTransition className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
      <div className="space-y-16">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About Me</h1>
          <div className="text-lg md:text-xl text-muted-foreground leading-relaxed space-y-6">
            <p>{portfolioData.about.intro}</p>
            <p>{portfolioData.about.mission}</p>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {portfolioData.about.quickFacts.map((fact, i) => (
            <div key={i} className="bg-card border border-border p-6 rounded-2xl">
              <div className="text-sm font-mono text-muted-foreground mb-2">{fact.label}</div>
              <div className="text-xl font-medium">{fact.value}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-8">Journey</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {portfolioData.about.timeline.map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                </div>
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-foreground">{item.event}</div>
                  </div>
                  <div className="font-mono text-sm text-muted-foreground">{item.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
