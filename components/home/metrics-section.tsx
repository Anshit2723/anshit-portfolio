"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "@/data/profile.json";

gsap.registerPlugin(ScrollTrigger);

export function MetricsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    metricsRef.current.forEach((el, i) => {
      if (!el) return;

      const valueEl = el.querySelector(".metric-value");
      const labelEl = el.querySelector(".metric-label");
      const glowEl = el.querySelector(".metric-glow");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          once: true,
        },
        delay: i * 0.15,
      });

      // Numeric values get a counter effect, text values get a slide-up
      const value = profile.metrics[i]?.value || "";
      const isNumeric = /^\d/.test(value);

      if (isNumeric && valueEl) {
        // Extract the number for counter animation
        const numMatch = value.match(/(\d+)/);
        const targetNum = numMatch ? parseInt(numMatch[1]) : 0;
        const suffix = value.replace(/^\d+/, ""); // e.g., "+" or "%"

        const counter = { val: 0 };
        tl.fromTo(
          valueEl,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            onStart: () => {
              gsap.to(counter, {
                val: targetNum,
                duration: 1.2,
                ease: "power2.out",
                onUpdate: () => {
                  if (valueEl) {
                    (valueEl as HTMLElement).textContent = Math.round(counter.val) + suffix;
                  }
                },
              });
            },
          }
        );
      } else {
        // Text values: simple fade + slide up
        tl.fromTo(
          valueEl,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }

      tl.fromTo(
        labelEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.4"
      );

      // Glow pulse
      tl.fromTo(
        glowEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
        "-=0.5"
      ).to(glowEl, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
      });
    });
  }, []);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={containerRef}
          className="flex flex-wrap justify-center gap-12 md:gap-16 lg:gap-20"
        >
          {profile.metrics.map((metric, i) => (
            <div
              key={metric.label}
              ref={(el) => { metricsRef.current[i] = el; }}
              className="relative text-center"
            >
              {/* Glow pulse behind number */}
              <div
                className="metric-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full opacity-0"
                style={{ background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)" }}
              />

              <div
                className="metric-value relative text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] mb-3 gradient-text"
                style={{ fontFamily: "var(--font-display)", opacity: 0 }}
              >
                {metric.value}
              </div>
              <div
                className="metric-label text-xs font-mono text-[var(--color-text-faint)] uppercase tracking-[0.15em] max-w-[180px]"
                style={{ opacity: 0 }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
