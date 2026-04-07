import React from "react";
import { cn } from "../../lib/utils";

// Animated glowing dots loader
export function Loader({ className, size = "md" }) {
  const sizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  };
  
  const dim = sizeClasses[size];

  return (
    <div className={cn("flex space-x-1.5 items-center justify-center p-2", className)}>
      <div className={cn(`bg-zinc-400 rounded-full animate-bounce`, dim)} style={{ animationDelay: "0ms" }}></div>
      <div className={cn(`bg-zinc-400 rounded-full animate-bounce`, dim)} style={{ animationDelay: "150ms" }}></div>
      <div className={cn(`bg-zinc-400 rounded-full animate-bounce`, dim)} style={{ animationDelay: "300ms" }}></div>
    </div>
  );
}

export function Spinner({ className }) {
  return (
    <div className={cn("inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]", className)} role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
    </div>
  )
}
