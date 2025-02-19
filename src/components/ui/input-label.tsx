"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  rightLabel?: string
}

const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(
  ({ className, label, rightLabel, type, ...props }, ref) => {
    return (
      <div className="relative">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="relative">
          <Input
            type={type}
            className={cn(
              rightLabel && "pr-8",
              "transition-all duration-100 ease-in-out focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
              className,
            )}
            ref={ref}
            {...props}
          />
          {rightLabel && (
            <span className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground pointer-events-none">
              {rightLabel}
            </span>
          )}
        </div>
      </div>
    )
  },
)
InputLabel.displayName = "CustomInput"

export { InputLabel }