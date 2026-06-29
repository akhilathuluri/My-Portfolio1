"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";
import PageTransition from "@/components/page-transition";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { type EditableSectionKey, type EditableSections } from "@/lib/portfolio-sections";

function emptySections(): EditableSections {
  return {
    about: {
      intro: "",
      mission: "",
      quickFacts: [],
      timeline: [],
    },
    expertise: [],
    experience: [],
    projects: [],
    blog: [
      {
        date: "Oct 12, 2025",
        readTime: "5 min read",
        title: "The Art of Clean Architecture in Next.js",
        excerpt: "How to structure your Next.js App Router projects for scalability and maintainability.",
        link: "https://example.com/article",
      },
    ],
  };
}

function parseCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function commaList(value: string[]) {
  return value.join(", ");
}

function normalizeSections(source: EditableSections | undefined): EditableSections {
  if (!source) {
    return emptySections();
  }

  return {
    about: {
      intro: source.about?.intro ?? "",
      mission: source.about?.mission ?? "",
      quickFacts: Array.isArray(source.about?.quickFacts)
        ? source.about.quickFacts.map((item) => ({
            label: item.label ?? "",
            value: item.value ?? "",
          }))
        : [],
      timeline: Array.isArray(source.about?.timeline)
        ? source.about.timeline.map((item) => ({
            year: item.year ?? "",
            event: item.event ?? "",
          }))
        : [],
    },
    expertise: Array.isArray(source.expertise)
      ? source.expertise.map((item) => ({
          category: item.category ?? "",
          description: item.description ?? "",
          skills: Array.isArray(item.skills) ? item.skills.filter(Boolean) : [],
        }))
      : [],
    experience: Array.isArray(source.experience)
      ? source.experience.map((item) => ({
          title: item.title ?? "",
          company: item.company ?? "",
          location: item.location ?? "",
          duration: item.duration ?? "",
          achievements: Array.isArray(item.achievements) ? item.achievements.filter(Boolean) : [],
        }))
      : [],
    projects: Array.isArray(source.projects)
      ? source.projects.map((item) => ({
          name: item.name ?? "",
          description: item.description ?? "",
          impact: item.impact ?? "",
          link: item.link ?? "",
          tags: Array.isArray(item.tags) ? item.tags.filter(Boolean) : [],
        }))
      : [],
    blog: [
      {
        date: source.blog?.[0]?.date ?? "Oct 12, 2025",
        readTime: source.blog?.[0]?.readTime ?? "5 min read",
        title: source.blog?.[0]?.title ?? "The Art of Clean Architecture in Next.js",
        excerpt:
          source.blog?.[0]?.excerpt ??
          "How to structure your Next.js App Router projects for scalability and maintainability.",
        link: source.blog?.[0]?.link ?? "https://example.com/article",
      },
    ],
  };
}

