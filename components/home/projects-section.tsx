"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import projectsData from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

const featured = projectsData.projects.filter((p) => p.featured);

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header reveal
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    // Each project animates in
    projectRefs.current.forEach((el, i) => {
      if (!el) return;

      const content = el.querySelector(".project-content");
      const visual = el.querySelector(".project-visual");
      const techBadges = el.querySelectorAll(".tech-badge");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        content,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          visual,
          { opacity: 0, x: 40, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          techBadges,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.4"
        );
    });
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-20" style={{ opacity: 0 }}>
          <span className="inline-block mb-4 text-xs font-mono font-medium text-[var(--color-accent)] uppercase tracking-[0.2em]">
            Selected Work
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Projects
          </h2>
        </div>

        {/* Featured projects — stacked, full-width */}
        <div className="space-y-32 md:space-y-40">
          {featured.map((project, i) => (
            <div
              key={project.slug}
              ref={(el) => { projectRefs.current[i] = el; }}
              className="group"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                {/* Content */}
                <div className={`project-content space-y-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <span className="inline-block px-3 py-1 text-[10px] font-mono font-medium rounded-full bg-[var(--color-accent)]/8 text-[var(--color-accent)] border border-[var(--color-accent)]/15 uppercase tracking-[0.15em]">
                    {project.category}
                  </span>

                  <h3
                    className="text-3xl md:text-4xl font-bold text-[var(--color-text)] tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {project.longDescription}
                  </p>

                  {/* Impact metric */}
                  <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span className="text-sm font-mono text-[var(--color-accent)]">
                      {project.impact}
                    </span>
                  </div>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="tech-badge px-3 py-1.5 text-xs font-mono rounded-lg bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <Github size={15} /> Source
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <ExternalLink size={15} /> Live Demo
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      Case Study <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Visual */}
                <div className={`project-visual ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden card-surface group-hover:border-[var(--color-accent)]/20 hover:-translate-y-0.5">
                    {/* Abstract visual */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Gradient orb */}
                        <div
                          className="w-40 h-40 rounded-full opacity-20 blur-[60px] group-hover:opacity-30 transition-opacity duration-700"
                          style={{
                            background: `linear-gradient(135deg, var(--color-grad-start), var(--color-grad-end))`,
                          }}
                        />
                        {/* Project initials */}
                        <span
                          className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-[var(--color-accent)]/10 group-hover:text-[var(--color-accent)]/15 transition-colors duration-500"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {project.title
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </span>
                      </div>
                    </div>

                    {/* Subtle grid lines */}
                    <div className="absolute inset-0 opacity-[0.05]"
                      style={{
                        backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />

                    {/* Bottom gradient fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--color-bg-elevated)] to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-20 text-center">
          <Magnetic strength={0.1}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors group"
            >
              View all projects
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
