"use client";

import React from "react";
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
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-black to-emerald-900 opacity-30 animate-pulse"></div>
       

        <div className="text-center relative z-10">
          <div className="mb-12">
            {/* Animated Logo GIF */}
            
          </div>
          <h1 className="hero__title">
              GEM 
             Talent {" "} <br />
              <span className="hero__title-accent">Management</span>
            </h1>

             <p className="hero__description">
              We build relationships. .
            </p>
            
             <Button
              size="lg"
              onClick={handleDiscoverClick}
              className="hero__cta-button"
            >
              Discover More
              <ArrowRight className="hero__cta-icon" />
            </Button>
        </div>
      </section>
  );
};

export default Hero;
