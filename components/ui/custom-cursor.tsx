"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Quick-to for smooth following
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });
    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
    };

    const handleMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);

      const text = target.getAttribute("data-cursor-text");
      if (text) setCursorText(text);

      gsap.to(cursor, {
        scale: 4,
        opacity: 0.15,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.3, ease: "power3.out" });
    };

    const handleMouseLeaveInteractive = () => {
      setIsHovering(false);
      setCursorText("");
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    // Observe interactive elements
    const interactives = document.querySelectorAll(
      'a, button, [role="button"], [data-cursor]'
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll(
        'a, button, [role="button"], [data-cursor]'
      );
      newInteractives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [isVisible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 40,
          height: 40,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        <div
          className="w-full h-full rounded-full border border-[var(--color-accent)]/40 flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isHovering
              ? "var(--color-accent-glow)"
              : "transparent",
          }}
        >
          {cursorText && (
            <span className="text-[8px] font-mono font-medium text-[var(--color-accent)] uppercase tracking-wider">
              {cursorText}
            </span>
          )}
        </div>
      </div>
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 6,
          height: 6,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        <div className="w-full h-full rounded-full bg-[var(--color-accent)]" />
      </div>
    </>
  );
}
