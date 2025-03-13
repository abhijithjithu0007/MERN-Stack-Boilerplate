import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  readOnly?: boolean;
  onChange?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  readOnly = true,
  onChange,
}) => {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (value: number) => {
    if (!readOnly && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center">
      {stars.map((star) => (
        <span
          key={star}
          className={`text-xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          } 
                      ${!readOnly ? "cursor-pointer" : ""}`}
          onClick={() => handleClick(star)}
        >
          {star <= rating ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
};
