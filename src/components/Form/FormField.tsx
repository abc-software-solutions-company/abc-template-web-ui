import * as React from "react"
import { cn } from "../../lib/utils"

export interface FormFieldProps {
  children: React.ReactNode
  error?: string
  className?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  children,
  error,
  className
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
      {error && (
        <p className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}