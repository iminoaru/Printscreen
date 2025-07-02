import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-b from-primary/90 to-primary text-primary-foreground shadow-[0_0_18px] shadow-primary/40 hover:shadow-[0_0_25px] hover:shadow-primary/40 hover:-translate-y-px active:translate-y-0 active:shadow-[0_0_18px]',
        destructive:
          'bg-destructive text-white shadow-[0_0_18px] shadow-destructive/40 hover:shadow-[0_0_25px] hover:shadow-destructive/40 hover:-translate-y-px active:translate-y-0 active:shadow-[0_0_18px] focus-visible:ring-destructive/40',
        outline: 'bg-transparent hover:bg-secondary',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[0_0_18px] shadow-black/25 hover:shadow-[0_0_25px] hover:shadow-black/25 hover:-translate-y-px active:translate-y-0 active:shadow-[0_0_18px]',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
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
