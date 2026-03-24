"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Rocket, Briefcase, GraduationCap } from "lucide-react";
import { ScrollReveal } from "@/components/ui/text-reveal";
import experience from "@/data/experience.json";

gsap.registerPlugin(ScrollTrigger);

const typeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  promotion: Star,
  founding: Rocket,
  freelance: Briefcase,
  education: GraduationCap,
};

export function TimelineSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    // Animate the line drawing itself
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: line.parentElement,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      }
    );

    // Each entry reveals when line reaches it
    entriesRef.current.forEach((el, i) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
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
            <h2
              className="text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Experience
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Self-drawing line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px]">
            <div className="w-full h-full bg-[var(--color-border-subtle)]" />
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full h-full origin-top"
              style={{
                background: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-dim), transparent)",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* Entries */}
          <div className="space-y-16">
            {experience.timeline.map((entry, i) => {
              const Icon = typeIcons[entry.type] || Briefcase;
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  ref={(el) => { entriesRef.current[i] = el; }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                    isLeft ? "" : "md:direction-rtl"
                  }`}
                  style={{ opacity: 0 }}
                >
                  {/* Content */}
                  <div
                    className={`pl-12 md:pl-0 ${
                      isLeft
                        ? "md:pr-16 md:text-right"
                        : "md:pl-16 md:col-start-2 md:text-left"
                    }`}
                  >
                    <div
                      className={`p-6 rounded-2xl card-surface hover:border-[var(--color-accent)]/20 hover:-translate-y-0.5 ${
                        isLeft ? "" : "md:direction-ltr"
                      }`}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                        <div className="p-1.5 rounded-lg bg-[var(--color-accent)]/10">
                          <Icon size={14} className="text-[var(--color-accent)]" />
                        </div>
                        <span className="text-xs font-mono text-[var(--color-text-faint)]">
                          {entry.period}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">
                        {entry.role}
                      </h3>
                      <p className="text-sm font-medium text-[var(--color-accent-dim)] mb-3">
                        {entry.company}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">
                        {entry.description}
                      </p>

                      {entry.highlights.length > 0 && (
                        <ul className={`space-y-1.5 ${isLeft ? "md:text-right" : ""}`}>
                          {entry.highlights.map((h, j) => (
                            <li
                              key={j}
                              className={`flex items-start gap-2 text-xs text-[var(--color-text-muted)] ${
                                isLeft ? "md:flex-row-reverse" : ""
                              }`}
                            >
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent)]/40 flex-shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Empty column for the other side */}
                  {isLeft ? <div className="hidden md:block" /> : null}

                  {/* Dot on the line */}
                  <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-[var(--color-accent)] border-[3px] border-[var(--color-bg)]" />
                      {i === 0 && (
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-[var(--color-accent)] animate-ping opacity-30" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
