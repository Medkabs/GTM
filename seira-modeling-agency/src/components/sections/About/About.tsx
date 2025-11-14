"use client";

// import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import "./About.css";
import React, { useState, useEffect, useRef } from 'react';

// Type declaration for Vimeo Player API
declare global {
  interface Window {
    Vimeo?: {
      Player: new (element: HTMLElement | HTMLIFrameElement) => {
        setVolume: (volume: number) => Promise<void>;
        setMuted: (muted: boolean) => Promise<void>;
      };
    };
  }
}

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className = "" }) => {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Minimal player interface for the methods we use to satisfy the linter
  type MinimalVimeoPlayer = {
    setMuted?: (muted: boolean) => Promise<void>;
    setVolume?: (volume: number) => Promise<void>;
  } | null;

  const playerRef = useRef<MinimalVimeoPlayer>(null);

  // The video ID is 982881332 from your URL: https://vimeo.com/manage/videos/982881332
  const videoId = '982881332';
  const vimeoEmbedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&controls=0&background=1&responsive=1`;

  // Load Vimeo Player.js API
  useEffect(() => {
    if (typeof window !== 'undefined' && iframeRef.current) {
      // Check if script already exists
      let script = document.querySelector('script[src="https://player.vimeo.com/api/player.js"]') as HTMLScriptElement;
      
      if (!script) {
        // Dynamically load Vimeo Player.js script
        script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        document.body.appendChild(script);
      }

      const initPlayer = () => {
        if (iframeRef.current && window.Vimeo?.Player) {
          try {
            playerRef.current = new window.Vimeo.Player(iframeRef.current);
          } catch (error) {
            console.error('Error initializing Vimeo player:', error);
          }
        }
      };

      if (window.Vimeo?.Player) {
        // API already loaded
        initPlayer();
      } else {
        // Wait for script to load
        script.onload = initPlayer;
      }
    }
  }, []);

  // Toggle mute/unmute when user interacts with the video area (click/keyboard)
  const toggleMute = async () => {
    try {
      // Initialize player if needed
      if (!playerRef.current && iframeRef.current) {
        if (window.Vimeo?.Player) {
          playerRef.current = new window.Vimeo.Player(iframeRef.current);
        }
      }

      if (isMuted) {
        // Unmute
        if (playerRef.current) {
          await playerRef.current.setMuted?.(false);
          await playerRef.current.setVolume?.(1);
          setIsMuted(false);
        } else if (iframeRef.current) {
          const currentUrl = iframeRef.current.src;
          const newUrl = currentUrl.replace('muted=1', 'muted=0');
          iframeRef.current.src = newUrl;
          setIsMuted(false);
        }
      } else {
        // Mute
        if (playerRef.current) {
          await playerRef.current.setMuted?.(true);
          // optionally set volume to 0
          await playerRef.current.setVolume?.(0);
          setIsMuted(true);
        } else if (iframeRef.current) {
          const currentUrl = iframeRef.current.src;
          const newUrl = currentUrl.replace('muted=0', 'muted=1');
          iframeRef.current.src = newUrl;
          setIsMuted(true);
        }
      }
    } catch (error) {
      console.error('Error toggling mute state:', error);
      // As a fallback, try toggling the iframe URL params
      if (iframeRef.current) {
        const currentUrl = iframeRef.current.src;
        if (isMuted) {
          iframeRef.current.src = currentUrl.replace('muted=1', 'muted=0');
          setIsMuted(false);
        } else {
          iframeRef.current.src = currentUrl.replace('muted=0', 'muted=1');
          setIsMuted(true);
        }
      }
    }
  };

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
              <div
                className={`about__video-wrapper ${isMuted ? 'is-muted' : 'is-unmuted'}`}
              >
                <iframe
                  ref={iframeRef}
                  src={vimeoEmbedUrl}
                  className="about__iframe"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Vimeo video player"
                />

                {/* Transparent element above the iframe to capture clicks (iframes don't bubble clicks) */}
                <div
                  className="about__click-catcher"
                  role="button"
                  aria-label={isMuted ? 'Click to unmute video' : 'Click to mute video'}
                  tabIndex={0}
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleMute();
                    }
                  }}
                />

                {isMuted && (
                  <div
                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                    role="button"
                    aria-label="Click to unmute video"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMute();
                      }
                    }}
                    className="about__overlay"
                  >
                    Click Anywhere to Unmute 🔊
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
