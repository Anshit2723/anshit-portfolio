"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Preloader } from "@/components/ui/preloader";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SmoothScrollProvider>
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
        <CustomCursor />
        <ScrollProgress />
        <div className="ambient-bg" />
        <div className="noise-overlay" />
        <Navbar />
        <main className={`pt-16 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          {children}
        </main>
        <Footer />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
