"use client"

import * as React from "react"

export interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled = false, className = "" }, ref) => {
    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        className={`w-10 h-6 rounded-full flex items-center border-none outline-none relative transition-colors duration-200 ${checked ? 'bg-[#00674E]' : 'bg-[#E4E4E7]'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      >
        <div
            className={`absolute top-0.5 bg-white rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-200 w-5 h-5 ${
              checked ? 'left-[18px]' : 'left-[2px]'
            }`}
        />

      </button>
    )
  }
)

Switch.displayName = "Switch"

export { Switch }