export default function AdminPanel() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingSections, setIsLoadingSections] = useState(false);
  const [authError, setAuthError] = useState("");
  const [serverError, setServerError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sections, setSections] = useState<EditableSections>(emptySections());
  const [saveState, setSaveState] = useState<Partial<Record<EditableSectionKey, string>>>({});

  const loadSections = useCallback(async (accessToken: string) => {
    setIsLoadingSections(true);
    setServerError("");

    const response = await fetch("/api/admin/content", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    const payload = (await response.json().catch(() => null)) as { error?: string; sections?: EditableSections } | null;

    if (!response.ok || !payload?.sections) {
      setServerError(payload?.error ?? "Unable to load content.");
      setIsLoadingSections(false);
      return;
    }

    setSections(normalizeSections(payload.sections));
    setIsLoadingSections(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) {
        return;
      }

      setSession(data.session ?? null);
      setIsLoadingAuth(false);

      if (data.session?.access_token) {
        void loadSections(data.session.access_token);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);

      if (nextSession?.access_token) {
        void loadSections(nextSession.access_token);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [loadSections, supabase]);

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    setServerError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
      return;
    }

    if (data.session?.access_token) {
      await loadSections(data.session.access_token);
    }

    setPassword("");
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setSession(null);
    setSections(emptySections());
    setSaveState({});
  }

  async function handleSave(section: EditableSectionKey) {
    if (!session?.access_token) {
      setServerError("Session expired. Please sign in again.");
      return;
    }

    setSaveState((prev) => ({ ...prev, [section]: "Saving..." }));

    const response = await fetch(`/api/admin/content/${section}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ content: sections[section] }),
    });

    const payload = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      setSaveState((prev) => ({ ...prev, [section]: payload?.error ?? "Save failed." }));
      return;
    }

    setSaveState((prev) => ({ ...prev, [section]: "Saved." }));
  }

  function updateAboutField(field: "intro" | "mission", value: string) {
    setSections((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value,
      },
    }));
  }

  function updateQuickFact(index: number, field: "label" | "value", value: string) {
    setSections((prev) => {
      const quickFacts = [...prev.about.quickFacts];
      quickFacts[index] = { ...quickFacts[index], [field]: value };

      return {
        ...prev,
        about: {
          ...prev.about,
          quickFacts,
        },
      };
    });
  }

  function addQuickFact() {
    setSections((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        quickFacts: [...prev.about.quickFacts, { label: "", value: "" }],
      },
    }));
  }

  function removeQuickFact(index: number) {
    setSections((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        quickFacts: prev.about.quickFacts.filter((_, itemIndex) => itemIndex !== index),
      },
    }));
  }

  function updateTimeline(index: number, field: "year" | "event", value: string) {
    setSections((prev) => {
      const timeline = [...prev.about.timeline];
      timeline[index] = { ...timeline[index], [field]: value };

      return {
        ...prev,
        about: {
          ...prev.about,
          timeline,
        },
      };
    });
  }

  function addTimelineItem() {
    setSections((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        timeline: [...prev.about.timeline, { year: "", event: "" }],
      },
    }));
  }

  function removeTimelineItem(index: number) {
    setSections((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        timeline: prev.about.timeline.filter((_, itemIndex) => itemIndex !== index),
      },
    }));
  }

  function updateExpertise(index: number, field: "category" | "description", value: string) {
    setSections((prev) => {
      const expertise = [...prev.expertise];
      expertise[index] = { ...expertise[index], [field]: value };
      return { ...prev, expertise };
    });
  }

  function updateExpertiseSkills(index: number, value: string) {
    setSections((prev) => {
      const expertise = [...prev.expertise];
      expertise[index] = { ...expertise[index], skills: parseCommaList(value) };
      return { ...prev, expertise };
    });
  }

  function addExpertiseItem() {
    setSections((prev) => ({
      ...prev,
      expertise: [...prev.expertise, { category: "", description: "", skills: [] }],
    }));
  }

  function removeExpertiseItem(index: number) {
    setSections((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function updateExperience(index: number, field: "title" | "company" | "location" | "duration", value: string) {
    setSections((prev) => {
      const experience = [...prev.experience];
      experience[index] = { ...experience[index], [field]: value };
      return { ...prev, experience };
    });
  }

  function updateExperienceAchievements(index: number, value: string) {
    setSections((prev) => {
      const experience = [...prev.experience];
      experience[index] = {
        ...experience[index],
        achievements: value
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      };
      return { ...prev, experience };
    });
  }

  function addExperienceItem() {
    setSections((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: "", company: "", location: "", duration: "", achievements: [] },
      ],
    }));
  }

  function removeExperienceItem(index: number) {
    setSections((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function updateProject(index: number, field: "name" | "description" | "impact" | "link", value: string) {
    setSections((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  }

  function updateProjectTags(index: number, value: string) {
    setSections((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], tags: parseCommaList(value) };
      return { ...prev, projects };
    });
  }

  function addProject() {
    setSections((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: "", description: "", tags: [], impact: "", link: "" }],
    }));
  }

  function removeProject(index: number) {
    setSections((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function updateBlogField(field: "date" | "readTime" | "title" | "excerpt" | "link", value: string) {
    setSections((prev) => {
      const current = prev.blog[0] ?? {
        date: "",
        readTime: "",
        title: "",
        excerpt: "",
        link: "",
      };

      return {
        ...prev,
        blog: [
          {
            ...current,
            [field]: value,
          },
        ],
      };
    });
  }

  if (isLoadingAuth) {
    return (
      <PageTransition className="pt-32 pb-16 px-6 max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8 text-center">Checking session...</div>
      </PageTransition>
    );
  }

  if (!session) {
    return (
      <PageTransition className="pt-32 pb-16 px-6 max-w-md mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Sign In</h1>
            <p className="text-muted-foreground mt-2">Sign in with your Supabase email and password.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {authError ? <p className="text-sm text-red-600">{authError}</p> : null}

            <button
              type="submit"
              className="w-full py-3 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="pt-32 pb-16 px-6 max-w-6xl mx-auto w-full">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">Manage About, Expertise, Experience, Projects, and Blog content.</p>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="px-5 py-2.5 border border-border rounded-xl hover:bg-muted transition-colors"
        >
          Sign Out
        </button>
      </div>

      {serverError ? (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">{serverError}</div>
      ) : null}

      {isLoadingSections ? <div className="mb-6 text-muted-foreground">Loading content...</div> : null}

      <div className="space-y-6">
        <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">About</h2>
            <button
              type="button"
              onClick={() => void handleSave("about")}
              className="px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Save About
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Intro</label>
            <textarea
              rows={4}
              value={sections.about.intro}
              onChange={(event) => updateAboutField("intro", event.target.value)}
              className="w-full rounded-xl border border-border bg-background p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mission</label>
            <textarea
              rows={4}
              value={sections.about.mission}
              onChange={(event) => updateAboutField("mission", event.target.value)}
              className="w-full rounded-xl border border-border bg-background p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">Quick Facts</h3>
              <button type="button" onClick={addQuickFact} className="px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors">
                Add Fact
              </button>
            </div>

            {sections.about.quickFacts.map((fact, index) => (
              <div key={index} className="grid md:grid-cols-[1fr_1fr_auto] gap-3 items-center">
                <input
                  value={fact.label}
                  onChange={(event) => updateQuickFact(index, "label", event.target.value)}
                  placeholder="Label"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <input
                  value={fact.value}
                  onChange={(event) => updateQuickFact(index, "value", event.target.value)}
                  placeholder="Value"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <button type="button" onClick={() => removeQuickFact(index)} className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">Timeline</h3>
              <button type="button" onClick={addTimelineItem} className="px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors">
                Add Item
              </button>
            </div>

            {sections.about.timeline.map((item, index) => (
              <div key={index} className="grid md:grid-cols-[180px_1fr_auto] gap-3 items-center">
                <input
                  value={item.year}
                  onChange={(event) => updateTimeline(index, "year", event.target.value)}
                  placeholder="Year"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <input
                  value={item.event}
                  onChange={(event) => updateTimeline(index, "event", event.target.value)}
                  placeholder="Event"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <button type="button" onClick={() => removeTimelineItem(index)} className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  Remove
                </button>
              </div>
            ))}
          </div>

          {saveState.about ? <p className="text-sm text-muted-foreground">{saveState.about}</p> : null}
        </section>

        <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">Expertise</h2>
            <div className="flex items-center gap-2">
              <button type="button" onClick={addExpertiseItem} className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                Add Category
              </button>
              <button
                type="button"
                onClick={() => void handleSave("expertise")}
                className="px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Save Expertise
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {sections.expertise.map((item, index) => (
              <div key={index} className="rounded-xl border border-border p-4 space-y-3">
                <div className="grid md:grid-cols-[1fr_auto] gap-3 items-center">
                  <input
                    value={item.category}
                    onChange={(event) => updateExpertise(index, "category", event.target.value)}
                    placeholder="Category"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <button type="button" onClick={() => removeExpertiseItem(index)} className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                    Remove
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(event) => updateExpertise(index, "description", event.target.value)}
                  placeholder="Description"
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />

                <input
                  value={commaList(item.skills)}
                  onChange={(event) => updateExpertiseSkills(index, event.target.value)}
                  placeholder="Skills (comma separated)"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            ))}
          </div>

          {saveState.expertise ? <p className="text-sm text-muted-foreground">{saveState.expertise}</p> : null}
        </section>

        <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">Experience</h2>
            <div className="flex items-center gap-2">
              <button type="button" onClick={addExperienceItem} className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                Add Role
              </button>
              <button
                type="button"
                onClick={() => void handleSave("experience")}
                className="px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Save Experience
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {sections.experience.map((item, index) => (
              <div key={index} className="rounded-xl border border-border p-4 space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    value={item.title}
                    onChange={(event) => updateExperience(index, "title", event.target.value)}
                    placeholder="Title"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <input
                    value={item.company}
                    onChange={(event) => updateExperience(index, "company", event.target.value)}
                    placeholder="Company"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="grid md:grid-cols-[1fr_220px_auto] gap-3 items-center">
                  <input
                    value={item.location}
                    onChange={(event) => updateExperience(index, "location", event.target.value)}
                    placeholder="Location"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <input
                    value={item.duration}
                    onChange={(event) => updateExperience(index, "duration", event.target.value)}
                    placeholder="Duration"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <button type="button" onClick={() => removeExperienceItem(index)} className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                    Remove
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={item.achievements.join("\n")}
                  onChange={(event) => updateExperienceAchievements(index, event.target.value)}
                  placeholder="Achievements (one per line)"
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            ))}
          </div>

          {saveState.experience ? <p className="text-sm text-muted-foreground">{saveState.experience}</p> : null}
        </section>

        <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <div className="flex items-center gap-2">
              <button type="button" onClick={addProject} className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                Add Project
              </button>
              <button
                type="button"
                onClick={() => void handleSave("projects")}
                className="px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Save Projects
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {sections.projects.map((item, index) => (
              <div key={index} className="rounded-xl border border-border p-4 space-y-3">
                <div className="grid md:grid-cols-[1fr_auto] gap-3 items-center">
                  <input
                    value={item.name}
                    onChange={(event) => updateProject(index, "name", event.target.value)}
                    placeholder="Project Name"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <button type="button" onClick={() => removeProject(index)} className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                    Remove
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(event) => updateProject(index, "description", event.target.value)}
                  placeholder="Description"
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />

                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    value={item.impact}
                    onChange={(event) => updateProject(index, "impact", event.target.value)}
                    placeholder="Impact"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <input
                    value={item.link}
                    onChange={(event) => updateProject(index, "link", event.target.value)}
                    placeholder="Link"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <input
                  value={commaList(item.tags)}
                  onChange={(event) => updateProjectTags(index, event.target.value)}
                  placeholder="Tags (comma separated)"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            ))}
          </div>

          {saveState.projects ? <p className="text-sm text-muted-foreground">{saveState.projects}</p> : null}
        </section>

        <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-xl text-center space-y-4">
            <h2 className="text-2xl font-semibold">Blog Management Moved</h2>
            <p className="text-muted-foreground max-w-md">
              The blog system has been upgraded to support full markdown editing and native article rendering. 
              Click below to manage your blogs.
            </p>
            <Link
              href="/admin/blogs"
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Open Blog Manager
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
