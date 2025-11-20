import React, { useEffect, useRef } from "react";
import "./BeALight.css";
import { TweenMax, Power2 } from "gsap";

const BeALight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const inView = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const texts = container.querySelectorAll(".text");
    const halfX = window.innerWidth / 2;
    const halfY = window.innerHeight / 2;

    const composeText = () => {
      texts.forEach((el, i) => {
        TweenMax.to(el, 0.6, {
          x: 0,
          y: 0,
          z: i + 8,
          rotationX: 0,
          rotationY: 0,
          ease: Power2.easeOut,
        });
      });
    };

    composeText();

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        inView.current = entry.isIntersecting;
        if (!inView.current) {
          composeText();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(container);

    const handleMouse = (e: MouseEvent) => {
      if (!inView.current) return;

      texts.forEach((el, i) => {
        TweenMax.to(el, 0.4, {
          x: (e.clientX - halfX) * (i + 1) * 0.01,
          y: (e.clientY - halfY) * (i + 1) * 0.01,
        });
      });
    };

    document.addEventListener("mousemove", handleMouse);

    const handleScroll = () => {
      if (!inView.current) return;

      const rect = container.getBoundingClientRect();
      const midpoint = rect.top + rect.height * 0.7;

      // Scroll position relative to viewport top (0) downwards positive
      // We trigger decomposing only if viewport top passes midpoint (rect.top < 0 && abs(rect.top) > rect.height/2)
      // But let's just check if midpoint is above viewport center (0 = top of viewport)
      // Actually we check if viewport scroll is past midpoint of the section relative to document.

      const viewportMidY = window.innerHeight / 2;

      const currentScroll = window.scrollY;
      const scrollingDown = currentScroll > lastScrollY.current;
      lastScrollY.current = currentScroll;

      // Trigger decompose only if midpoint of section is above center of viewport
      if (midpoint < viewportMidY && scrollingDown) {
        texts.forEach((el, i) => {
          TweenMax.to(el, 0.8, {
            x: (i + 1) * 8,
            y: (i + 1) * 8,
            z: (i + 8) + (i + 1) * 30,
            rotationX: 8,
            rotationY: 8,
            ease: Power2.easeOut,
          });
        });
      } else {
        composeText();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="effect-container" ref={containerRef}>
      <div className="wrap">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="text">
            Be A Light
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeALight;
