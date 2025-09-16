"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { NavigationItem, ScrollPosition } from "@/types";
import "./Header.css";
import { usePathname, useRouter } from "next/navigation";


interface HeaderProps {
  onContactClick?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ onContactClick, className = "" }) => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Navigation items for scroll-based navigation (same page, now always go to home page + section)
  const scrollNavigationItems: NavigationItem[] = [
    { label: "Home", href: "/" },
    { label: "Teams", href: "/#team" },
    { label: "Form", href: "/#application-form" },
  ];

  // Navigation items for page-based navigation
  const pageNavigationItems: NavigationItem[] = [
    { label: "Models", href: "/models", external: false },
    { label: "About", href: "/about", external: false },
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

  const pathname = usePathname() || "/";
  const router = useRouter();

  const handleSectionClick = (href: string) => {
    // Normalize href (allow '#id' or '/#id' or full paths)
    if (!href) return;

    // Direct home shortcut
    if (href === "/") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      return;
    }

    // Handle hash anchors: '#team' or '/#team'
    try {
      const normalized = href.startsWith("#") ? `${window.location.pathname}${href}` : href;
      const url = new URL(normalized, window.location.origin);
      const targetPath = url.pathname || "/";
      const hash = url.hash; // includes '#'

      if (targetPath === pathname) {
        // Same page: perform smooth scroll if element exists
        if (hash) {
          const id = hash.slice(1);
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
          }
        }
        // No hash or element missing: fallback to push to href (may trigger router scroll)
        router.push(href);
      } else {
        // Different page: navigate (includes hash if present)
        router.push(href);
      }
    } catch (err) {
      // Fallback: navigate
      router.push(href);
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


              {/* Scroll-based navigation (Home, Teams, Form) */}
              {scrollNavigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSectionClick(item.href)}
                  className="header__nav-item"
                  type="button"
                >
                  {item.label}
                </button>
              ))}

              {/* Page-based navigation (Models) */}
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
                  handleSectionClick(item.href);
                  setTimeout(() => setIsMobileMenuOpen(false), 150); // allow scroll to start
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
