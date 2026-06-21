import { portfolioData } from '@/lib/data';
import PageTransition from '@/components/page-transition';
import { Mail, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import ContactForm from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Athuluri Akhil for collaborations, opportunities, and software engineering discussions.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | Athuluri Akhil',
    description: 'Get in touch for projects, roles, and engineering collaboration.',
    url: '/contact',
    type: 'website',
  },
};

export default function Contact() {
  return (
    <PageTransition className="pt-32 pb-16 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Get in touch</h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium mb-1">Email</div>
                <a href={`mailto:${portfolioData.personal.email}`} className="text-foreground hover:underline font-mono">
                  {portfolioData.personal.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium mb-1">Location</div>
                <div className="text-foreground font-mono">
                  {portfolioData.personal.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Send a message</h2>
          <ContactForm />
        </div>
      </div>
    </PageTransition>
  );
}
