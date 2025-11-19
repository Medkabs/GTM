import React, { useEffect, useRef } from "react";
import "./BeALight.css";
import { TweenMax } from "gsap";

const BeALight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const texts = container.querySelectorAll(".text");
    const halfX = window.innerWidth / 2;
    const halfY = window.innerHeight / 2;

    // Initial Z stacking
    texts.forEach((el, i) => {
      TweenMax.to(el, 1, {
        z: 1 * (i + 8),
      });
    });

    // Mouse movement parallax
    const handleMouse = (e: MouseEvent) => {
      texts.forEach((el, i) => {
        TweenMax.to(el, 0.5, {
          x: (e.clientX - halfX) * (i + 1) * 0.01,
          y: (e.clientY - halfY) * (i + 1) * 0.01,
        });
      });
    };

    document.addEventListener("mousemove", handleMouse);
    return () => document.removeEventListener("mousemove", handleMouse);
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
