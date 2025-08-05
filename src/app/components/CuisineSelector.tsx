"use client";

import React, { ReactNode } from 'react';

// Define the shape of each option
interface CuisineOption {
  value: string;
  label: string;
  icon: ReactNode;
}

// Define the props for our new component
interface CuisineSelectorProps {
  options: CuisineOption[];
  selectedCuisines: string[];
  onChange: (selected: string[]) => void;
}

export default React.memo(function CuisineSelector({ options, selectedCuisines, onChange }: CuisineSelectorProps) {
  
  const handleToggle = (cuisineValue: string) => {
    const newSelection = selectedCuisines.includes(cuisineValue)
      ? selectedCuisines.filter(item => item !== cuisineValue)
      : [...selectedCuisines, cuisineValue];
    
    onChange(newSelection);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selectedCuisines.includes(option.value);
        return (
          <button
            type="button"
            key={option.value}
            onClick={() => handleToggle(option.value)}
            className={`
              inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium
              transition-all duration-150 ease-in-out border-2
              ${isSelected 
                ? 'bg-teal-500 text-white border-teal-500 shadow-md' 
                : 'bg-white/80 text-slate-700 border-slate-200 hover:bg-white hover:border-teal-300 hover:shadow-sm'
              }
            `}
          >
            <span className="text-base">{option.icon}</span>
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
});