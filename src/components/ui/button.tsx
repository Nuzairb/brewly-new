import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 rounded-md",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md",
        link: "text-primary underline-offset-4 hover:underline rounded-md",
        
        // Sidebar variants - EXACT specs from sidebar
        sidebar: "bg-transparent hover:bg-[#00674E1A] rounded-lg transition-all",
        sidebarActive: "bg-[#00674E1A] rounded-lg transition-all",
        sidebarMobile: "bg-transparent hover:bg-[#00674E1A] rounded-lg transition-all", 
        sidebarMobileActive: "bg-[#00674E1A] rounded-lg transition-all",
        sidebarHelp: "bg-transparent transition-all",
        
        // PageHeader variants - for header action buttons
        pageHeaderPrimary: "bg-gradient-to-r from-[#007256] from-8.52% to-[#00A57D] to-91.48% text-white hover:opacity-90 rounded-[8px] border-none",
        pageHeaderSecondary: "bg-transparent text-[#1A5D4A] hover:bg-[#1A5D4A0A] border border-[#1A5D4A] rounded-[8px]",
        bundlesHeaderPrimary: "bg-[#1A5D4A] text-[#FAF8F3] border-none rounded-[8px] hover:opacity-90 transition-opacity",
        bundlesHeaderSecondary: "bg-transparent text-[#00674E] border border-[#1A5D4A] rounded-[8px] hover:bg-[#1A5D4A]/5 transition-colors",
        aiFilter: "bg-transparent text-[#787777] border border-[#D0D3D9] rounded-[8px] hover:bg-gray-50  transition-colors",
        aiTabActive: "bg-transparent text-[#00674E] border-b-2 border-[#00674E] font-lato font-medium text-[14px] pb-[9px]",
        aiTabInactive: "bg-transparent text-[#787777] border-b-2 border-transparent font-lato font-medium text-[14px] pb-[9px]",
        aiCardActionActive: "bg-[#1A5D4A] text-white border border-[#00674E] rounded-[8px] font-geist font-medium text-[14px] leading-5 text-center",
        aiCardActionInactive: "bg-white text-[#787777] border border-[#EEEEEE] rounded-[8px] font-geist font-medium text-[14px] leading-5 text-center",
        aiMenuIcon: "bg-transparent p-0 w-[24px] h-[24px] relative hover:bg-accent/10",
        aiMenuItem: "bg-transparent hover:bg-[#F5F5F5] border-none rounded-[6px] font-lato font-normal text-[14px] leading-5 text-[#1E1E1E] justify-start gap-2 px-2",
        aiMenuItemDelete: "bg-transparent hover:bg-[#FEF2F2] border-none rounded-[6px] font-lato font-normal text-[14px] leading-5 text-[#E74C3C] justify-start gap-2 px-2",
        aiGoLive: "bg-white text-[#00674E] border border-[#00674E] rounded-[8px] hover:bg-[#F0FDF4] font-geist font-medium text-[14px] leading-5",
        aiSuggestionBtn: "bg-white text-[#007256] border border-[#007256] rounded-[8px] hover:bg-[#F0FDF4] font-lato font-normal text-[16px] leading-5",
        cancelBtn: "bg-white text-[#787777] border border-[#E5E7EB] rounded-[6px] hover:bg-gray-50 font-lato font-medium text-[16px] leading-5 tracking-[0.5px]",
        nextBtn: "bg-[#1A5D4A] text-white rounded-[8px] border-none hover:opacity-90 font-lato font-medium text-[16px] leading-5 tracking-[0.5px]",
        categoryTab: "bg-transparent border-none border-b-[3px] border-transparent hover:text-[#17B26A] font-lato font-medium text-[14px] leading-[26px]",
        categoryTabActive: "bg-transparent border-none border-b-[3px] border-[#17B26A] text-[#17B26A] font-lato font-medium text-[14px] leading-[26px]",
        dashboardWidget: "bg-white border-none rounded-[8px] hover:bg-gray-50 font-geist font-medium text-[14px] text-[#00674E]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        
        // Sidebar sizes - EXACT specs from sidebar
        "sidebar-desktop": "w-[52px] h-[53px] p-4", // Exact desktop button size
        "sidebar-mobile": "w-[40px] h-[40px] p-[10px]", // Exact mobile button size  
        "sidebar-help": "w-[20.5px] h-[20.5px]", // Exact help/logout button size
        
        // PageHeader sizes
        "pageHeader": "h-12 px-4 py-2 rounded-[8px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }