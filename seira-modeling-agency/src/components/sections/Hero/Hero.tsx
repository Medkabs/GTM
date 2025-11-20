"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import "./Hero.css";

interface HeroProps {
  className?: string;
  onDiscoverClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ className = "", onDiscoverClick }) => {
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const handleDiscoverClick = (): void => {
    onDiscoverClick?.();
    scrollToSection("about");
  };

  return (
    <section className="bg-black text-white py-16 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff] via-[#fff] to-[#fff] opacity-100 "></div>

      <div className="text-center relative z-10">
        <div className="mb-12">
          {/* Animated Logo GIF */}
          
        </div>
        <div className="hero__title-image">
          <Image src="/GTM.png" alt="GEM Talent Management" width={560} height={160} />
        </div>

        <p className="mt-6 text-lg max-w-2xl mx-auto">
          We build relationships.
        </p>

        <Button size="lg" onClick={handleDiscoverClick} className="mt-8 hero__cta-button">
          Discover More
          <ArrowRight className="hero__cta-icon" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
