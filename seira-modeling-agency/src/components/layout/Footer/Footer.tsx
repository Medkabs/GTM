"use client";

import React from "react";
import { NavigationItem } from "@/types";
import "./Footer.css";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const footerLinks: NavigationItem[] = [
    { label: "Back to top", href: "hero" },
    { label: "Models", href: "/models", external: false },
    // { label: "FAQ", href: "faq" },
  ];

  const socialLinks: NavigationItem[] = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/httpsayd/",
      external: true
    },
    {
      label: "Twitter",
      href: "https://x.com/httpsayd_",
      external: true
    },
  ];

  return (
    <footer className={`footer ${className}`}>
      <div className="footer__container">
        {/* Main Footer Content */}
        <div className="footer__main">
          {/* Company Info */}
          <div className="footer__section">
            <h3 className="footer__brand">Seira</h3>
            <p className="footer__address">
              Jl. Damai, Kayu Putih, Kayu Putih, Lovina,
              Kabupaten Buleleng, Bali 00362
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h4 className="footer__section-title">Quick Links</h4>
            <div className="footer__links">
              {footerLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="footer__link footer__link--external"
                  >
                    {link.label}
                  </a>
                ) : link.href.startsWith('/') ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="footer__link"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="footer__link"
                    type="button"
                  >
                    {link.label}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="footer__section">
            <h4 className="footer__section-title">Follow Us</h4>
            <div className="footer__links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link footer__link--external"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer__section">
            <h4 className="footer__section-title">Contact</h4>
            <div className="footer__contact-info">
              <p className="footer__contact-text">Professional Talent Management</p>
              <p className="footer__contact-text">Bali, Indonesia</p>
            </div>
          </div>
        </div>

        {/* Collaboration Section - Fixed Display */}
        <div className="footer__collaboration">
          <div className="footer__collaboration-content">
            <span className="footer__collaboration-text">Let's</span>
            <span className="footer__collaboration-emphasis">Collaborate</span>
            <span className="footer__collaboration-separator">×</span>
            <span className="footer__collaboration-text">Let's</span>
            <span className="footer__collaboration-emphasis">Collaborate</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">Copyright 2025</p>
            <p className="footer__rights">All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
