"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/text-reveal";
import { Magnetic } from "@/components/ui/magnetic";

gsap.registerPlugin(ScrollTrigger);

const territories = [
  {
    name: "Production AI Systems",
    slug: "Production AI Systems",
    description:
      "The gap between a working prototype and a production system. Architecture, failure modes, and trade-offs.",
    count: 2,
  },
  {
    name: "Agentic Architecture",
    slug: "Agentic Architecture",
    description:
      "Multi-agent orchestration, Active Probing, context management. When agents help and when they don't.",
    count: 1,
  },
  {
    name: "AI in B2B",
    slug: "AI in B2B",
    description:
      "Building AI inside non-AI-native organizations. Data quality, legacy systems, stakeholder dynamics.",
    count: 1,
  },
  {
    name: "Operational Transformation",
    slug: "Operational Transformation",
    description:
      "Systems that change how teams work, not just automate what they already do.",
    count: 0,
  },
  {
    name: "Founding Engineer",
    slug: "Founding Engineer",
    description:
      "No playbook. High ownership. Building from zero inside an established company.",
    count: 1,
  },
];

export function TerritoriesSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((el, i) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
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
              Writing
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What I Think About
            </h2>
          </div>
        </ScrollReveal>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {territories.map((t, i) => {
            // Vary column spans for asymmetry
            const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-12"];
            const span = spans[i] || "md:col-span-6";

            return (
              <div
                key={t.name}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={span}
                style={{ opacity: 0 }}
              >
                <Magnetic strength={0.08}>
                  <Link href={`/blog?category=${encodeURIComponent(t.slug)}`}>
                    <div className="group relative p-6 md:p-8 rounded-2xl card-surface hover:border-[var(--color-accent)]/25 hover:-translate-y-0.5 overflow-hidden h-full">
                      {/* Left accent bar */}
                      <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-[var(--color-accent)]/20 group-hover:bg-[var(--color-accent)]/60 transition-all duration-500" />

                      {/* Hover glow */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[var(--color-accent)]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="relative z-10 pl-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                            {t.name}
                          </h3>
                          <ArrowRight
                            size={16}
                            className="text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-300"
                          />
                        </div>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                          {t.description}
                        </p>
                        <span className="text-xs font-mono text-[var(--color-text-faint)]">
                          {t.count > 0
                            ? `${t.count} article${t.count > 1 ? "s" : ""}`
                            : "Coming soon"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Magnetic>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
