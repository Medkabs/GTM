"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Layout Components
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

// Section Components
import Hero from "@/components/sections/Hero/Hero";
import BeALight from "@/components/sections/BeALight/BeALight";
import About from "@/components/sections/About/About";
import Team from "@/components/sections/Team/Team";
import ApplicationForm from "@/components/sections/ApplicationForm/ApplicationForm";

// UI Components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

// Types and utilities
import { ContactForm, SecurityConfig } from "@/types";
import { sanitizeInput, isValidEmail, validateFormData, logSecurityEvent } from "@/lib/security";

// Dynamically import heavy components
const TestimonialsSection = dynamic(() => import("@/components/sections/Testimonials/Testimonials"), {
  loading: () => <div className="min-h-[400px] bg-background" />,
});

const FAQSection = dynamic(() => import("@/components/sections/FAQ/FAQ"), {
  loading: () => <div className="min-h-[400px] bg-background" />,
});

// Security configuration
const securityConfig: SecurityConfig = {
  enableCSP: true,
  enableXSS: true,
  enableClickjacking: true,
};

export default function HomePage() {
  // State management
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    package: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  // Security: Track page access
  useEffect(() => {
    logSecurityEvent("page_access", {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    });
  }, []);

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Validate and sanitize form data
      const sanitizedData = {
        name: sanitizeInput(contactForm.name),
        email: sanitizeInput(contactForm.email),
        package: sanitizeInput(contactForm.package),
        message: sanitizeInput(contactForm.message)
      };

      // Additional validation
      if (!sanitizedData.name || sanitizedData.name.length < 2) {
        throw new Error("Please enter a valid name (at least 2 characters)");
      }

      if (!isValidEmail(sanitizedData.email)) {
        throw new Error("Please enter a valid email address");
      }

      if (!sanitizedData.message || sanitizedData.message.length < 10) {
        throw new Error("Please enter a message (at least 10 characters)");
      }

      // Log form submission attempt
      logSecurityEvent("contact_form_submission", {
        timestamp: new Date().toISOString(),
        email: sanitizedData.email,
        package: sanitizedData.package,
      });

      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      console.log("Contact form submitted:", sanitizedData);
      setContactForm({ name: "", email: "", package: "", message: "" });
      setIsContactModalOpen(false);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred. Please try again.";
      setSubmitError(errorMessage);
      logSecurityEvent("contact_form_error", {
        error: errorMessage,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes with security validation
  const handleInputChange = (field: keyof ContactForm, value: string): void => {
    const sanitizedValue = sanitizeInput(value);
    setContactForm(prev => ({ ...prev, [field]: sanitizedValue }));

    // Clear error when user starts typing
    if (submitError) {
      setSubmitError("");
    }
  };

  // Contact modal handlers
  const openContactModal = (): void => {
    setIsContactModalOpen(true);
    setSubmitError("");
  };

  const closeContactModal = (): void => {
    setIsContactModalOpen(false);
    setContactForm({ name: "", email: "", package: "", message: "" });
    setSubmitError("");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header Navigation */}
      <Header onContactClick={openContactModal} />

      {/* Main Content Sections */}
      <Hero onDiscoverClick={() => logSecurityEvent("hero_cta_click")} />

      <BeALight />

      <About />

      <Team />

      {/* <TestimonialsSection /> */}

      <FAQSection />

      <ApplicationForm />

      {/* Footer */}
      <Footer />

      {/* Contact Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={closeContactModal}>
        <DialogContent className="sm:max-w-lg bg-black/90 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
          <DialogHeader className="text-center space-y-2 pb-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">✨</span>
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Let's Connect!
            </DialogTitle>
            <DialogDescription className="text-white/70 text-sm">
              Ready to start your modeling journey? We'd love to hear from you.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/80 flex items-center gap-1">
                  <span>👋</span> Full Name
                </label>
                <Input
                  placeholder="Jane Smith"
                  value={contactForm.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg backdrop-blur-sm hover:bg-white/10 focus:border-emerald-500 outline-none transition-all duration-200"
                  required
                  disabled={isSubmitting}
                  maxLength={100}
                  aria-label="Full name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/80 flex items-center gap-1">
                  <span>📧</span> Email
                </label>
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  value={contactForm.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg backdrop-blur-sm hover:bg-white/10 focus:border-emerald-500 outline-none transition-all duration-200"
                  required
                  disabled={isSubmitting}
                  maxLength={254}
                  aria-label="Email address"
                />
              </div>
            </div>

            {/* Package Selection */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/80 flex items-center gap-1">
                <span>🎯</span> Interest
              </label>
              <Select
                onValueChange={(value) => handleInputChange("package", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-lg backdrop-blur-sm hover:bg-white/10 focus:border-emerald-500 outline-none transition-all duration-200">
                  <SelectValue placeholder="What interests you?" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 backdrop-blur-xl border-white/10">
                  <SelectItem value="individual" className="text-white hover:bg-white/10">
                    Individual Modeling
                  </SelectItem>
                  <SelectItem value="commercial" className="text-white hover:bg-white/10">
                    Commercial Projects
                  </SelectItem>
                  <SelectItem value="fashion" className="text-white hover:bg-white/10">
                    Fashion Campaigns
                  </SelectItem>
                  <SelectItem value="custom" className="text-white hover:bg-white/10">
                    Custom Package
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message Field */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/80 flex items-center gap-1">
                <span>💭</span> Message
              </label>
              <Textarea
                placeholder="Tell us about yourself and your goals..."
                value={contactForm.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-lg backdrop-blur-sm hover:bg-white/10 focus:border-emerald-500 outline-none transition-all duration-200 min-h-[80px] resize-none"
                rows={3}
                disabled={isSubmitting}
                maxLength={1000}
                aria-label="Project message"
              />
            </div>

            {/* Error Display */}
            {submitError && (
              <div className="text-red-300 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3 backdrop-blur-sm">
                <span className="mr-2">⚠️</span>
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white h-12 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>🚀</span>
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Hidden section for smooth scroll targeting */}
      <div id="contact" className="sr-only" />
    </main>
  );
}
