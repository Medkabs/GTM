"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
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
          // Autoplay might be blocked, keep muted
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
    <section className={`hero ${className}`}>
      {/* Background Video */}
      <video
        ref={videoRef}
        className="hero__video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/heroVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="hero__content">
        <div className="hero__container">
          <div className="hero__title-image">
            <Image
              src="/GTM.png"
              alt="GEM Talent Management"
              width={560}
              height={160}
              priority
            />
          </div>

          <p className="hero__description">We build relationships.</p>

          <Button
            size="lg"
            onClick={handleDiscoverClick}
            className="hero__cta-button"
          >
            Discover More
            <ArrowRight className="hero__cta-icon" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
