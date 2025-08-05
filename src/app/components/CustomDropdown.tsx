"use client";

import { ReactNode } from 'react';

interface Option {
  value: string;
  label: string;
  icon: ReactNode;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isOpen: boolean; // Controlled from parent
  onToggle: () => void; // Controlled from parent
}

export default function CustomDropdown({ options, value, onChange, placeholder, isOpen, onToggle }: CustomDropdownProps) {
  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    onToggle(); // Close dropdown after selection
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="w-full flex justify-between items-center p-4 bg-slate-100/80 border-2 border-transparent rounded-2xl text-slate-800 font-semibold transition-all hover:border-slate-300"
        onClick={onToggle}
      >
        <span className="flex items-center gap-3">
          {selectedOption?.icon}
          {selectedOption?.label || placeholder}
        </span>
        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        // Added z-index to be safe, but parent z-index is the main fix
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg z-30 overflow-hidden">
          {options.map(option => (
            <div
              key={option.value}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-indigo-100"
              onClick={() => handleSelect(option)}
            >
              {option.icon}
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}