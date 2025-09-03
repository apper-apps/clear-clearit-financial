import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "default", 
  className, 
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
primary: "bg-primary hover:bg-accent text-white shadow-lg hover:shadow-xl focus:ring-primary/50",
    secondary: "bg-surface border border-slate-300 text-text-primary hover:bg-slate-50 hover:border-slate-400 shadow-sm hover:shadow-md focus:ring-slate/50",
ghost: "text-text-secondary hover:text-text-primary hover:bg-slate-100 focus:ring-slate/50",
    danger: "bg-error hover:bg-red-600 text-white shadow-lg hover:shadow-xl focus:ring-error/50",
success: "bg-success hover:bg-accent text-white shadow-lg hover:shadow-xl focus:ring-success/50"
  };
  
  const sizes = {
    small: "px-3 py-1.5 text-sm rounded-md",
    default: "px-4 py-2 text-sm rounded-lg",
    large: "px-6 py-3 text-base rounded-lg"
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "transform-none hover:transform-none",
        !disabled && "hover:scale-105 active:scale-95",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;