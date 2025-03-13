import React from "react";
import { Product } from "../consts/data";
import { StarRating } from "./star-rating";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col overflow-hidden border rounded-lg shadow-sm">
      <div className="relative pb-2/3">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        {!product.inStock && (
          <div className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 top-2 right-2 rounded-md">
            Out of Stock
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="mb-1 text-sm font-medium text-gray-900 truncate">
          {product.name}
        </h3>
        <div className="mb-2">
          <StarRating rating={product.rating} readOnly />
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {product.category.map((cat, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
