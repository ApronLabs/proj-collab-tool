import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400",
            "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent",
            "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
            "min-h-[100px] resize-y",
            error && "border-error focus:ring-error",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
