"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";
import { Magnetic } from "@/components/ui/magnetic";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text, chars]);

  return (
    <span
      className={`font-mono ${className}`}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border-subtle)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <Magnetic strength={0.2}>
              <div className="relative h-9 w-9 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--color-grad-start), var(--color-grad-mid))" }}>
                A
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40 blur-xl transition-opacity"
                  style={{ background: "linear-gradient(135deg, var(--color-grad-start), var(--color-grad-mid))" }} />
              </div>
            </Magnetic>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm transition-colors rounded-lg ${
                    isActive
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  <ScrambleText text={link.label} />
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[var(--color-accent)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-text-faint)] hover:text-[var(--color-text)] transition-colors"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-text-faint)] hover:text-[var(--color-text)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <ThemeToggle />
            <Magnetic strength={0.15}>
              <Link
                href="/contact"
                className="ml-2 px-5 py-2 text-sm font-medium rounded-lg text-white transition-all hover:opacity-90 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, var(--color-grad-start), var(--color-grad-mid), var(--color-grad-end))",
                  boxShadow: "0 0 20px var(--color-accent-glow)",
                }}
              >
                Get in Touch
              </Link>
            </Magnetic>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-xl pt-20 md:hidden">
          <div className="flex flex-col items-center gap-2 p-6">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-6 py-3 text-lg font-medium rounded-xl transition-colors ${
                    isActive
                      ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)]"
              >
                <Github size={20} />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)]"
              >
                <Linkedin size={20} />
              </a>
              <div className="p-1.5 rounded-xl bg-[var(--color-bg-elevated)]">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
