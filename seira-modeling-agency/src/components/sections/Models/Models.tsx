"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Model, ModelCategory } from "@/types";
import "./Models.css";

interface ModelsProps {
  className?: string;
}

const ModelsSection: React.FC<ModelsProps> = ({ className = "" }) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters: (string | ModelCategory)[] = ["All", "Travel", "Fashion", "Beauty", "Executive Business"];

  const models: Model[] = [
    {
      id: "1",
      name: "Michael",
      categories: ["Fashion", "Travel"],
      image: "/Michael.png"
    },
    {
      id: "2",
      name: "Nisani",
      categories: ["Beauty", "Executive Business"],
      image: "/Nisani.png"
    },
    {
      id: "3",
      name: "Zahra",
      categories: ["Travel", "Fashion"],
      image: "/Zahra.png"
    }
  ];

  const filteredModels: Model[] = activeFilter === "All"
    ? models
    : models.filter(model => model.categories.includes(activeFilter as ModelCategory));

  const handleFilterChange = (filter: string): void => {
    setActiveFilter(filter);
  };

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
                  activeFilter === filter ? 'models__filter--active' : ''
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
            <div
              key={model.id}
              className="models__card"
            >
              <div className="models__image-container">
                <img
                  src={model.image}
                  alt={model.name}
                  className="models__image"
                  loading="lazy"
                />
              </div>

              <div className="models__info">
                <h3 className="models__name">{model.name}</h3>
                <div className="models__categories">
                  {model.categories.map((category, categoryIndex) => (
                    <Badge
                      key={categoryIndex}
                      variant="secondary"
                      className="models__category-badge"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
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
