import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-6">
        <p
          className="text-8xl font-bold gradient-text mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </p>
        <h1
          className="text-2xl md:text-3xl font-semibold text-[var(--color-text)] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Page not found
        </h1>
        <p className="text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm transition-all hover:shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--color-grad-start), var(--color-grad-mid), var(--color-grad-end))",
            boxShadow: "0 0 30px var(--color-accent-glow)",
          }}
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
