"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { CharReveal, ScrollReveal } from "@/components/ui/text-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import projectsData from "@/data/projects.json";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All"
      ? projectsData.projects
      : projectsData.projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }
    );
  }, [activeCategory]);

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <span className="inline-block mb-4 text-xs font-mono font-medium text-[var(--color-accent)] uppercase tracking-[0.2em]">
            Portfolio
          </span>
        </ScrollReveal>

        <CharReveal
          text="All Projects"
          as="h1"
          className="text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-[-0.03em] mb-4"
          scrollTrigger
          stagger={0.03}
        />

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-[var(--color-text-muted)] mb-12 max-w-xl">
            Production AI systems, open-source tools, and client work.
          </p>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-2 mb-12">
            {projectsData.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-mono rounded-lg transition-all duration-300 ${
                  activeCategory === cat
                    ? "text-white bg-[var(--color-accent)]"
                    : "text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)]/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((project) => (
            <Magnetic key={project.slug} strength={0.04}>
              <Link href={`/projects/${project.slug}`} className="project-card block group">
                <div className="relative h-full rounded-2xl card-surface overflow-hidden hover:border-[var(--color-accent)]/25 hover:-translate-y-0.5">
                  {/* Visual header */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg)]" />
                    <div className="absolute inset-0 opacity-[0.05]"
                      style={{ backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-bold text-[var(--color-accent)]/[0.06] group-hover:text-[var(--color-accent)]/10 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                        {project.title.split(" ").map((w) => w[0]).join("")}
                      </span>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-[10px] font-mono font-medium rounded-full bg-[var(--color-accent)]/8 text-[var(--color-accent)] border border-[var(--color-accent)]/15 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-[var(--color-bg)]/80 backdrop-blur-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                          <Github size={14} />
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-[var(--color-bg)]/80 backdrop-blur-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                        {project.title}
                      </h3>
                      <ArrowUpRight size={18} className="flex-shrink-0 text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </div>

                    <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">{project.description}</p>

                    <div className="mb-4 px-3 py-2 rounded-lg bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/10">
                      <p className="text-xs font-mono text-[var(--color-accent)]">{project.impact}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-xs font-mono rounded-md bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
}
