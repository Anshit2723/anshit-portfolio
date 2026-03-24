"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        onComplete();
      },
    });

    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
    )
      .to(logoRef.current, {
        boxShadow: "0 0 40px rgba(184, 134, 11, 0.3), 0 0 80px rgba(184, 134, 11, 0.1)",
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(logoRef.current, {
        boxShadow: "0 0 0px rgba(184, 134, 11, 0), 0 0 0px rgba(184, 134, 11, 0)",
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.1,
      })
      .to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.6,
          ease: "power4.inOut",
        },
        "-=0.1"
      );
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--color-bg)]"
    >
      <div
        ref={logoRef}
        className="w-14 h-14 rounded-xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, var(--color-grad-start), var(--color-grad-mid), var(--color-grad-end))",
          opacity: 0,
        }}
      >
        <span className="text-white font-bold text-xl font-[var(--font-display)]">
          A
        </span>
      </div>
    </div>
  );
}
