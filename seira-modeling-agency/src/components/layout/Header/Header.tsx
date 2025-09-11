"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { NavigationItem, ScrollPosition } from "@/types";
import "./Header.css";


interface HeaderProps {
  onContactClick?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ onContactClick, className = "" }) => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Navigation items for scroll-based navigation (same page)
  const scrollNavigationItems: NavigationItem[] = [
    { label: "Teams", href: "team" },
    { label: "Testimonials", href: "testimonials" },
    { label: "Form", href: "application-form" },
  ];

  // Navigation items for page-based navigation
  const pageNavigationItems: NavigationItem[] = [
    { label: "Models", href: "/models", external: false },
  ];

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const isScrolled = scrollPosition.y > 50;

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : 'header--transparent'} ${className}`}>
        <nav className="header__nav">
          <div className="header__container">
            {/* Logo */}
          {/* Desktop Navigation */}
            <div className="header__desktop-nav">
              {/* Scroll-based navigation */}
              {scrollNavigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="header__nav-item"
                  type="button"
                >
                  {item.label}
                </button>
              ))}

              {/* Page-based navigation */}
              {pageNavigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="header__nav-item header__nav-link"
                >
                  {item.label}
                </Link>
              ))}

              <Button
                onClick={onContactClick}
                className="header__contact-btn"
                size="sm"
              >
                Contact Us
                <ArrowRight className="header__contact-icon" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="header__mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              type="button"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="header__mobile-menu">
          <div className="header__mobile-content">
            {/* Mobile scroll navigation */}
            {scrollNavigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  scrollToSection(item.href);
                  setIsMobileMenuOpen(false);
                }}
                className="header__mobile-item"
                type="button"
              >
                {item.label}
              </button>
            ))}

            {/* Mobile page navigation */}
            {pageNavigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="header__mobile-item header__mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Button
              onClick={() => {
                onContactClick?.();
                setIsMobileMenuOpen(false);
              }}
              className="header__mobile-contact"
              size="lg"
            >
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
