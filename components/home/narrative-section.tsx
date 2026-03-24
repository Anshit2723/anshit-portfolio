"use client";

import { LineReveal } from "@/components/ui/text-reveal";
import { ScrollReveal } from "@/components/ui/text-reveal";

export function NarrativeSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Divider */}
        <ScrollReveal>
          <div className="section-divider mb-20" />
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-block mb-6 text-xs font-mono font-medium text-[var(--color-accent)] uppercase tracking-[0.2em]">
              The Story
            </span>
          </ScrollReveal>

          <LineReveal
            className="text-xl md:text-2xl text-[var(--color-text-secondary)] leading-relaxed font-light"
            stagger={0.15}
          >
            Founding engineer of an enterprise AI Lab. Joined as a Research Associate — ten days later, the Lab was born. What followed was 13 production AI systems in one year, built by a 2-person team, inside a 450-person company that had never done AI. Five months in, I was presenting our systems to a major US enterprise client. The promotion to Lead AI Engineer was formal recognition of what I was already doing.
          </LineReveal>
        </div>
      </div>
    </section>
  );
}
