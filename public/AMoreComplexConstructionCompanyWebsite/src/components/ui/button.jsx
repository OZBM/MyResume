import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.cloneElement : "button";
    
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-white hover:bg-primary/90": variant === "default",
            "bg-secondary text-white hover:bg-secondary/90": variant === "secondary",
            "bg-transparent border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "bg-accent text-accent-foreground hover:bg-accent/80": variant === "accent",
            "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
            "bg-background hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "bg-background text-primary underline-offset-4 hover:underline": variant === "link",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-12 rounded-md px-8": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
