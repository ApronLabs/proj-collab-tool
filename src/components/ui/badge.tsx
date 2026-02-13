import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-700",
        primary: "bg-brand/10 text-brand",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        error: "bg-error/10 text-error",
        "solid-primary": "bg-brand text-white",
        "solid-success": "bg-success text-white",
        "solid-warning": "bg-warning text-white",
        "solid-error": "bg-error text-white",
        outline: "border border-gray-200 text-gray-700 bg-white",
        "outline-primary": "border border-brand text-brand bg-white",
      },
      size: {
        sm: "text-2xs px-1.5 py-0.5 rounded",
        default: "text-xs px-2 py-0.5 rounded",
        lg: "text-sm px-2.5 py-1 rounded-md",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: "success" | "warning" | "error" | "default";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, dotColor = "default", children, ...props }, ref) => {
    const dotColorClass = { default: "bg-gray-400", success: "bg-success", warning: "bg-warning", error: "bg-error" }[dotColor];

    return (
      <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
        {dot && <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", dotColorClass)} />}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
