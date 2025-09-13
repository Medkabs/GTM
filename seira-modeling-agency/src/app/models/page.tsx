"use client";

import React from "react";
import dynamic from "next/dynamic";

// Layout Components
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

// Section Components
import Models from "@/components/sections/Models/Models";

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

// Security configuration
const securityConfig: SecurityConfig = {
  enableCSP: true,
  enableXSS: true,
  enableClickjacking: true,
};

export default function ModelsPage() {
  // State management
  const [isContactModalOpen, setIsContactModalOpen] = React.useState<boolean>(false);
  const [contactForm, setContactForm] = React.useState<ContactForm>({
    name: "",
    email: "",
    package: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<string>("");

  // Security: Track page access
  React.useEffect(() => {
    logSecurityEvent("models_page_access", {
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

      {/* Page Hero Section */}
      <section className="pt-24 pb-16 bg-background">
        <div className="max-w-1280px mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Talented <span className="italic text-primary">Models</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Discover our diverse portfolio of professional models, each bringing unique talents and expertise to bring your vision to life.
          </p>
        </div>
      </section>

      {/* Models Section */}
      <Models />

      {/* Footer */}
      <Footer />

      {/* Contact Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={closeContactModal}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Contact Us!
            </DialogTitle>
            <DialogDescription className="text-white/60 text-center">
              Get in touch with our team to discuss your modeling needs.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleContactSubmit} className="space-y-6 mt-6">
            {/* Name Field */}
            <div>
              <Input
                placeholder="Jane Smith"
                value={contactForm.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-white/50"
                required
                disabled={isSubmitting}
                maxLength={100}
                aria-label="Full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <Input
                type="email"
                placeholder="jane@example.com"
                value={contactForm.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-white/50"
                required
                disabled={isSubmitting}
                maxLength={254}
                aria-label="Email address"
              />
            </div>

            {/* Package Selection */}
            <div>
              <Select
                onValueChange={(value) => handleInputChange("package", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select Package" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="individual">Individual Modeling</SelectItem>
                  <SelectItem value="commercial">Commercial Projects</SelectItem>
                  <SelectItem value="fashion">Fashion Campaigns</SelectItem>
                  <SelectItem value="custom">Custom Package</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message Field */}
            <div>
              <Textarea
                placeholder="Tell us about your project..."
                value={contactForm.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-white/50 min-h-[100px]"
                rows={4}
                disabled={isSubmitting}
                maxLength={1000}
                aria-label="Project message"
              />
            </div>

            {/* Error Display */}
            {submitError && (
              <div className="text-red-400 text-sm bg-red-900/20 border border-red-900/30 rounded-md p-3">
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Hidden section for smooth scroll targeting */}
      <div id="contact" className="sr-only" />
    </main>
  );
}
