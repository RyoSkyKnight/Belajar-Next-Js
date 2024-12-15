import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string; // Kelas kustom
  variant?: 'default' | 'error' | 'success'; // Variasi gaya input
  icon?: React.ReactNode; // Opsional, ikon yang bisa ditampilkan di input
  wrapperClassName?: string; // Styling untuk wrapper
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      wrapperClassName = '',
      variant = 'default',
      icon,
      ...props
    },
    ref
  ) => {
    // Gaya dasar input
    const baseStyles = `
      bg-transparent
      border
      rounded-[10px]
      px-3
      py-2
      focus:outline-none
      focus:ring-2
      focus:ring-opacity-50
    `;

    // Variasi gaya
    const variants = {
      default: 'border-black border-opacity-40 focus:ring-black',
      error: 'border-red-500 focus:ring-red-500',
      success: 'border-green-500 focus:ring-green-500',
    };

    return (
      <div className={`flex items-center ${wrapperClassName}`}>
        {icon && <div className="mr-2">{icon}</div>}
        <input
          ref={ref}
          className={`
            ${baseStyles}
            ${variants[variant]}
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
