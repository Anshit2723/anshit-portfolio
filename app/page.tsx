import { HeroSection } from "@/components/home/hero-section";
import { MetricsSection } from "@/components/home/metrics-section";
import { NarrativeSection } from "@/components/home/narrative-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { TerritoriesSection } from "@/components/home/territories-section";
import { TimelineSection } from "@/components/home/timeline-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MetricsSection />
      <NarrativeSection />
      <ProjectsSection />
      <TerritoriesSection />
      <TimelineSection />
      <CTASection />
    </>
  );
}
