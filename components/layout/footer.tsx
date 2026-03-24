import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-grad-start), var(--color-grad-mid))",
                }}
              >
                A
              </div>
              <span className="font-semibold text-[var(--color-text)]">
                Anshit Chaturvedi
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xs">
              Lead AI Engineer building production AI systems for enterprise
              B2B workflows.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono font-medium text-[var(--color-text-faint)] uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono font-medium text-[var(--color-text-faint)] uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {[
                { href: siteConfig.links.github, icon: Github, label: "GitHub" },
                { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: siteConfig.links.email, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="p-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-all"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-text-faint)]">
            &copy; {new Date().getFullYear()} Anshit Chaturvedi
          </p>
          <p className="text-xs text-[var(--color-text-faint)]">
            Engineered with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
