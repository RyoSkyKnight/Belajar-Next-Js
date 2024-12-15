import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string; // Opsional, untuk menambahkan kelas kustom
  variant?: 'primary' | 'secondary' | 'outline'; // Variasi gaya tombol
  isLoading?: boolean; // Menampilkan indikator loading
}

export default function Button({
  className = '',
  variant = 'primary',
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  // Tentukan gaya berdasarkan varian
  const baseStyles = `
    px-4
    py-2
    font-medium
    rounded-lg
    transition-all
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
  `;

  const variants = {
    primary: `bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500`,
    secondary: `bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500`,
    outline: `border border-gray-500 text-gray-500 hover:bg-gray-100 focus:ring-gray-500`,
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={isLoading || props.disabled} // Disabled jika loading
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4 inline-block"></span>
      ) : (
        children
      )}
    </button>
  );
}
