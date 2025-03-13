import React from "react";
import { FilterState } from "../consts/data";
import { PriceRangeSlider } from "./price-range-filter";

interface FilterSectionProps {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  allCategories: string[];
  priceRange: [number, number];
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  updateFilter,
  allCategories,
  priceRange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-medium">Price Range</h3>
        <PriceRangeSlider
          value={filters.priceRange}
          min={priceRange[0]}
          max={priceRange[1]}
          onChange={(value) => updateFilter("priceRange", value)}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-medium">Categories</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {allCategories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={filters.categories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFilter("categories", [
                      ...filters.categories,
                      category,
                    ]);
                  } else {
                    updateFilter(
                      "categories",
                      filters.categories.filter((cat) => cat !== category)
                    );
                  }
                }}
              />
              <span className="ml-2 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-medium">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              checked={filters.inStock === true}
              onChange={() => updateFilter("inStock", true)}
            />
            <span className="ml-2 text-sm text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              checked={filters.inStock === false}
              onChange={() => updateFilter("inStock", false)}
            />
            <span className="ml-2 text-sm text-gray-700">Out of Stock</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              checked={filters.inStock === null}
              onChange={() => updateFilter("inStock", null)}
            />
            <span className="ml-2 text-sm text-gray-700">All</span>
          </label>
        </div>
      </div>
    </div>
  );
};
