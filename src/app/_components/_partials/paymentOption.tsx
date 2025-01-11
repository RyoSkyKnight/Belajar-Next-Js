import React from 'react'
import Image from 'next/image'

interface PaymentOptionProps {
  id: string
  value: string
  checked: boolean
  icon: string
  label: string
  className?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PaymentOption({
  id,
  value,
  checked,
  icon,
  label,
  className = '',
  onChange
}: PaymentOptionProps) {
  return (
    <div
      className={`flex items-center space-x-4 rounded-lg border p-3 transition-all duration-200 
      ${checked ? 'border-main-color text-black bg-main-color shadow-md' : 'border-gray-400 bg-white text-gray-700'} 
      hover:shadow-lg cursor-pointer ${className}`}
    >
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden" // Hidden untuk menggunakan klik pada label
      />
      <label
        htmlFor={id}
        className="flex flex-1 cursor-pointer w-full items-center justify-between"
      >
        <div className="flex items-center space-x-3  ">
          <Image
            src={icon}
            alt=""
            width={42}
            height={32} 
            className={` h-10 w-10 ${ checked ? 'bg-white rounded-full p-1.5 ' : '' }`} 
          />
          <span
            className={`font-medium ${
              checked ? 'text-white' : 'text-gray-800'
            }`}
          >
            {label}
          </span>
        </div>
      </label>
    </div>
  )
}
