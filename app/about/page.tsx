"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  Code,
  Cloud,
  BarChart3,
  Briefcase,
  GraduationCap,
  Rocket,
  Star,
} from "lucide-react";
import { CharReveal, WordReveal, ScrollReveal, LineReveal } from "@/components/ui/text-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import profile from "@/data/profile.json";
import skills from "@/data/skills.json";
import experience from "@/data/experience.json";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain, Code, Cloud, BarChart: BarChart3,
};

const typeIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  promotion: Star, founding: Rocket, freelance: Briefcase, education: GraduationCap,
};

export default function AboutPage() {
  const skillCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    skillCardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <ScrollReveal>
                <span className="inline-block mb-4 text-xs font-mono font-medium text-[var(--color-accent)] uppercase tracking-[0.2em]">
                  About
                </span>
              </ScrollReveal>

              <CharReveal
                text="Building AI systems that teams depend on"
                as="h1"
                className="text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-[-0.03em] mb-10"
                scrollTrigger
                stagger={0.02}
              />

              <div className="space-y-6">
                <LineReveal className="text-lg text-[var(--color-text-secondary)] leading-relaxed" stagger={0.12}>
                  I&apos;m Anshit Chaturvedi, a Lead AI Engineer and founding member of an enterprise AI Lab. I build production-grade agentic systems, conversational AI, and automation pipelines for B2B workflows.
                </LineReveal>

                <ScrollReveal delay={0.2}>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    When I joined Phronesis Partners as a Research Associate in January 2024,
                    the company had no AI capabilities. Ten days later, the AI Lab was
                    established — and I became its founding engineer. What followed was an
                    intensive year of building: 13+ production AI systems, from conversational
                    agents with active probing logic to multi-agent pipelines that compressed
                    48-hour manual processes to 15 minutes.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    My approach is grounded in pragmatism. I think in systems, not features.
                    Every architecture decision starts with &ldquo;what happens when this
                    breaks?&rdquo; and &ldquo;can a non-technical team member use this
                    without me?&rdquo;
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* Highlights sidebar */}
            <div className="lg:col-span-2">
              <div className="space-y-3">
                {profile.highlights.map((highlight, i) => (
                  <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                    <div className="p-4 rounded-xl card-surface hover:border-[var(--color-accent)]/20 hover:-translate-y-0.5">
                      <p className="text-sm text-[var(--color-text-secondary)]">{highlight}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="section-divider mb-20" />
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-16">
              <span className="inline-block mb-4 text-xs font-mono font-medium text-[var(--color-accent)] uppercase tracking-[0.2em]">
                Technical
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                Skills & Stack
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skills.categories.map((category, i) => {
              const Icon = iconMap[category.icon] || Brain;
              return (
                <div
                  key={category.name}
                  ref={(el) => { skillCardsRef.current[i] = el; }}
                  style={{ opacity: 0 }}
                >
                  <Magnetic strength={0.05}>
                    <div className="group p-7 rounded-2xl card-surface hover:border-[var(--color-accent)]/20 hover:-translate-y-0.5 h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-2.5 rounded-xl bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/15 group-hover:bg-[var(--color-accent)]/12 transition-colors">
                          <Icon size={20} className="text-[var(--color-accent)]" />
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--color-text)]">{category.name}</h3>
                      </div>

                      <div className="space-y-2.5 mb-6">
                        {category.skills.map((skill) => (
                          <div key={skill} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]/40" />
                            {skill}
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-[var(--color-border-subtle)]">
                        <p className="text-[10px] font-mono text-[var(--color-text-faint)] uppercase tracking-[0.15em] mb-3">
                          Tools
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {category.tools.map((tool) => (
                            <span key={tool} className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Magnetic>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="section-divider mb-20" />
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-16">
              <span className="inline-block mb-4 text-xs font-mono font-medium text-[var(--color-accent)] uppercase tracking-[0.2em]">
                Career
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                Experience
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {experience.timeline.map((entry, i) => {
              const Icon = typeIconMap[entry.type] || Briefcase;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="p-6 rounded-2xl card-surface hover:border-[var(--color-accent)]/20 hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-1.5 rounded-lg bg-[var(--color-accent)]/10">
                        <Icon size={14} className="text-[var(--color-accent)]" />
                      </div>
                      <span className="text-xs font-mono text-[var(--color-text-faint)]">{entry.period}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">{entry.role}</h3>
                    <p className="text-sm font-medium text-[var(--color-accent-dim)] mb-3">{entry.company}</p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{entry.description}</p>
                    {entry.highlights.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {entry.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent)]/40 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
