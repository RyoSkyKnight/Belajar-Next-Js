import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]; // Data dropdown
  className?: string; // Kelas tambahan untuk styling kustom
}

export default function Select({ options, className = "", ...props }: SelectProps) {
  return (
    <select
      className={`
      w-full
      h-10
      border
     border-black 
      border-opacity-40
    focus:ring-black
      rounded-[10px]
      px-3
      py-2
      focus:outline-none
      focus:ring-2
      focus:ring-opacity-50
        ${className}
      `}
      {...props}
    >
      <option value="" disabled selected>
        Pilih salah satu
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
