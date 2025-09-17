"use client";

import React from "react";
import "./BeALight.css";

const BeALight: React.FC = () => {
  return (
    <section className="be-a-light">
      {/* Flickering glow background */}
      <div className="light-glow"></div>

      {/* Flickering lamp (⚪️) */}
      <div className="lamp">
        <h1 className="flicker-text">⚪️</h1>
      </div>

      {/* Reveal Word (independent of lamp) */}
      <h2 className="reveal-word">BE <br /> A <br /> LIGHT</h2>
    </section>
  );
};

export default BeALight;
