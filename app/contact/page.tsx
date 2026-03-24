"use client";

import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from "lucide-react";
import { CharReveal, ScrollReveal } from "@/components/ui/text-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import profile from "@/data/profile.json";

const contactLinks = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, description: "Best way to reach me for professional inquiries." },
  { label: "GitHub", value: "Anshit2723", href: profile.social.github, icon: Github, description: "Open-source projects and code samples." },
  { label: "LinkedIn", value: "anshit-chaturvedi", href: profile.social.linkedin, icon: Linkedin, description: "Professional network and career updates." },
];

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="inline-block mb-4 text-xs font-mono font-medium text-[var(--color-accent)] uppercase tracking-[0.2em]">
              Contact
            </span>
          </ScrollReveal>

          <CharReveal
            text="Let's connect"
            as="h1"
            className="text-4xl md:text-6xl font-bold text-[var(--color-text)] tracking-[-0.03em] mb-6"
            scrollTrigger
            stagger={0.04}
          />

          <ScrollReveal delay={0.3}>
            <p className="text-lg text-[var(--color-text-muted)] max-w-xl mx-auto">
              Whether you&apos;re looking for an AI engineer, have a project in mind, or
              just want to talk about production AI systems.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-muted)] mb-12">
            <MapPin size={14} className="text-[var(--color-accent)]" />
            {profile.location}
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {contactLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <ScrollReveal key={link.label} delay={0.3 + i * 0.1}>
                <Magnetic strength={0.05}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="group relative flex items-center gap-6 p-6 rounded-2xl card-surface hover:border-[var(--color-accent)]/30 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[var(--color-accent)]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />

                    <div className="relative z-10 flex items-center gap-6 w-full">
                      <div className="flex-shrink-0 p-3 rounded-xl bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/15 group-hover:bg-[var(--color-accent)]/12 transition-colors">
                        <Icon size={20} className="text-[var(--color-accent)]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-mono text-[var(--color-text-faint)] uppercase tracking-wider mb-1">{link.label}</h3>
                        <p className="text-lg font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors truncate">{link.value}</p>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">{link.description}</p>
                      </div>

                      <ArrowUpRight size={18} className="flex-shrink-0 text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </a>
                </Magnetic>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-16 text-center">
            <div className="p-8 rounded-2xl border border-[var(--color-accent)]/15 bg-[var(--color-accent)]/[0.03]">
              <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Open to Opportunities
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
                Particularly interested in roles building production AI systems at scale — in teams that value pragmatism over hype.
              </p>
              <Magnetic strength={0.15}>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm transition-all hover:shadow-lg"
                  style={{ background: "linear-gradient(135deg, var(--color-grad-start), var(--color-grad-mid), var(--color-grad-end))", boxShadow: "0 0 30px var(--color-accent-glow)" }}
                >
                  <Mail size={16} /> Send me an email
                </a>
              </Magnetic>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
