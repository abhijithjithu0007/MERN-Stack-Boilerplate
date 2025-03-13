import { useState, useEffect, useMemo } from "react";
import { Product, FilterState } from "../consts/data";
import { mockProducts, priceRange } from "../consts/data";

export const useProductFilter = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceRange: priceRange,
    categories: [],
    rating: 0,
    inStock: null,
    sortBy: "popularity",
  });

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchId, setFetchId] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const currentFetchId = fetchId + 1;
      setFetchId(currentFetchId);
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        let filteredProducts = [...mockProducts];

        if (filters.search.trim()) {
          const searchLower = filters.search.toLowerCase();
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(searchLower) ||
              product.category.some((cat) =>
                cat.toLowerCase().includes(searchLower)
              )
          );
        }

        if (filters.categories.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            filters.categories.some((cat) => product.category.includes(cat))
          );
        }

        filteredProducts = filteredProducts.filter(
          (product) =>
            product.price >= filters.priceRange[0] &&
            product.price <= filters.priceRange[1]
        );

        if (filters.rating > 0) {
          filteredProducts = filteredProducts.filter(
            (product) => product.rating >= filters.rating
          );
        }

        if (filters.inStock !== null) {
          filteredProducts = filteredProducts.filter(
            (product) => product.inStock === filters.inStock
          );
        }

        switch (filters.sortBy) {
          case "price-asc":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case "popularity":
            filteredProducts.sort((a, b) => b.popularity - a.popularity);
            break;
          case "newest":
            filteredProducts.sort(
              (a, b) =>
                new Date(b.dateAdded).getTime() -
                new Date(a.dateAdded).getTime()
            );
            break;
        }

        if (currentFetchId === fetchId + 1) {
          setProducts(filteredProducts);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (currentFetchId === fetchId + 1) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [filters]);

  const categorySuggestions = useMemo(() => {
    if (!filters.search.trim()) return [];

    const searchLower = filters.search.toLowerCase();
    return Array.from(
      new Set(
        mockProducts
          .flatMap((p) => p.category)
          .filter((cat) => cat.toLowerCase().includes(searchLower))
      )
    );
  }, [filters.search]);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  };

  return {
    filters,
    updateFilter,
    products,
    categorySuggestions,
    loading,
    priceRange,
  };
};
