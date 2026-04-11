create table if not exists public.portfolio_sections (
  section_key text primary key,
  content jsonb not null,
  updated_at timestamptz not null default timezone('utc', now()),
  constraint portfolio_sections_allowed_keys check (
    section_key in ('about', 'expertise', 'experience', 'projects', 'blog')
  )
);

create or replace function public.set_updated_at_timestamp()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_portfolio_sections_updated_at on public.portfolio_sections;
create trigger trg_portfolio_sections_updated_at
before update on public.portfolio_sections
for each row
execute function public.set_updated_at_timestamp();

alter table public.portfolio_sections enable row level security;

drop policy if exists "No direct reads" on public.portfolio_sections;
create policy "No direct reads"
on public.portfolio_sections
for select
using (false);

drop policy if exists "No direct writes" on public.portfolio_sections;
create policy "No direct writes"
on public.portfolio_sections
for all
using (false)
with check (false);

insert into public.portfolio_sections (section_key, content)
values
  (
    'about',
    $$
    {
      "intro": "I'm a software engineer who bridges the gap between design and engineering. I specialize in building scalable frontend architectures and crafting polished user interfaces.",
      "mission": "My goal is to create digital experiences that feel intuitive, fast, and accessible. I believe that good code is easy to read, and great design is invisible.",
      "quickFacts": [
        { "label": "Experience", "value": "5+ Years" },
        { "label": "Focus", "value": "Frontend & UI/UX" },
        { "label": "Location", "value": "San Francisco" }
      ],
      "timeline": [
        { "year": "2023", "event": "Joined TechNova as Senior Frontend Engineer" },
        { "year": "2021", "event": "Promoted to Mid-Level Engineer at WebFlow Inc." },
        { "year": "2019", "event": "Started career as Junior Developer" },
        { "year": "2018", "event": "Graduated with BS in Computer Science" }
      ]
    }
    $$::jsonb
  ),
  (
    'expertise',
    $$
    [
      {
        "category": "Frontend",
        "skills": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"],
        "description": "Building responsive, accessible, and performant user interfaces."
      },
      {
        "category": "Backend",
        "skills": ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs"],
        "description": "Designing robust APIs and scalable database architectures."
      },
      {
        "category": "DevOps / Tools",
        "skills": ["Git", "Docker", "AWS", "Vercel", "CI/CD", "Jest"],
        "description": "Streamlining development workflows and deployment pipelines."
      },
      {
        "category": "Best Practices",
        "skills": ["Clean Code", "TDD", "Accessibility (a11y)", "Web Performance", "System Design"],
        "description": "Writing maintainable code and designing scalable systems."
      }
    ]
    $$::jsonb
  ),
  (
    'experience',
    $$
    [
      {
        "title": "Senior Frontend Engineer",
        "company": "TechNova",
        "location": "San Francisco, CA (Hybrid)",
        "duration": "2023 - Present",
        "achievements": [
          "Led the migration of a legacy SPA to Next.js, improving initial load time by 40%.",
          "Architected a reusable component library used by 5+ internal teams.",
          "Mentored junior engineers and established frontend testing standards."
        ]
      },
      {
        "title": "Frontend Engineer",
        "company": "WebFlow Inc.",
        "location": "Remote",
        "duration": "2021 - 2023",
        "achievements": [
          "Developed complex interactive features for the core editor using React and Redux.",
          "Collaborated closely with product designers to implement pixel-perfect UIs.",
          "Optimized rendering performance for large documents, achieving 60fps scrolling."
        ]
      },
      {
        "title": "Junior Web Developer",
        "company": "Digital Agency X",
        "location": "New York, NY",
        "duration": "2019 - 2021",
        "achievements": [
          "Built responsive marketing websites for diverse clients using modern HTML/CSS/JS.",
          "Integrated third-party APIs and CMS platforms (Contentful, Sanity).",
          "Participated in daily stand-ups and agile development processes."
        ]
      }
    ]
    $$::jsonb
  ),
  (
    'projects',
    $$
    [
      {
        "name": "Aura UI",
        "description": "A beautifully designed, accessible component library built with Radix UI and Tailwind CSS.",
        "tags": ["React", "Tailwind CSS", "Radix UI", "Storybook"],
        "impact": "Adopted by 10+ open-source projects.",
        "link": "https://github.com"
      },
      {
        "name": "Nexus Analytics",
        "description": "A real-time analytics dashboard for e-commerce platforms with custom data visualizations.",
        "tags": ["Next.js", "TypeScript", "D3.js", "Supabase"],
        "impact": "Processed over 1M events per day.",
        "link": "https://github.com"
      },
      {
        "name": "DevFlow",
        "description": "A developer-focused productivity tool that integrates with GitHub and Jira.",
        "tags": ["Electron", "React", "Node.js", "GraphQL"],
        "impact": "Featured on Product Hunt top 10.",
        "link": "https://github.com"
      },
      {
        "name": "Minimalist Blog Theme",
        "description": "A clean, typography-focused blog theme for Next.js and MDX.",
        "tags": ["Next.js", "MDX", "Tailwind CSS"],
        "impact": "1k+ downloads on NPM.",
        "link": "https://github.com"
      }
    ]
    $$::jsonb
  ),
  (
    'blog',
    $$
    [
      {
        "title": "The Art of Clean Architecture in Next.js",
        "date": "Oct 12, 2025",
        "excerpt": "How to structure your Next.js App Router projects for scalability and maintainability.",
        "readTime": "5 min read"
      },
      {
        "title": "Mastering Framer Motion for Subtle UI",
        "date": "Sep 28, 2025",
        "excerpt": "Adding delight to your interfaces without overwhelming the user.",
        "readTime": "7 min read"
      },
      {
        "title": "Why I Switched to Tailwind CSS v4",
        "date": "Aug 15, 2025",
        "excerpt": "Exploring the new features and performance improvements in the latest Tailwind release.",
        "readTime": "4 min read"
      }
    ]
    $$::jsonb
  )
on conflict (section_key)
do update
set content = excluded.content,
    updated_at = timezone('utc', now());
