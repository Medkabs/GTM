"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamMember } from "@/types";
import "./Team.css";

interface TeamProps {
  className?: string;
}

const Team: React.FC<TeamProps> = ({ className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Hugo Terarian",
      role: "CEO & Founder",
      image: "https://ext.same-assets.com/1679466695/3075755211.jpeg",
      bio: "Visionary leader with 15+ years in talent management"
    },
    {
      id: "2",
      name: "Katyln Mandanne",
      role: "Co-Founder",
      image: "https://ext.same-assets.com/1679466695/437552439.jpeg",
      bio: "Strategic partnerships and business development expert"
    },
    {
      id: "3",
      name: "Josh Paulo",
      role: "Photographer",
      image: "https://ext.same-assets.com/1679466695/2354057752.jpeg",
      bio: "Award-winning photographer specializing in fashion and commercial work"
    },
    {
      id: "4",
      name: "Farrel Williams",
      role: "Art Director",
      image: "https://ext.same-assets.com/1679466695/3673491182.png",
      bio: "Creative director with expertise in brand storytelling"
    },
    {
      id: "5",
      name: "Huk",
      role: "CTO",
      image: "https://ext.same-assets.com/1679466695/169575581.jpeg",
      bio: "Technology innovator driving digital transformation"
    }
  ];

  // Auto-scroll functionality with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentIndex((prevIndex) =>
          prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
        );

        // Reset animation state after transition
        setTimeout(() => setIsAnimating(false), 600);
      }
    }, 3500); // Slightly longer interval for smoother experience

    return () => clearInterval(interval);
  }, [teamMembers.length, isAnimating]);

  const nextSlide = (): void => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const prevSlide = (): void => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const goToSlide = (index: number): void => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const getVisibleMembers = (): TeamMember[] => {
    const visibleCount = 4;
    const visible: TeamMember[] = [];

    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % teamMembers.length;
      visible.push(teamMembers[index]);
    }

    return visible;
  };

  return (
    <section id="team" className={`team ${className}`}>
      <div className="team__container">
        {/* Header */}
        <div className="team__header">
          <div className="team__header-content">
            <div className="team__subtitle">THINK, CREATE, DEVELOP</div>
            <h2 className="team__title">
              Meet Our <span className="team__title-accent">Teams</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="team__navigation">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="team__nav-button team__nav-button--prev"
              aria-label="Previous team members"
              disabled={isAnimating}
            >
              <ChevronLeft className="team__nav-icon" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="team__nav-button team__nav-button--next"
              aria-label="Next team members"
              disabled={isAnimating}
            >
              <ChevronRight className="team__nav-icon" />
            </Button>
          </div>
        </div>

        {/* Team Members Grid (Hero-style layout) */}
        <div className={`team__grid ${isAnimating ? 'team__grid--animating' : ''}`}>
          {getVisibleMembers().map((member, index) => (
            <div
              key={`${member.id}-${currentIndex}-${index}`}
              className="team__member-card"
              style={{
                '--animation-delay': `${index * 100}ms`
              } as React.CSSProperties}
            >
              <div className="team__member-image-container">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="team__member-image"
                  loading="lazy"
                />
                <div className="team__member-overlay" />
                <div className="team__member-info">
                  <h3 className="team__member-name">{member.name}</h3>
                  <p className="team__member-role">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="team__indicators">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`team__indicator ${
                index === currentIndex ? 'team__indicator--active' : ''
              }`}
              aria-label={`Go to team member ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
