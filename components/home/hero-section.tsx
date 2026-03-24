"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { CharReveal, WordReveal } from "@/components/ui/text-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import profile from "@/data/profile.json";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const orbsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.2 });

    // Badge fade in
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      0
    );

    // CTAs
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      0.8
    );

    // Profile image
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.2
      );
    }

    // Scroll indicator
    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1.2
    );

    // Orb ambient movement + mouse parallax
    if (orbsRef.current) {
      const orbs = orbsRef.current.children;
      const orbQuickTos: { x: gsap.QuickToFunc; y: gsap.QuickToFunc }[] = [];

      Array.from(orbs).forEach((orb, i) => {
        gsap.to(orb, {
          x: `random(-60, 60)`,
          y: `random(-60, 60)`,
          scale: `random(0.9, 1.15)`,
          duration: `random(15, 25)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 2,
        });

        orbQuickTos.push({
          x: gsap.quickTo(orb, "x", { duration: 1.5, ease: "power2" }),
          y: gsap.quickTo(orb, "y", { duration: 1.5, ease: "power2" }),
        });
      });

      const handleMouseMove = (e: MouseEvent) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (e.clientX - centerX) * 0.02;
        const offsetY = (e.clientY - centerY) * 0.02;

        orbQuickTos.forEach((qt, i) => {
          qt.x(offsetX * (i + 1));
          qt.y(offsetY * (i + 1));
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Image parallax on scroll
      if (imageRef.current) {
        ScrollTrigger.create({
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            if (imageRef.current) {
              gsap.set(imageRef.current, {
                y: self.progress * 40 - 20,
              });
            }
          },
        });
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background orbs — warm gold, very subtle on light */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.045] blur-[120px]"
          style={{ background: "var(--color-accent-dim)" }}
        />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.035] blur-[100px]"
          style={{ background: "var(--color-accent)" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.025] blur-[80px]"
          style={{ background: "var(--color-accent-bright)" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left column — content */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* Status badge */}
            <div ref={badgeRef} className="mb-10" style={{ opacity: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400">
                  Open to opportunities
                </span>
              </div>
            </div>

            {/* Name — character reveal */}
            <CharReveal
              text="Anshit Chaturvedi"
              as="h1"
              className="text-[clamp(2.75rem,7vw,6rem)] font-bold tracking-[-0.04em] text-[var(--color-text)] leading-[0.95] mb-6 [text-wrap:balance]"
              delay={0.3}
              stagger={0.04}
            />

            {/* Value headline — scale-first */}
            <WordReveal
              text={profile.tagline}
              className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed mb-10"
              delay={1.0}
            />

            {/* CTA + credential */}
            <div ref={ctaRef} style={{ opacity: 0 }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
                <Magnetic strength={0.15}>
                  <Link
                    href="#work"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-medium text-sm transition-all hover:shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, var(--color-grad-start), var(--color-grad-mid), var(--color-grad-end))",
                      boxShadow: "0 0 30px var(--color-accent-glow)",
                    }}
                  >
                    See my work
                    <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
                  </Link>
                </Magnetic>
                <Link
                  href="/about"
                  className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  About me &rarr;
                </Link>
              </div>
              <p className="text-xs font-mono text-[var(--color-text-faint)] tracking-wide">
                Lead AI Engineer at Phronesis Partners &middot; Founding engineer of their AI Lab
              </p>
            </div>
          </div>

          {/* Right column — profile image */}
          <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative"
              style={{ opacity: 0 }}
            >
              {/* Gold glow behind image */}
              <div
                className="absolute -inset-8 rounded-3xl blur-3xl opacity-[0.06]"
                style={{ background: "var(--color-accent)" }}
              />

              {/* Image container */}
              <div className="relative w-56 h-68 sm:w-64 sm:h-80 lg:w-72 lg:h-[360px] rounded-2xl overflow-hidden card-surface">
                {!imgError ? (
                  <Image
                    src="/images/profile/headshot.jpg"
                    alt="Anshit Chaturvedi"
                    fill
                    className="object-cover"
                    priority
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--color-bg-hover)]">
                    <span
                      className="text-6xl font-bold gradient-text"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      A
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ opacity: 0 }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono text-[var(--color-text-faint)] uppercase tracking-[0.2em]">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-text-faint)] to-transparent overflow-hidden">
            <div className="w-full h-full bg-[var(--color-accent)] animate-[slideDown_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
