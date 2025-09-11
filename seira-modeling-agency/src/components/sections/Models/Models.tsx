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
      name: "Erick Jaegar",
      categories: ["Fashion", "Travel", "Executive Business"],
      image: "https://ext.same-assets.com/1679466695/3997942304.jpeg"
    },
    {
      id: "2",
      name: "Marc Kalega Zayn",
      categories: ["Fashion", "Beauty", "Travel"],
      image: "https://ext.same-assets.com/1679466695/1482852206.jpeg"
    },
    {
      id: "3",
      name: "Vivian Dorman",
      categories: ["Travel", "Executive Business"],
      image: "https://ext.same-assets.com/1679466695/2438349505.png"
    },
    {
      id: "4",
      name: "Amelia Putri",
      categories: ["Travel", "Fashion", "Executive Business"],
      image: "https://ext.same-assets.com/1679466695/2551523937.jpeg"
    },
    {
      id: "5",
      name: "Bella Norway",
      categories: ["Executive Business", "Travel", "Beauty"],
      image: "https://ext.same-assets.com/1679466695/2585686575.jpeg"
    },
    {
      id: "6",
      name: "Salisa Fergucio",
      categories: ["Executive Business", "Travel"],
      image: "https://ext.same-assets.com/1679466695/3381550190.jpeg"
    },
    {
      id: "7",
      name: "Nicky Gracia",
      categories: ["Travel", "Fashion", "Beauty"],
      image: "https://ext.same-assets.com/1679466695/3092641256.png"
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
