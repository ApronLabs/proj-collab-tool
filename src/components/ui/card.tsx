import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  padding?: "none" | "compact" | "default" | "relaxed";
}

export function Card({ children, className, onClick, interactive, padding = "default" }: CardProps) {
  const Component = onClick ? "button" : "div";
  const paddingClass = { none: "", compact: "p-3", default: "p-4", relaxed: "p-5" }[padding];

  return (
    <Component
      onClick={onClick}
      className={cn(
        "rounded-md bg-white shadow-sm",
        paddingClass,
        interactive && "hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors duration-150",
        onClick && "w-full text-left",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-2", className)}>{children}</div>;
}

export function CardTitle({ children, className, as: Tag = "h3" }: { children: ReactNode; className?: string; as?: "h2" | "h3" | "h4" }) {
  return <Tag className={cn("text-base font-semibold text-gray-900", className)}>{children}</Tag>;
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm text-gray-500 mt-0.5", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-3 pt-3 border-t border-gray-100", className)}>{children}</div>;
}
