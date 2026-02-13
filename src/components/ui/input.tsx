import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full rounded-md border bg-white text-gray-900 placeholder:text-gray-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        error: "border-error focus:ring-error",
        success: "border-success focus:ring-success",
      },
      inputSize: {
        sm: "h-9 px-3 text-sm",
        default: "h-11 px-4 text-base",
        lg: "h-13 px-4 text-md",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, label, error, helperText, leftIcon, rightIcon, disabled, ...props }, ref) => {
    const inputVariant = error ? "error" : variant;

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
        <div className="relative">
          {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{leftIcon}</div>}
          <input
            ref={ref}
            disabled={disabled}
            className={cn(inputVariants({ variant: inputVariant, inputSize }), leftIcon && "pl-10", rightIcon && "pr-10", className)}
            {...props}
          />
          {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</div>}
        </div>
        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
