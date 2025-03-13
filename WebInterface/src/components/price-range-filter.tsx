import React, { useState } from "react";

interface PriceRangeSliderProps {
  value: [number, number];
  min: number;
  max: number;
  onChange: (value: [number, number]) => void;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  value,
  min,
  max,
  onChange,
}) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localValue[1]);
    setLocalValue([newMin, localValue[1]]);
    onChange([newMin, localValue[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localValue[0]);
    setLocalValue([localValue[0], newMax]);
    onChange([localValue[0], newMax]);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span>${localValue[0].toFixed(2)}</span>
        <span>${localValue[1].toFixed(2)}</span>
      </div>
      <div className="relative h-1 bg-gray-200 rounded-md">
        <div
          className="absolute h-1 bg-blue-500"
          style={{
            left: `${((localValue[0] - min) / (max - min)) * 100}%`,
            width: `${((localValue[1] - localValue[0]) / (max - min)) * 100}%`,
          }}
        ></div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step="0.01"
          value={localValue[0]}
          onChange={handleMinChange}
          className="absolute w-full h-1 opacity-0 cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step="0.01"
          value={localValue[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-1 opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <label htmlFor="min-price" className="text-xs text-gray-500">
            Min Price
          </label>
          <input
            id="min-price"
            type="number"
            min={min}
            max={localValue[1]}
            value={localValue[0]}
            onChange={handleMinChange}
            className="w-24 px-2 py-1 border "
          />
        </div>
        <div>
          <label htmlFor="max-price" className="text-xs text-gray-500">
            Max Price
          </label>
          <input
            id="max-price"
            type="number"
            min={localValue[0]}
            max={max}
            value={localValue[1]}
            onChange={handleMaxChange}
            className="w-24 px-2 py-1 border "
          />
        </div>
      </div>
    </div>
  );
};
