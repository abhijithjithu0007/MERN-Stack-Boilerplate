import React from "react";
import { Product } from "../consts/data";
import { ProductCard } from "./product-card";
import { FaRegSadCry } from "react-icons/fa";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
}) => {
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm animate-pulse"
          >
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="w-3/4 h-4 mb-2 bg-gray-200 rounded"></div>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-gray-200 rounded-full"
                  ></div>
                ))}
              </div>
              <div className="flex gap-1 mb-4">
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-16 h-6 bg-gray-200 rounded"></div>
                <div className="w-24 h-8 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <FaRegSadCry size={54} />

        <h3 className="mb-1 text-xl font-medium">No products found</h3>
        <p className="text-gray-500">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

ProductGrid.displayName = "ProductGrid";
