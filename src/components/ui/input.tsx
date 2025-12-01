import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full min-w-0 bg-transparent outline-none transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 rounded-md border px-3 py-1 text-base shadow-xs file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        
        // Search bar variant - for header search boxes
        search: "h-[52px] rounded-[16px] border border-[#D5D6D6] bg-[#FAFAFA] px-3 font-lato font-normal text-[20px] leading-[100%] text-[#787777] placeholder:text-[#787777] placeholder:font-lato placeholder:font-normal placeholder:text-[20px]",
        
        // Bundle text input - for Create Bundle form text fields
        bundleText: "h-12 rounded-lg border border-[#EEEEEE] bg-white px-[14px] py-[10px] font-lato font-normal text-base text-[#1E1E1E] shadow-[0px_1px_2px_0px_#0A0D120D] placeholder:text-[#787777] focus:border-[#00674E] focus:ring-1 focus:ring-[#00674E]",
        
        // Bundle price input - for pricing fields
        bundlePrice: "h-12 rounded-lg border border-[#EEEEEE] bg-white px-[14px] py-[10px] font-lato font-normal text-base text-[#1E1E1E] shadow-[0px_1px_2px_0px_#0A0D120D] placeholder:text-[#787777] focus:border-[#00674E] focus:ring-1 focus:ring-[#00674E]",
        
        // Bundle date input - for date picker fields with icon space
        bundleDate: "h-12 rounded-lg border border-[#EEEEEE] bg-white pl-10 pr-[14px] py-[10px] font-lato font-normal text-base text-[#1E1E1E] shadow-[0px_1px_2px_0px_#0A0D120D] placeholder:text-[#787777] focus:border-[#00674E] focus:ring-1 focus:ring-[#00674E]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Input({ 
  className, 
  type, 
  variant,
  ...props 
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
