import PageTransition from '@/components/page-transition';
import ScrambleText from '@/components/scramble-text';
import SocialIcons from '@/components/social-icons';
import type { Metadata } from 'next';
import { portfolioData } from '@/lib/data';

const homeSocialLinks = {
  github: portfolioData.personal.socials.github,
  linkedin: portfolioData.personal.socials.linkedin,
  twitter: portfolioData.personal.socials.twitter,
  youtube: 'https://www.youtube.com/@AkhilTechChannel',
  resume: 'https://qmxpdckcbagzkqufpbkh.supabase.co/storage/v1/object/public/portfolio/items/Athuluri_Akhil_Resume.pdf',
};

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <PageTransition className="px-6 max-w-7xl mx-auto w-full flex items-center justify-center">
      {/* Hero Section */}
      <section className="w-full flex items-center justify-center relative pt-10 md:pt-16">

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-accent/50 rounded-full blur-2xl -z-10" />

        <div className="space-y-6 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            <ScrambleText
              text="Athuluri Akhil"
              className="block"
              duration={2200}
              stepMs={55}
            />
            <ScrambleText
              text="Software Engineer."
              className="block text-muted-foreground whitespace-nowrap text-[2.1rem] sm:text-5xl md:text-6xl font-medium"
              startDelay={350}
              duration={2000}
              stepMs={55}
            />
          </h1>

          <SocialIcons links={homeSocialLinks} className="pt-2" />
        </div>
      </section>
    </PageTransition>
  );
}