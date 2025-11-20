"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import "./Hero.css";

interface HeroProps {
  className?: string;
  onDiscoverClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ className = "", onDiscoverClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoRef.current!.muted = true;
          videoRef.current!.play();
        });
      }
    }
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDiscoverClick = (): void => {
    onDiscoverClick?.();
    scrollToSection("about");
  };

  return (
    <section className={`hero ${className}`} style={{ backgroundColor: "white" }}>
      {/* Removed background video */}

      {/* Content */}
      <div className="hero__content">
        <div className="hero__container">
          <div className="hero__title-image">
            <video
              ref={videoRef}
              src="/GTMo.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ width: "1100px", height: "600px", display: "block", margin: "0 auto" }}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <p className="hero__description" style={{ color: "#000" }}>
            GEM Talent Management
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
         {/* Emerald Wave SVG at bottom with strobe animation */}
      <div className="emerald-wave-container">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="emerald-wave"
        >
          <path
            d="M0,224L48,202.7C96,181,192,139,288,112C384,85,480,75,576,96C672,117,768,171,864,192C960,213,1056,203,1152,197.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#50C878"
          />
        </svg>
      </div>
      </div>
    </section>
  );
};

export default Hero;
