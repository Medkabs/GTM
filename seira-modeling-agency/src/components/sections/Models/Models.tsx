"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Model, ModelCategory } from "@/types";
import "./Models.css";

interface ModelsProps {
  className?: string;
}

const ModelsSection: React.FC<ModelsProps> = ({ className = "" }) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ensures code only renders on client
  }, []);

  const filters: (string | ModelCategory)[] = ["All", "Travel", "Fashion", "Beauty", "Executive Business"];

  const models: Model[] = [
    { id: "1", name: "Michael", categories: ["Fashion", "Travel"], image: "seira-modeling-agency/public/images/Michael.png" },
    { id: "2", name: "Nisani", categories: ["Beauty", "Executive Business"], image: "seira-modeling-agency/public/images/Nisani.png" },
    { id: "3", name: "Zahra", categories: ["Travel", "Fashion"], image: "seira-modeling-agency/public/images/Zahra.png" },
  ];

  const filteredModels: Model[] =
    activeFilter === "All"
      ? models
      : models.filter((model) => model.categories.includes(activeFilter as ModelCategory));

  const handleFilterChange = (filter: string): void => {
    setActiveFilter(filter);
  };

  if (!isClient) return null; // skip SSR

  return (
    <section id="models" className={`models ${className}`}>
      <div className="models__container">
        {/* Header */}
        <div className="models__header">
          <div className="models__subtitle">EXPLORE POSSIBILITIES</div>
          <h2 className="models__title">
            Find Your <span className="models__title-accent">Models</span>
          </h2>

          {/* Filter Tabs */}
          <div className="models__filters">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`models__filter ${
                  activeFilter === filter ? "models__filter--active" : ""
                }`}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Models Grid */}
        <div className="models__grid">
          {filteredModels.map((model) => (
            <div key={model.id} className="models__card">
              <div className="models__image-container">
                <Image
                  src={model.image}
                  alt={model.name}
                  width={400}
                  height={600}
                  className="models__image"
                  priority={false}
                />
              </div>

              <div className="models__info">
                <h3 className="models__name">{model.name}</h3>
                <div className="models__categories">
                  {model.categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="models__category-badge">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="models__no-results">
            <p className="models__no-results-text">
              No models found for the selected category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ModelsSection;
