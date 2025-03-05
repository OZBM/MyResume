"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";

interface GlowWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spread?: number;
  glow?: boolean;
  proximity?: number;
  inactiveZone?: number;
  borderWidth?: number;
  variant?: "default" | "white";
  blur?: number;
  className?: string;
  contentClassName?: string;
  borderRadius?: string;
  padding?: string;
  movementDuration?: number;
}

export function GlowWrapper({
  children,
  className,
  contentClassName,
  movementDuration = 2,
  spread = 80,
  glow = true,
  proximity = 128,
  inactiveZone = 0.05,
  borderWidth = 30, // Updated from 2 to 3 to match example
  variant = "default",
  blur = 4,
  borderRadius = "rounded-[1.25rem] md:rounded-[1.5rem]",
  padding = "p-2 md:p-3",
  ...props
}: GlowWrapperProps) {
  return (
    <div
      className={cn(
        "relative h-full", 
        borderRadius, 
        "border-[0.75px] border-border", 
        padding,
        className
      )}
      {...props}
    >
      <GlowingEffect
        spread={spread}
        glow={glow}
        disabled={false}
        proximity={proximity}
        inactiveZone={inactiveZone}
        borderWidth={borderWidth}
        variant={variant}
        blur={blur}
        movementDuration={movementDuration}
      />
      <div className={cn(
        "relative h-full flex flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6",
        contentClassName
      )}>
        {children}
      </div>
    </div>
  );
}
