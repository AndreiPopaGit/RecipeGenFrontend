"use client";

import { ReactNode } from 'react';

interface Option {
  value: string;
  label: string;
  icon: ReactNode;
}

interface SelectableButtonGridProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function SelectableButtonGrid({ options, selected = [], onChange }: SelectableButtonGridProps) {
  const handleSelect = (value: string) => {
    const newSelected = [...selected];
    const index = newSelected.indexOf(value);

    if (index > -1) {
      newSelected.splice(index, 1);
    } else {
      newSelected.push(value);
    }
    onChange(newSelected);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map(option => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            type="button"
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`flex items-center justify-center gap-2 p-4 rounded-2xl font-bold transition-all
              ${isSelected
                ? 'bg-teal-400 text-white shadow-md'
                : 'bg-slate-100/80 hover:bg-slate-200 text-slate-700'
              }`}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}