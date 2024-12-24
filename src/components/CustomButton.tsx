"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { TextShimmer } from "./ui/text-shimmer";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  text: string;
  textClassName?: string;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      text,
      textClassName,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const [hover, setHover] = React.useState(false);
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        {...props}
      >
        <TextShimmer
          duration={hover ? 1 : 0}
          className={cn(
            "text-xl [--base-color:hsl(var(--primary-foreground))] [--base-gradient-color:theme(colors.rose.400)] dark:[--base-color:hsl(var(--primary-foreground))] dark:[--base-gradient-color:theme(colors.rose.400)]",
            textClassName,
          )}
          // className={
          //   "dark:hover:[--base-color:theme(colors.blue.400)] dark:hover:[--base-gradient-color:theme(colors.blue.700)]",
          //   "[--base-color:theme(colors.red.600)] [--base-gradient-color:theme(colors.red.200)] dark:[--base-color:theme(colors.amber.700)] dark:[--base-gradient-color:theme(colors.amber.700)]",
          // }
        >
          {text}
        </TextShimmer>
      </Comp>
    );
  },
);
CustomButton.displayName = "CustomButton";

export { CustomButton, buttonVariants };
