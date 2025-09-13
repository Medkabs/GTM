"use client";

import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { Testimonial } from "@/types";
import "./Testimonials.css";

interface TestimonialsProps {
  className?: string;
}

const TestimonialsSection: React.FC<TestimonialsProps> = ({ className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const testimonials: Testimonial[] = [
    {
      id: "1",
      text: "Working with Seira has been a game-changer for my career. They connected me with top brands and provided the guidance I needed to grow as a professional model. Highly recommend!",
      author: "Sophia R.",
      role: "Fashion Model",
      rating: 5
    },
    {
      id: "2",
      text: "From day one, the team at Seira has been nothing but supportive. They genuinely care about their models and go the extra mile to help us succeed.",
      author: "James L.",
      role: "Commercial Model",
      rating: 5
    },
    {
      id: "3",
      text: "Thanks to Seira, I landed my first international campaign! Their connections and expertise are unmatched.",
      author: "Marco T.",
      role: "Runway Model",
      rating: 5
    },
    {
      id: "4",
      text: "The agency treats us like family and ensures we are always comfortable and respected on set. It's refreshing to work with such a professional and caring team.",
      author: "Noah S.",
      role: "Fitness Model",
      rating: 5
    },
    {
      id: "5",
      text: "They're always ahead of trends and know exactly what brands are looking for. With Seira, I've consistently booked high-profile jobs!",
      author: "Hannah B.",
      role: "Beauty Model",
      rating: 5
    },
    {
      id: "6",
      text: "They don't just book jobs—they help build careers. Seira's guidance on branding and social media has been invaluable for my growth in the industry.",
      author: "Ethan J.",
      role: "Influencer & Model",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Slightly slower for better readability

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Create duplicated arrays for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const getTopRowTestimonials = (): (Testimonial & { key: string })[] => {
    const visible: (Testimonial & { key: string })[] = [];
    const visibleCount = 3;

    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({
        ...testimonials[index],
        key: `top-${testimonials[index].id}-${currentIndex}-${i}`
      });
    }

    return visible;
  };

  const getBottomRowTestimonials = (): (Testimonial & { key: string })[] => {
    const visible: (Testimonial & { key: string })[] = [];
    const visibleCount = 3;
    // Offset by half the length for different testimonials
    const offset = Math.floor(testimonials.length / 2);

    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + offset + i) % testimonials.length;
      visible.push({
        ...testimonials[index],
        key: `bottom-${testimonials[index].id}-${currentIndex}-${i}`
      });
    }

    return visible;
  };

  return (
    <section id="testimonials" className={`testimonials ${className}`}>
      <div className="testimonials__container">
        {/* Header */}
        <div className="testimonials__header">
          <div className="testimonials__subtitle">WE DELIVER IMPACT</div>
          <h2 className="testimonials__title">
            What People <span className="testimonials__title-accent">Say's</span>
          </h2>
        </div>

        {/* Two-Row Slideshow */}
        <div className="testimonials__slideshow">
          {/* Top Row - Slides Left to Right */}
          <div className="testimonials__row testimonials__row--top">
            <div className="testimonials__track testimonials__track--ltr">
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`top-continuous-${testimonial.id}-${index}`}
                  className="testimonials__card"
                >
                  <Quote className="testimonials__quote-icon" />
                  <p className="testimonials__text">
                    {testimonial.text}
                  </p>
                  <div className="testimonials__author">
                    <div className="testimonials__author-info">
                      <p className="testimonials__author-name">{testimonial.author}</p>
                      <p className="testimonials__author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Slides Right to Left */}
          <div className="testimonials__row testimonials__row--bottom">
            <div className="testimonials__track testimonials__track--rtl">
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`bottom-continuous-${testimonial.id}-${index}`}
                  className="testimonials__card"
                >
                  <Quote className="testimonials__quote-icon" />
                  <p className="testimonials__text">
                    {testimonial.text}
                  </p>
                  <div className="testimonials__author">
                    <div className="testimonials__author-info">
                      <p className="testimonials__author-name">{testimonial.author}</p>
                      <p className="testimonials__author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="testimonials__indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`testimonials__indicator ${
                index === currentIndex ? 'testimonials__indicator--active' : ''
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
