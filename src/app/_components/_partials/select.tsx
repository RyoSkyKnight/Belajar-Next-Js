import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]; // Data dropdown
  className?: string; // Kelas tambahan untuk styling kustom
}

export default function Select({
  options,
  value,
  onChange,
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
      value={value} // Controlled component
      onChange={onChange}
      className={`
        w-full
        p-2
        h-10
        border
      border-black border-opacity-40
        focus:ring-black
        rounded-[10px]
        text-black
        focus:outline-none
        focus:ring-2
        focus:ring-opacity-50
        ${className}
      `}
      {...props}
    >
      <option value="" disabled>
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
