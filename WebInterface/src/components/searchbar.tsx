import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { IoSearch } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  debounceTime?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  suggestions,
  debounceTime = 300,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedOnChange = useCallback(debounce(onChange, debounceTime), [
    onChange,
    debounceTime,
  ]);

  useEffect(() => {
    debouncedOnChange(localValue);
    return () => debouncedOnChange.cancel();
  }, [localValue, debouncedOnChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalValue(suggestion);
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 pl-10 border"
          placeholder="Search products..."
          value={localValue}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IoSearch size={20} />
        </div>
        {localValue && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => {
              setLocalValue("");
              onChange("");
            }}
          >
            <IoIosClose size={20} />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center">
                  <MdOutlineKeyboardArrowRight size={17} />
                  <span>{suggestion}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
