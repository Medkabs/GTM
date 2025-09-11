"use client";

import React, { useState, useEffect, useRef } from "react";
import "./BeALight.css";

interface BeALightProps {
  className?: string;
}

const BeALight: React.FC<BeALightProps> = ({ className = "" }) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Pre-defined particle positions to avoid hydration mismatch
  const particlePositions = [
    { x: 15, y: 25 }, { x: 85, y: 35 }, { x: 45, y: 15 }, { x: 75, y: 65 }, { x: 25, y: 75 },
    { x: 65, y: 25 }, { x: 35, y: 55 }, { x: 55, y: 85 }, { x: 85, y: 15 }, { x: 15, y: 45 },
    { x: 95, y: 55 }, { x: 5, y: 75 }, { x: 75, y: 5 }, { x: 45, y: 95 }, { x: 25, y: 35 },
    { x: 65, y: 85 }, { x: 35, y: 15 }, { x: 85, y: 75 }, { x: 15, y: 65 }, { x: 55, y: 45 }
  ];

  // Ensure component is mounted before calculating scroll
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = (): void => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate when section is centered in viewport
      const sectionCenter = rect.top + sectionHeight / 2;
      const viewportCenter = windowHeight / 2;

      // Distance from viewport center (0 = perfectly centered)
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
      const maxDistance = windowHeight / 2 + sectionHeight / 2;

      // Calculate progress (1 = centered, 0 = far from center)
      const centerProgress = Math.max(0, 1 - distanceFromCenter / maxDistance);

      // Set visibility when section enters viewport
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(isInViewport);

      // Calculate scroll progress for animation
      if (isInViewport) {
        const scrollableDistance = windowHeight + sectionHeight;
        const scrolled = windowHeight - rect.top;
        const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
        setScrollProgress(progress * centerProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Don't render scroll-dependent styles until mounted
  if (!isMounted) {
    return (
      <section
        ref={sectionRef}
        id="be-a-light"
        className={`be-a-light ${className}`}
      >
        <div className="be-a-light__container">
          {/* Spotlight Image */}
          <div className="be-a-light__spotlight">
            
          </div>

          {/* Main Text */}
          <div ref={textRef} className="be-a-light__text-container">
            <h2 className="be-a-light__title">
              <span className="be-a-light__title-word">Be</span>
              <span className="be-a-light__title-word">A</span>
              <span className="be-a-light__title-word be-a-light__title-word--accent">Light</span>
            </h2>
          </div>

          {/* Light Rays Effect */}
          <div className="be-a-light__rays">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="be-a-light__ray"
                style={{
                  '--ray-delay': `${index * 0.1}s`,
                  '--ray-rotation': `${index * 30}deg`,
                  animationDelay: `${index * 0.1}s`
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Particle Effects */}
          <div className="be-a-light__particles">
            {particlePositions.map((position, index) => (
              <div
                key={index}
                className="be-a-light__particle"
                style={{
                  '--particle-delay': `${index * 0.2}s`,
                  '--particle-x': `${position.x}%`,
                  '--particle-y': `${position.y}%`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="be-a-light"
      className={`be-a-light ${className} ${isVisible ? 'be-a-light--visible' : ''}`}
    >
      <div className="be-a-light__container">
        {/* Spotlight Image */}
        <div
          className="be-a-light__spotlight"
         
        >
          <img
            
          />
        </div>

        {/* Main Text */}
        <div
          ref={textRef}
          className="be-a-light__text-container"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${20 * (1 - scrollProgress)}px)`
          }}
        >
          <h2 className="be-a-light__title">
            <span className="be-a-light__title-word">Be</span>
            <span className="be-a-light__title-word">A</span>
            <span className="be-a-light__title-word be-a-light__title-word--accent">Light</span>
          </h2>
        </div>

        {/* Light Rays Effect */}
        <div
          className="be-a-light__rays"
          style={{
            opacity: scrollProgress * 0.6,
            transform: `scale(${0.8 + scrollProgress * 0.4})`
          }}
        >
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="be-a-light__ray"
              style={{
                '--ray-delay': `${index * 0.1}s`,
                '--ray-rotation': `${index * 30}deg`,
                animationDelay: `${index * 0.1}s`
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Particle Effects */}
        <div className="be-a-light__particles">
          {particlePositions.map((position, index) => (
            <div
              key={index}
              className="be-a-light__particle"
              style={{
                '--particle-delay': `${index * 0.2}s`,
                '--particle-x': `${position.x}%`,
                '--particle-y': `${position.y}%`,
                opacity: scrollProgress
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeALight;
