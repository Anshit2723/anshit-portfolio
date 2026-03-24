"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { CharReveal, ScrollReveal } from "@/components/ui/text-reveal";
import { Magnetic } from "@/components/ui/magnetic";

gsap.registerPlugin(ScrollTrigger);

const links = [
  {
    label: "Email",
    value: "chaturvedi.anshit@gmail.com",
    href: "mailto:chaturvedi.anshit@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "Anshit2723",
    href: "https://github.com/Anshit2723",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "anshit-chaturvedi",
    href: "https://www.linkedin.com/in/anshit-chaturvedi/",
    icon: Linkedin,
  },
];

export function CTASection() {
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    linksRef.current.forEach((el, i) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="section-divider mb-20" />
        </ScrollReveal>

        <div className="max-w-2xl mx-auto text-center mb-16">
          <CharReveal
            text="Let's build something."
            as="h2"
            className="text-4xl md:text-6xl font-bold text-[var(--color-text)] tracking-[-0.03em] mb-6"
            scrollTrigger
            stagger={0.03}
          />
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
              Interested in production AI systems, challenging engineering
              problems, or teams that value pragmatism over hype.
            </p>
          </ScrollReveal>
        </div>

        {/* Contact links as horizontal bars */}
        <div className="max-w-xl mx-auto space-y-3">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <Magnetic key={link.label} strength={0.05}>
                <a
                  ref={(el) => { linksRef.current[i] = el; }}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="group relative flex items-center gap-5 p-5 rounded-xl card-surface hover:border-[var(--color-accent)]/30 overflow-hidden"
                  style={{ opacity: 0 }}
                >
                  {/* Slide-in fill on hover */}
                  <div className="absolute inset-0 bg-[var(--color-accent)]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />

                  <div className="relative z-10 flex items-center gap-5 w-full">
                    <Icon
                      size={18}
                      className="text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] transition-colors flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-mono text-[var(--color-text-faint)] uppercase tracking-wider">
                        {link.label}
                      </span>
                      <p className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                        {link.value}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                    />
                  </div>
                </a>
              </Magnetic>
            );
          })}
        </div>
      </div>
    </section>
  );
}
