import React from "react";
import { useProductFilter } from "../components/useProdcutfilter";
import { FilterSection } from "../components/filter-section";
import { SearchBar } from "../components/searchbar";
import { ProductGrid } from "../components/product-grid";
import { mockProducts } from "../consts/data";
import { IoIosClose } from "react-icons/io";

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string[];
  inStock: boolean;
  popularity: number;
  dateAdded: string;
}

export interface FilterState {
  search: string;
  priceRange: [number, number];
  categories: string[];
  rating: number;
  inStock: boolean | null;
  sortBy: "popularity" | "price-asc" | "price-desc" | "newest";
}

const ProductBrowser: React.FC = () => {
  const {
    filters,
    updateFilter,
    products,
    loading,
    categorySuggestions,
    priceRange,
  } = useProductFilter();

  const getAllCategories = () => {
    const categories = new Set<string>();
    mockProducts.forEach((product) => {
      product.category.forEach((cat) => categories.add(cat));
    });
    return Array.from(categories).sort();
  };

  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Browser</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar
            value={filters.search}
            onChange={(value) => updateFilter("search", value)}
            suggestions={categorySuggestions}
          />
        </div>
        <div className="md:w-48">
          <select
            className="w-full px-4 py-2 border"
            value={filters.sortBy}
            onChange={(e) =>
              updateFilter("sortBy", e.target.value as FilterState["sortBy"])
            }
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => {
                updateFilter("search", "");
                updateFilter("priceRange", priceRange);
                updateFilter("categories", []);
                updateFilter("rating", 0);
                updateFilter("inStock", null);
              }}
            >
              Reset All
            </button>
          </div>
          <FilterSection
            filters={filters}
            updateFilter={updateFilter}
            allCategories={getAllCategories()}
            priceRange={priceRange}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Chip
                  label={`Search: ${filters.search}`}
                  onDelete={() => updateFilter("search", "")}
                />
              )}
              {filters.categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onDelete={() =>
                    updateFilter(
                      "categories",
                      filters.categories.filter((c) => c !== category)
                    )
                  }
                />
              ))}
              {filters.rating > 0 && (
                <Chip
                  label={`${filters.rating}+ Stars`}
                  onDelete={() => updateFilter("rating", 0)}
                />
              )}
              {filters.inStock !== null && (
                <Chip
                  label={filters.inStock ? "In Stock" : "Out of Stock"}
                  onDelete={() => updateFilter("inStock", null)}
                />
              )}
            </div>
          </div>
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
};

const Chip: React.FC<{ label: string; onDelete: () => void }> = ({
  label,
  onDelete,
}) => {
  return (
    <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
      <span>{label}</span>
      <button onClick={onDelete} className="ml-1">
        <IoIosClose />
      </button>
    </div>
  );
};

export default ProductBrowser;
