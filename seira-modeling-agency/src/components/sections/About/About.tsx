"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import "./About.css";

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className = "" }) => {
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section id="about" className={`about ${className}`}>
      <div className="about__container">
        <div className="about__content">
          <div className="about__text-content">
            <div className="about__subtitle">DISCOVER</div>
            <h2 className="about__title">
              Seira is an exciting new modeling agency based in tropical Bali, Indonesia.
            </h2>
            <p className="about__description">
              We build relationships. Despite the avalanche of digital connections,
              We feel businesses are not making the connections that truly matter.
            </p>
            <Button
              onClick={() => scrollToSection("models")}
              className="about__cta-button"
            >
              See Models
              <ArrowRight className="about__cta-icon" />
            </Button>
          </div>

          <div className="about__image-content">
            <div className="about__image-container">
              <img
                src="https://ext.same-assets.com/1679466695/2819250426.png"
                alt="Team collaboration"
                className="about__image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
