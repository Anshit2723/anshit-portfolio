"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { CharReveal, ScrollReveal } from "@/components/ui/text-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { blogCategories } from "@/lib/constants";

const posts = [
  {
    slug: "building-production-ai-systems",
    title: "What I Learned Building 13 Production AI Systems in One Year",
    date: "2026-03-15",
    category: "Production AI Systems",
    readingTime: "8 min read",
    excerpt:
      "The gap between a working prototype and a production AI system is enormous. Here are the patterns that survived contact with reality.",
  },
  {
    slug: "active-probing-pattern",
    title: "Active Probing: Making AI Conversations Actually Useful",
    date: "2026-03-10",
    category: "Agentic Architecture",
    readingTime: "6 min read",
    excerpt:
      "Most conversational AI answers questions. Active Probing makes AI ask the right questions — and the difference in output quality is dramatic.",
  },
  {
    slug: "founding-ai-engineer",
    title: "No Playbook: Being the Founding Engineer of an AI Lab",
    date: "2026-03-05",
    category: "Founding Engineer",
    readingTime: "7 min read",
    excerpt:
      "When the AI Lab was created 10 days after I joined, there was no team, no infrastructure, no roadmap. Here's what building from zero actually looks like.",
  },
  {
    slug: "multi-agent-pipelines-lessons",
    title: "Multi-Agent Pipelines: What Works and What Doesn't",
    date: "2026-02-28",
    category: "Agentic Architecture",
    readingTime: "10 min read",
    excerpt:
      "After building several production multi-agent systems, here are the hard-won lessons about orchestration, error handling, and knowing when agents are overkill.",
  },
  {
    slug: "ai-adoption-b2b",
    title: "Why AI Adoption Fails in Non-AI-Native Companies",
    date: "2026-02-20",
    category: "AI in B2B",
    readingTime: "5 min read",
    excerpt:
      "The technical challenges are the easy part. The real barriers are organizational: data quality, legacy processes, and stakeholders who need to see it to believe it.",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const listRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll(".blog-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }
    );
  }, [activeCategory]);

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <span className="inline-block mb-4 text-xs font-mono font-medium text-[var(--color-accent)] uppercase tracking-[0.2em]">
            Writing
          </span>
        </ScrollReveal>

        <CharReveal
          text="Thinking Out Loud"
          as="h1"
          className="text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-[-0.03em] mb-4"
          scrollTrigger
          stagger={0.03}
        />

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-[var(--color-text-muted)] mb-12 max-w-xl">
            Lessons from building production AI systems — not theory, not
            tutorials, just what actually works.
          </p>
        </ScrollReveal>

        {/* Category filter */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-2 mb-12">
            {blogCategories.map((cat) => (
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

        {/* Posts list */}
        <div ref={listRef} className="space-y-3">
          {filtered.map((post) => (
            <Magnetic key={post.slug} strength={0.04}>
              <Link href={`/blog/${post.slug}`} className="blog-card block group">
                <article className="relative p-6 rounded-2xl card-surface hover:border-[var(--color-accent)]/25 overflow-hidden">
                  {/* Slide-in fill */}
                  <div className="absolute inset-0 bg-[var(--color-accent)]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="px-3 py-1 text-[10px] font-mono font-medium rounded-full bg-[var(--color-accent)]/8 text-[var(--color-accent)] border border-[var(--color-accent)]/15 uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[var(--color-text-faint)]">
                          <Calendar size={11} />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[var(--color-text-faint)]">
                          <Clock size={11} />
                          {post.readingTime}
                        </span>
                      </div>
                      <h3
                        className="text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mb-1"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="flex-shrink-0 text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                </article>
              </Link>
            </Magnetic>
          ))}
        </div>

        {filtered.length === 0 && (
          <ScrollReveal>
            <div className="text-center py-20">
              <p className="text-[var(--color-text-muted)]">
                No posts in this category yet. Check back soon.
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
