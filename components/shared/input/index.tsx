import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, disabled, ...props }, ref) => {
    const inputClasses = twMerge(
      `flex px-3 py-3 w-full text-sm rounded-md bg-neutral-700 border border-transparent
      file:border-0 file:bg-transparent file:text-sm file:font-medium
      placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none`,
      className
    );
    return (
      <input
        className={inputClasses}
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
