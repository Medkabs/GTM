"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Upload, Check, AlertCircle } from "lucide-react";
import { sanitizeInput, sanitizeMultilineInput, isValidEmail, generateCSRFToken } from "@/lib/security";
import "./ApplicationForm.css";

interface FormData {
  // Step 1: Personal Information & Contact
  fullName: string;
  email: string;
  phoneNumber: string;
  passionAge: string;

  // Step 2: Interests & Career
  interests: string;
  careerEnhancement: string;
  careerGoals: string;
  challenges: string;

  // Step 3: Agency & Legal
  signedWithAgencies: string;
  agencyNames: string;
  criminalRecord: string;
  criminalDetails: string;

  // Step 4: Measurements & Photo
  photo: File | null;
  waist: string;
  chest: string;
  hips: string;
  inseam: string;
  shoe: string;
  shirt: string;
  suit: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ApplicationFormProps {
  className?: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ className = "" }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [csrfToken, setCSRFToken] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    passionAge: "",
    interests: "",
    careerEnhancement: "",
    careerGoals: "",
    challenges: "",
    signedWithAgencies: "",
    agencyNames: "",
    criminalRecord: "",
    criminalDetails: "",
    photo: null,
    waist: "",
    chest: "",
    hips: "",
    inseam: "",
    shoe: "",
    shirt: "",
    suit: ""
  });

  const totalSteps = 4;

  // Generate CSRF token on component mount
  useEffect(() => {
    setCSRFToken(generateCSRFToken());
  }, []);

  // Validation rules for each step
  const validateStep = (step: number): FormErrors => {
    const stepErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          stepErrors.fullName = "Full name is required";
        } else if (formData.fullName.length < 2) {
          stepErrors.fullName = "Full name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
          stepErrors.email = "Email is required";
        } else if (!isValidEmail(formData.email)) {
          stepErrors.email = "Please enter a valid email address";
        }

        if (!formData.phoneNumber.trim()) {
          stepErrors.phoneNumber = "Phone number is required";
        } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
          stepErrors.phoneNumber = "Please enter a valid phone number";
        }

        // Validate passionAge if provided
        if (formData.passionAge && formData.passionAge.trim()) {
          const ageValue = Number(formData.passionAge);
          if (!Number.isInteger(ageValue) || ageValue < 1 || ageValue > 100) {
            stepErrors.passionAge = "Please enter a valid age between 1 and 100";
          }
        }
        break;

      case 2:
        if (!formData.careerEnhancement.trim()) {
          stepErrors.careerEnhancement = "Please describe what you're doing to enhance your career";
        } else if (formData.careerEnhancement.length < 10) {
          stepErrors.careerEnhancement = "Please provide more details (at least 10 characters)";
        }

        if (!formData.careerGoals.trim()) {
          stepErrors.careerGoals = "Please describe what you'd love to do in your area of interest";
        } else if (formData.careerGoals.length < 10) {
          stepErrors.careerGoals = "Please provide more details (at least 10 characters)";
        }
        break;

      case 3:
        if (!formData.signedWithAgencies) {
          stepErrors.signedWithAgencies = "Please select an option";
        }

        if (!formData.criminalRecord) {
          stepErrors.criminalRecord = "Please select an option";
        }
        break;

      case 4:
        if (!formData.chest.trim()) {
          stepErrors.chest = "Chest measurement is required";
        }

        // Photo validation
        if (formData.photo) {
          const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
          const maxSize = 5 * 1024 * 1024; // 5MB

          if (!allowedTypes.includes(formData.photo.type)) {
            stepErrors.photo = "Only JPEG, PNG, and WebP files are allowed";
          } else if (formData.photo.size > maxSize) {
            stepErrors.photo = "File size must be less than 5MB";
          }
        }
        break;
    }

    return stepErrors;
  };

  // Handle input changes with sanitization
  const handleInputChange = (field: keyof FormData, value: string | File | null): void => {
    // For file inputs or non-string values, just set directly
    if (typeof value !== 'string') {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: "" }));
      }
      return;
    }

    // Use a multiline-safe sanitizer for textarea fields so spaces and newlines are preserved
    const multilineFields: Array<keyof FormData> = [
      'interests',
      'careerEnhancement',
      'careerGoals',
      'challenges',
      'criminalDetails'
    ];

      const sanitizedValueInitial = multilineFields.includes(field)
        ? sanitizeMultilineInput(value)
        : sanitizeInput(value);

      // Per-field maximum character lengths
      const maxFieldLengths: Partial<Record<keyof FormData, number>> = {
        waist: 3,
        chest: 3,
        hips: 3,
        inseam: 3,
        shoe: 4,
        suit: 4,
      };

      const maxLen = maxFieldLengths[field as keyof FormData];
      const sanitizedValue = typeof maxLen === 'number' ? String(sanitizedValueInitial).slice(0, maxLen) : sanitizedValueInitial;

    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));

    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Specific handlers for passionAge to allow manual numeric entry only and clamp on blur
  const handlePassionAgeChange = (raw: string): void => {
    // Allow only digits by stripping non-digit characters
    const digitsOnly = raw.replace(/\D+/g, '');
    // Prevent leading zeros (optional)
    let normalized = digitsOnly.replace(/^0+(?=\d)/, '');
    // If numeric value exceeds 100, clamp to '100'
    if (normalized) {
      const num = Number(normalized);
      if (!Number.isNaN(num) && num > 100) {
        normalized = '100';
      }
    }
    setFormData(prev => ({ ...prev, passionAge: normalized }));

    if (errors.passionAge) {
      setErrors(prev => ({ ...prev, passionAge: "" }));
    }
  };

  const handlePassionAgeBlur = (): void => {
    const raw = formData.passionAge.trim();
    if (!raw) return;
    const value = Number(raw);
    if (Number.isNaN(value)) {
      setErrors(prev => ({ ...prev, passionAge: "Please enter a valid age between 1 and 100" }));
      return;
    }
    // Clamp to 1-100
    const clamped = Math.min(100, Math.max(1, Math.floor(value)));
    if (String(clamped) !== raw) {
      setFormData(prev => ({ ...prev, passionAge: String(clamped) }));
    }
  };

  const handlePassionAgePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    const pasted = e.clipboardData.getData('text') || '';
    const digitsOnly = pasted.replace(/\D+/g, '');
    if (!digitsOnly) {
      e.preventDefault();
      return;
    }
    // Replace the paste with cleaned digits and clamp to 100
    e.preventDefault();
    // Limit to max 3 chars (since 100 is max)
    let limited = digitsOnly.slice(0, 3);
    const num = Number(limited);
    if (!Number.isNaN(num) && num > 100) {
      limited = '100';
    }
    setFormData(prev => ({ ...prev, passionAge: limited }));
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    handleInputChange('photo', file);
  };

  // Navigate to next step
  const handleNext = (): void => {
    const stepErrors = validateStep(currentStep);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  // Navigate to previous step
  const handlePrevious = (): void => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  // Handle form submission
  const handleSubmit = async (): Promise<void> => {
    const stepErrors = validateStep(currentStep);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'photo' && value instanceof File) {
            submitData.append(key, value);
          } else if (typeof value === 'string') {
            submitData.append(key, value);
          }
        }
      });

      // Add CSRF token
      submitData.append('csrfToken', csrfToken);
      submitData.append('timestamp', new Date().toISOString());

      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log("Form submitted successfully:", Object.fromEntries(submitData));
      setIsSubmitted(true);

    } catch (error) {
      console.error("Form submission failed:", error);
      setErrors({ submit: "Failed to submit application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render step content
  const renderStepContent = (): React.ReactNode => {
    switch (currentStep) {
      case 1:
        return (
          <div className="application-form__step">
            <h3 className="application-form__step-title">Personal Information & Contact</h3>

            <div className="application-form__field">
              <Label htmlFor="fullName" className="application-form__label">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`application-form__input ${errors.fullName ? 'application-form__input--error' : ''}`}
                placeholder="Enter your full name"
                maxLength={100}
              />
              {errors.fullName && (
                <span className="application-form__error">
                  <AlertCircle className="application-form__error-icon" />
                  {errors.fullName}
                </span>
              )}
            </div>

            <div className="application-form__field">
              <Label htmlFor="email" className="application-form__label">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`application-form__input ${errors.email ? 'application-form__input--error' : ''}`}
                placeholder="Enter your email address"
                maxLength={254}
              />
              {errors.email && (
                <span className="application-form__error">
                  <AlertCircle className="application-form__error-icon" />
                  {errors.email}
                </span>
              )}
            </div>

            <div className="application-form__field">
              <Label htmlFor="phoneNumber" className="application-form__label">
                Phone Number *
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={`application-form__input ${errors.phoneNumber ? 'application-form__input--error' : ''}`}
                placeholder="Enter your phone number"
                maxLength={20}
              />
              {errors.phoneNumber && (
                <span className="application-form__error">
                  <AlertCircle className="application-form__error-icon" />
                  {errors.phoneNumber}
                </span>
              )}
            </div>

            <div className="application-form__field">
              <Label htmlFor="passionAge" className="application-form__label">
                At what age did you realize your passion?
              </Label>
              <Input
                id="passionAge"
                type="number"
                inputMode="numeric"
                pattern="\\d*"
                min={1}
                max={100}
                step={1}
                value={formData.passionAge}
                onChange={(e) => handlePassionAgeChange(e.target.value)}
                onBlur={handlePassionAgeBlur}
                onPaste={handlePassionAgePaste}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  // Allow control keys, navigation, backspace, etc.
                  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                  if (allowedKeys.includes(e.key)) return;

                  // Only allow digit keys
                  if (!/^[0-9]$/.test(e.key)) {
                    e.preventDefault();
                    return;
                  }

                  // Prevent entering a digit that would make the value > 100
                  const input = e.currentTarget as HTMLInputElement;
                  const selectionStart = input.selectionStart ?? 0;
                  const selectionEnd = input.selectionEnd ?? 0;
                  const current = input.value || '';
                  // Compose the would-be value after the key press
                  const wouldBe = current.slice(0, selectionStart) + e.key + current.slice(selectionEnd);
                  const digitsOnly = wouldBe.replace(/\D+/g, '');
                  const num = Number(digitsOnly);
                  if (!Number.isNaN(num) && num > 100) {
                    e.preventDefault();
                  }
                }}
                className={`application-form__input ${errors.passionAge ? 'application-form__input--error' : ''}`}
                placeholder="Enter age"
              />
              {errors.passionAge && (
                <span className="application-form__error">
                  <AlertCircle className="application-form__error-icon" />
                  {errors.passionAge}
                </span>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="application-form__step">
            <h3 className="application-form__step-title">Interests & Career</h3>

            <div className="application-form__field">
              <Label htmlFor="interests" className="application-form__label">
                What are your interests in the art?
              </Label>
              <Textarea
                id="interests"
                value={formData.interests}
                onChange={(e) => handleInputChange('interests', e.target.value)}
                className="application-form__textarea"
                placeholder="Describe your interests in the art..."
                rows={3}
                maxLength={500}
              />
            </div>

            <div className="application-form__field">
              <Label htmlFor="careerEnhancement" className="application-form__label">
                What are you doing now to enhance your career? *
              </Label>
              <Textarea
                id="careerEnhancement"
                value={formData.careerEnhancement}
                onChange={(e) => handleInputChange('careerEnhancement', e.target.value)}
                className={`application-form__textarea ${errors.careerEnhancement ? 'application-form__input--error' : ''}`}
                placeholder="Describe what you're currently doing to enhance your career..."
                rows={4}
                maxLength={1000}
              />
              {errors.careerEnhancement && (
                <span className="application-form__error">
                  <AlertCircle className="application-form__error-icon" />
                  {errors.careerEnhancement}
                </span>
              )}
            </div>

            <div className="application-form__field">
              <Label htmlFor="careerGoals" className="application-form__label">
                What would you love to do in your area of interest(s)? *
              </Label>
              <Textarea
                id="careerGoals"
                value={formData.careerGoals}
                onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                className={`application-form__textarea ${errors.careerGoals ? 'application-form__input--error' : ''}`}
                placeholder="Describe what you'd love to do in your area of interest..."
                rows={4}
                maxLength={1000}
              />
              {errors.careerGoals && (
                <span className="application-form__error">
                  <AlertCircle className="application-form__error-icon" />
                  {errors.careerGoals}
                </span>
              )}
            </div>

            <div className="application-form__field">
              <Label htmlFor="challenges" className="application-form__label">
                What challenges have you faced in honing your talent?
              </Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => handleInputChange('challenges', e.target.value)}
                className="application-form__textarea"
                placeholder="Describe any challenges you've faced..."
                rows={4}
                maxLength={1000}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="application-form__step">
            <h3 className="application-form__step-title">Agency & Legal</h3>

            <div className="application-form__field">
              <Label className="application-form__label">
                Are you currently signed with other agencies? *
              </Label>
              <RadioGroup
                value={formData.signedWithAgencies}
                onValueChange={(value) => handleInputChange('signedWithAgencies', value)}
                className="application-form__radio-group"
              >
                <div className="application-form__radio-item">
                  <RadioGroupItem value="yes" id="agencies-yes" />
                  <Label htmlFor="agencies-yes">Yes</Label>
                </div>
                <div className="application-form__radio-item">
                  <RadioGroupItem value="no" id="agencies-no" />
                  <Label htmlFor="agencies-no">No</Label>
                </div>
              </RadioGroup>
              {errors.signedWithAgencies && (
                <span className="application-form__error">
                  <AlertCircle className="application-form__error-icon" />
                  {errors.signedWithAgencies}
                </span>
              )}
            </div>

            {formData.signedWithAgencies === 'yes' && (
              <div className="application-form__field">
                <Label htmlFor="agencyNames" className="application-form__label">
                  If yes, which ones?
                </Label>
                <Input
                  id="agencyNames"
                  type="text"
                  value={formData.agencyNames}
                  onChange={(e) => handleInputChange('agencyNames', e.target.value)}
                  className="application-form__input"
                  placeholder="List the agencies you're signed with"
                  maxLength={200}
                />
              </div>
            )}

            <div className="application-form__field">
              <Label className="application-form__label">
                Have you ever been convicted of a crime or felony? *
              </Label>
              <RadioGroup
                value={formData.criminalRecord}
                onValueChange={(value) => handleInputChange('criminalRecord', value)}
                className="application-form__radio-group"
              >
                <div className="application-form__radio-item">
                  <RadioGroupItem value="yes" id="criminal-yes" />
                  <Label htmlFor="criminal-yes">Yes</Label>
                </div>
                <div className="application-form__radio-item">
                  <RadioGroupItem value="no" id="criminal-no" />
                  <Label htmlFor="criminal-no">No</Label>
                </div>
              </RadioGroup>
              {errors.criminalRecord && (
                <span className="application-form__error">
                  <AlertCircle className="application-form__error-icon" />
                  {errors.criminalRecord}
                </span>
              )}
            </div>

            {formData.criminalRecord === 'yes' && (
              <div className="application-form__field">
                <Label htmlFor="criminalDetails" className="application-form__label">
                  If yes, when and why?
                </Label>
                <Textarea
                  id="criminalDetails"
                  value={formData.criminalDetails}
                  onChange={(e) => handleInputChange('criminalDetails', e.target.value)}
                  className="application-form__textarea"
                  placeholder="Please provide details about when and why..."
                  rows={3}
                  maxLength={500}
                />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="application-form__step">
            <h3 className="application-form__step-title">Measurements & Photo</h3>

            <div className="application-form__field">
              <Label htmlFor="photo" className="application-form__label">
                Add a photo
              </Label>
              <div className="application-form__file-upload">
                <input
                  id="photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileUpload}
                  className="application-form__file-input"
                />
                <Label htmlFor="photo" className="application-form__file-label">
                  <Upload className="application-form__upload-icon" />
                  {formData.photo ? formData.photo.name : "Choose File"}
                </Label>
                <span className="application-form__file-status">
                  {formData.photo ? "File selected" : "No file chosen"}
                </span>
              </div>
              {errors.photo && (
                <span className="application-form__error">
                  <AlertCircle className="application-form__error-icon" />
                  {errors.photo}
                </span>
              )}
            </div>

            <div className="application-form__measurements">
              <div className="application-form__field">
                <Label htmlFor="waist" className="application-form__label">Waist</Label>
                <Input
                  id="waist"
                  type="text"
                  value={formData.waist}
                  onChange={(e) => handleInputChange('waist', e.target.value)}
                  className="application-form__input"
                  placeholder="e.g. 28"
                  maxLength={3}
                />
              </div>

              <div className="application-form__field">
                <Label htmlFor="chest" className="application-form__label">Chest *</Label>
                <Input
                  id="chest"
                  type="text"
                  value={formData.chest}
                  onChange={(e) => handleInputChange('chest', e.target.value)}
                  className={`application-form__input ${errors.chest ? 'application-form__input--error' : ''}`}
                  placeholder="e.g. 36"
                  maxLength={3}
                />
                {errors.chest && (
                  <span className="application-form__error">
                    <AlertCircle className="application-form__error-icon" />
                    {errors.chest}
                  </span>
                )}
              </div>

              <div className="application-form__field">
                <Label htmlFor="hips" className="application-form__label">Hips</Label>
                <Input
                  id="hips"
                  type="text"
                  value={formData.hips}
                  onChange={(e) => handleInputChange('hips', e.target.value)}
                  className="application-form__input"
                  placeholder="e.g. 34"
                  maxLength={3}
                />
              </div>

              <div className="application-form__field">
                <Label htmlFor="inseam" className="application-form__label">Inseam</Label>
                <Input
                  id="inseam"
                  type="text"
                  value={formData.inseam}
                  onChange={(e) => handleInputChange('inseam', e.target.value)}
                  className="application-form__input"
                  placeholder="e.g. 32"
                  maxLength={3}
                />
              </div>

              <div className="application-form__field">
                <Label htmlFor="shoe" className="application-form__label">Shoe</Label>
                <Input
                  id="shoe"
                  type="text"
                  value={formData.shoe}
                  onChange={(e) => handleInputChange('shoe', e.target.value)}
                  className="application-form__input"
                  placeholder="e.g. 9.5"
                  maxLength={4}
                />
              </div>

              <div className="application-form__field">
                <Label htmlFor="shirt" className="application-form__label">Shirt</Label>
                <Select
                  onValueChange={(value) => handleInputChange('shirt', value)}
                  value={formData.shirt || undefined}
                >
                  <SelectTrigger className="application-form__input" aria-label="Shirt size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 backdrop-blur-xl border-white/10">
                    {['xxs','xs','s','m','l','xl','xxl','xxxl'].map(sz => (
                      <SelectItem key={sz} value={sz} className="text-white hover:bg-white/10">{sz.toUpperCase()}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="application-form__field">
                <Label htmlFor="suit" className="application-form__label">Suit</Label>
                <Input
                  id="suit"
                  type="text"
                  value={formData.suit}
                  onChange={(e) => handleInputChange('suit', e.target.value)}
                  className="application-form__input"
                  placeholder="e.g. 40R"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  // Render success message
  if (isSubmitted) {
    return (
      <section id="application-form" className={`application-form ${className}`}>
        <div className="application-form__container">
          <div className="application-form__success">
            <div className="application-form__success-icon">
              <Check />
            </div>
            <h2 className="application-form__success-title">Application Submitted Successfully!</h2>
            <p className="application-form__success-message">
              Thank you for your application. We have received your information and will review it shortly.
              You should receive a confirmation email within the next few minutes.
            </p>
            <p className="application-form__success-note">
              Our team will contact you within 3-5 business days to discuss next steps.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="application-form" data-current-step={currentStep} className={`application-form ${className}`}>
      <div className="application-form__container">
        {/* Form Header */}
        <div className="application-form__header">
          <h2 className="application-form__title">Join Our Talent Network</h2>
          <p className="application-form__description">
            Take the first step towards your modeling career. Complete this application to become part of our exclusive talent roster.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="application-form__progress">
          <div className="application-form__progress-bar">
            <div
              className="application-form__progress-fill"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <span className="application-form__progress-text">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        {/* Form Content */}
        <div className="application-form__content">
          {renderStepContent()}

          {/* Submit Error */}
          {errors.submit && (
            <div className="application-form__submit-error">
              <AlertCircle className="application-form__error-icon" />
              {errors.submit}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="application-form__navigation">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="application-form__nav-button application-form__nav-button--previous"
                disabled={isSubmitting}
              >
                <ArrowLeft className="application-form__nav-icon" />
                Previous
              </Button>
            )}

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={handleNext}
                className="application-form__nav-button application-form__nav-button--next"
                disabled={isSubmitting}
              >
                Next
                <ArrowRight className="application-form__nav-icon" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="application-form__nav-button application-form__nav-button--submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
