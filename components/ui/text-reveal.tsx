"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Character-by-character reveal with mask.
 * Used for hero name and large display headings.
 */
export function CharReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.035,
  scrollTrigger = false,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  scrollTrigger?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const chars = el.querySelectorAll(".char");

    const tl = gsap.timeline({
      scrollTrigger: scrollTrigger
        ? {
            trigger: el,
            start: "top 85%",
            once: true,
          }
        : undefined,
      delay: scrollTrigger ? 0 : delay,
    });

    tl.fromTo(
      chars,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger,
        ease: "power4.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, [delay, stagger, scrollTrigger]);

  // Split text into characters, preserving spaces
  const chars = text.split("").map((char, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span className="char inline-block" style={{ opacity: 0 }}>
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>
      {chars}
    </Tag>
  );
}

/**
 * Line-by-line reveal with mask.
 * Used for narrative/body text that reveals as you scroll.
 */
export function LineReveal({
  children,
  className = "",
  stagger = 0.1,
}: {
  children: string;
  className?: string;
  stagger?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const lines = el.querySelectorAll(".line-inner");

    const anim = gsap.fromTo(
      lines,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, [stagger]);

  // Split by sentences for natural line breaks
  const sentences = children.split(". ").filter(Boolean);

  return (
    <div ref={containerRef} className={className}>
      {sentences.map((sentence, i) => (
        <span key={i} className="block overflow-hidden">
          <span className="line-inner block" style={{ opacity: 0 }}>
            {sentence}
            {i < sentences.length - 1 ? "." : ""}
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Word-by-word fade reveal.
 * Used for descriptions and subtitles.
 */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  scrollTrigger = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  scrollTrigger?: boolean;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const words = el.querySelectorAll(".word");

    const tl = gsap.timeline({
      scrollTrigger: scrollTrigger
        ? {
            trigger: el,
            start: "top 85%",
            once: true,
          }
        : undefined,
      delay: scrollTrigger ? 0 : delay,
    });

    tl.fromTo(
      words,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.025,
        ease: "power3.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, [delay, scrollTrigger]);

  const words = text.split(" ").map((word, i) => (
    <span key={i} className="word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
      {word}
    </span>
  ));

  return (
    <p ref={containerRef} className={className}>
      {words}
    </p>
  );
}

/**
 * Scroll-triggered fade-in for generic elements.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 40,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const anim = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
