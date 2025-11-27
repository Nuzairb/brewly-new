/**
 * Custom Button Wrapper
 * This component wraps shadcn's Button while maintaining your exact design specs
 */

import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface BrewlyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ai' | 'ghost';
  children: React.ReactNode;
}

export const BrewlyButton = forwardRef<HTMLButtonElement, BrewlyButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    const variants = {
      // Primary Gradient Button (AI Suggested Bundles style)
      primary: cn(
        "bg-gradient-to-r from-[#007256] to-[#00A57D]",
        "text-white hover:opacity-90 transition-opacity",
        "h-[48px] rounded-[8px] px-4",
        "font-lato text-[18px] font-normal leading-[20px]"
      ),
      
      // Outline Button (Create Bundle style)
      outline: cn(
        "border border-[#1A5D4A] bg-transparent",
        "text-[#1A5D4A] hover:bg-[#1A5D4A0A] transition-colors",
        "h-[48px] rounded-[8px] px-4",
        "font-lato text-[18px] font-normal leading-[20px]"
      ),
      
      // AI Button with icon
      ai: cn(
        "bg-gradient-to-r from-[#007256] to-[#00A57D]",
        "text-white hover:opacity-90 transition-opacity",
        "h-[48px] rounded-[8px] px-4 gap-2",
        "font-lato text-[18px] font-normal leading-[20px]"
      ),

      // Ghost button (transparent)
      ghost: cn(
        "bg-transparent hover:bg-[#F6F6F6] transition-colors",
        "text-[#1E1E1E]",
        "h-[48px] rounded-[8px] px-4",
        "font-lato text-[16px] font-normal"
      ),
    };

    return (
      <ShadcnButton
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </ShadcnButton>
    );
  }
);

BrewlyButton.displayName = "BrewlyButton";
