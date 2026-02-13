import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand text-white rounded-md hover:bg-brand-hover active:bg-brand-pressed",
        destructive: "bg-error text-white rounded-md hover:opacity-90 active:opacity-80",
        outline: "border border-gray-200 bg-white text-gray-900 rounded-md hover:bg-gray-50 active:bg-gray-100",
        secondary: "bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 active:bg-gray-300",
        ghost: "text-gray-700 rounded-md hover:bg-gray-100 active:bg-gray-200",
        link: "text-brand underline-offset-4 hover:underline",
        success: "bg-success text-white rounded-md hover:opacity-90 active:opacity-80",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded",
        sm: "h-8 px-3 text-sm rounded",
        default: "h-10 px-4 text-sm rounded-md",
        lg: "h-12 px-5 text-base rounded-md",
        xl: "h-14 px-6 text-md rounded-lg",
        icon: "h-10 w-10 rounded-md",
        "icon-sm": "h-8 w-8 rounded",
        "icon-lg": "h-12 w-12 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            로딩중...
          </span>
        ) : children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
