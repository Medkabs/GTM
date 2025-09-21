"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./BeALight.css";

const BeALight: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2.5,
      defaults: { ease: "power2.inOut" },
    });

    tl.set(".be-a-light-section .word.in, .be-a-light-section .word.too, .be-a-light-section .word.deep", { opacity: 0 });

    // Animate lines
    tl.fromTo(
      ".be-a-light-section .left-side",
      { height: 0 },
      { duration: 2.3, height: "100%", ease: "power3.in" },
      0
    );

    tl.fromTo(
      ".be-a-light-section .bottom-side",
      { width: 0 },
      { duration: 2.3, width: "100%", ease: "power3.out" },
      2.3
    );

    // Words
    tl.fromTo(".be-a-light-section .in", { opacity: 0 }, { duration: 1.3, opacity: 1, stagger: 0.06 }, "-=1");
    tl.fromTo(".be-a-light-section .too", { opacity: 0 }, { duration: 1.3, opacity: 1, stagger: 0.06 }, "-=0.6");
    tl.fromTo(".be-a-light-section .deep", { opacity: 0 }, { duration: 1.3, opacity: 1, stagger: 0.06 }, "-=0.6");

    // Rotate container
    tl.to(
      ".be-a-light-section .text",
      {
        transform: "rotate(-20deg) skew(0deg, 0deg)",
        duration: 1.5,
        ease: "slow(0.2, 0.4, false)",
      },
      "+=1"
    );

    // Fade out
    tl.to(".be-a-light-section .text", { opacity: 0, duration: 0.6, stagger: 0.06 }, "+=2");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="be-a-light-section">
      <div className="container">
        {[1, 2, 3, 4, 5, 6, 7].map((val) => (
          <div key={val} className={`text text${val}`}>
            <p className="word in">BE</p>
            <p className="word too">A</p>
            <p className="word deep">LIGHT</p>
            <span className="left-side"></span>
            <span className="bottom-side"></span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BeALight;
