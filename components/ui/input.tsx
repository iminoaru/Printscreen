import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground transition-shadow duration-200',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-secondary-foreground',
        'placeholder:text-muted-foreground',
        'shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/60 focus-visible:shadow-[0_0_18px] focus-visible:shadow-primary/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-destructive/50 aria-[invalid=true]:shadow-[0_0_18px] aria-[invalid=true]:shadow-destructive/40',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
