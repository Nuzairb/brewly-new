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
        className={className}
        style={{
          width: 40,
          height: 24,
          borderRadius: 12,
          background: checked ? "#00674E" : "#E4E4E7",
          position: "relative",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          display: "flex",
          alignItems: "center",
          border: "none",
          outline: "none",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            left: checked ? 18 : 2,
            top: 2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            transition: "left 0.2s",
          }}
        />
      </button>
    )
  }
)

Switch.displayName = "Switch"

export { Switch }
