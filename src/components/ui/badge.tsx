import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        
        // Bundle status badges
        active: "w-[66px] h-[24px] rounded-[4px] border-none bg-[#10A7601A] text-[#10A760] font-lato font-normal text-[12px] leading-[20px] px-2 py-1",
        draft: "w-[66px] h-[24px] rounded-[4px] border-none bg-[#7877771A] text-[#787777] font-lato font-normal text-[12px] leading-[20px] px-2 py-1",
        pending: "w-[66px] h-[24px] rounded-[4px] border-none bg-[#FFA5001A] text-[#FFA500] font-lato font-normal text-[12px] leading-[20px] px-2 py-1",
        // Figma-specific order badges
        new: "w-[66px] h-[24px] rounded-[4px] border-none bg-[#5459EA1A] text-[#5459EA] font-lato font-normal text-[12px] leading-[20px] px-2 py-1",
        paid: "w-[66px] h-[24px] rounded-[4px] border-none bg-[#11B86C1A] text-[#10A760] font-lato font-normal text-[12px] leading-[20px] px-2 py-1",
        ready: "w-[66px] h-[24px] rounded-[4px] border-none bg-[#11B86C1A] text-[#11B86C] font-lato font-normal text-[12px] leading-[20px] px-2 py-1",
        preparing: "w-[66px] h-[24px] rounded-[4px] border-none bg-[#FFF7ED] text-[#FF800A] font-lato font-normal text-[12px] leading-[20px] px-2 py-1",
        served: "w-[66px] h-[24px] rounded-[4px] border-none bg-[#EFF6FF] text-[#2563EB] font-lato font-normal text-[12px] leading-[20px] px-2 py-1",
        paymentProcessing: "h-[24px] rounded-[4px] border-none bg-[#FF800A1A] text-[#FF800A] font-lato font-normal text-[12px] leading-[20px] px-3 py-1 whitespace-nowrap",
        cancelled: "w-[66px] h-[24px] rounded-[4px] border-none bg-[#FF23111A] text-[#FF2311] font-lato font-normal text-[12px] leading-[20px] px-2 py-1",
        paymentRefunded: "h-[24px] rounded-[4px] border-none bg-[#FF800A1A] text-[#007AFF] font-lato font-normal text-[12px] leading-[20px] px-3 py-1 whitespace-nowrap",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
