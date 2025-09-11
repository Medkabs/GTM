"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/types";
import "./FAQ.css";

interface FAQProps {
  className?: string;
}

const FAQSection: React.FC<FAQProps> = ({ className = "" }) => {
  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How can I apply to be a model?",
      answer: "You can apply by submitting your portfolio, measurements, and basic details through our online application form. Our team will review your submission and contact you if you're a good fit."
    },
    {
      id: "2",
      question: "Do I need professional photos to apply?",
      answer: "No, professional photos are not required. We prefer natural, well-lit images with minimal makeup. A headshot, full-body shot, and side profile are ideal."
    },
    {
      id: "3",
      question: "How do bookings work?",
      answer: "Our agency represents models of different ages. Generally, fashion models start from 16+, while commercial and talent modeling can have a broader age range."
    },
    {
      id: "4",
      question: "Does your agency take a commission?",
      answer: "Yes! We welcome models from around the world. If you are based outside of Indonesia, we will discuss work visas and agency representation in more detail."
    },
    {
      id: "5",
      question: "Can I work with other agencies while signed with you?",
      answer: "No, we do not charge fees for model applications. If accepted, we will guide you through professional development, portfolio building, and job opportunities."
    }
  ];

  return (
    <section id="faq" className={`faq ${className}`}>
      <div className="faq__container">
        {/* Header */}
        <div className="faq__header">
          <div className="faq__subtitle">EXPLORE POSSIBILITIES</div>
          <h2 className="faq__title">
            Frequently Asked <span className="faq__title-accent">Questions</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="faq__content">
          <Accordion type="single" collapsible className="faq__accordion">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="faq__item"
              >
                <AccordionTrigger className="faq__trigger">
                  {index + 1}. {faq.question}
                </AccordionTrigger>
                <AccordionContent className="faq__content-text">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
