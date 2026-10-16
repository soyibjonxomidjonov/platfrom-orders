import { HeroSection } from "@/components/home/HeroSection";
import { StatsStrip } from "@/components/home/StatsStrip";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { AIHelperSection } from "@/components/home/AIHelperSection";
import "@/styles/landing.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <StatsStrip />
      <HowItWorks />
      <CategoryShowcase />
      <FeaturedJobs />
      <AIHelperSection />
    </div>
  );
}

