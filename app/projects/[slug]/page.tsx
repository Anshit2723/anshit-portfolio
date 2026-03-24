import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import projectsData from "@/data/projects.json";

export function generateStaticParams() {
  return projectsData.projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to projects
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="inline-block mb-4 px-3 py-1 text-[10px] font-mono font-medium rounded-full bg-[var(--color-accent)]/8 text-[var(--color-accent)] border border-[var(--color-accent)]/15 uppercase tracking-wider">
            {project.category}
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-[var(--color-text)] mb-6 tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
            {project.longDescription}
          </p>

          {/* Links */}
          <div className="flex gap-3 mt-8">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)] transition-all"
              >
                <Github size={16} />
                View Source
                <ArrowUpRight size={12} className="opacity-50" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl text-white transition-all hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, var(--color-grad-start), var(--color-grad-mid), var(--color-grad-end))",
                  boxShadow: "0 0 30px var(--color-accent-glow)",
                }}
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Impact */}
        <div className="mb-12 p-6 rounded-2xl border border-[var(--color-accent)]/15 bg-[var(--color-accent)]/[0.03]">
          <h3 className="text-[10px] font-mono font-medium text-[var(--color-text-faint)] uppercase tracking-[0.15em] mb-3">
            Impact
          </h3>
          <p className="text-xl font-semibold text-[var(--color-accent)]" style={{ fontFamily: "var(--font-display)" }}>
            {project.impact}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h3 className="text-[10px] font-mono font-medium text-[var(--color-text-faint)] uppercase tracking-[0.15em] mb-4">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 text-sm font-mono rounded-xl bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent mb-12" />

        {/* Placeholder for MDX content */}
        <div className="prose max-w-none">
          <h2
            className="text-2xl font-semibold text-[var(--color-text)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Overview
          </h2>
          <div className="p-6 rounded-2xl border border-[var(--color-accent)]/15 bg-[var(--color-accent)]/[0.03]">
            <p className="text-sm text-[var(--color-text-muted)] italic">
              Detailed case study content will be added here as MDX. This page
              will include architecture diagrams, technical deep-dives, and
              lessons learned.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
