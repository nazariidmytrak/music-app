'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = 'button', ...props }, ref) => {
    const buttonClasses = twMerge(
      `w-full px-3 py-3 rounded-full bg-green-500 text-black font-bold border border-transparent transition 
      disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-75`,
      className
    );
    return (
      <button
        className={buttonClasses}
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
