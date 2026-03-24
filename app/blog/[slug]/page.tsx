import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const posts: Record<
  string,
  {
    title: string;
    date: string;
    category: string;
    readingTime: string;
    content: string;
  }
> = {
  "building-production-ai-systems": {
    title: "What I Learned Building 13 Production AI Systems in One Year",
    date: "2026-03-15",
    category: "Production AI Systems",
    readingTime: "8 min read",
    content:
      "Full article content will go here as MDX. This post will cover the patterns, anti-patterns, and hard-won lessons from building production AI systems inside a non-AI-native organization.",
  },
  "active-probing-pattern": {
    title: "Active Probing: Making AI Conversations Actually Useful",
    date: "2026-03-10",
    category: "Agentic Architecture",
    readingTime: "6 min read",
    content:
      "Full article content will go here as MDX. This post will explain the Active Probing pattern — how to make conversational AI systems ask clarifying questions instead of guessing.",
  },
  "founding-ai-engineer": {
    title: "No Playbook: Being the Founding Engineer of an AI Lab",
    date: "2026-03-05",
    category: "Founding Engineer",
    readingTime: "7 min read",
    content:
      "Full article content will go here as MDX. This post will share the experience of building an AI Lab from scratch inside an established company.",
  },
  "multi-agent-pipelines-lessons": {
    title: "Multi-Agent Pipelines: What Works and What Doesn't",
    date: "2026-02-28",
    category: "Agentic Architecture",
    readingTime: "10 min read",
    content:
      "Full article content will go here as MDX. This post will cover orchestration patterns, error handling strategies, and when multi-agent architectures are overkill.",
  },
  "ai-adoption-b2b": {
    title: "Why AI Adoption Fails in Non-AI-Native Companies",
    date: "2026-02-20",
    category: "AI in B2B",
    readingTime: "5 min read",
    content:
      "Full article content will go here as MDX. This post will analyze the organizational barriers to AI adoption in traditional B2B companies.",
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <article className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to writing
        </Link>

        {/* Header */}
        <header className="mb-12">
          <span className="inline-block mb-4 px-3 py-1 text-[10px] font-mono font-medium rounded-full bg-[var(--color-accent)]/8 text-[var(--color-accent)] border border-[var(--color-accent)]/15 uppercase tracking-wider">
            {post.category}
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[var(--color-text-faint)]">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[var(--color-accent)]" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-text-faint)]/40" />
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[var(--color-accent)]" />
              {post.readingTime}
            </span>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent mb-12" />

        {/* Content */}
        <div className="prose max-w-none">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">{post.content}</p>
          <div className="mt-8 p-6 rounded-2xl border border-[var(--color-accent)]/15 bg-[var(--color-accent)]/[0.03]">
            <p className="text-sm text-[var(--color-text-muted)] italic">
              This article is coming soon. The blog infrastructure is ready — full
              MDX content with code examples, architecture diagrams, and
              interactive components will be published here.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
