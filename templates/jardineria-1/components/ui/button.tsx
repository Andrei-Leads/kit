import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Variantes de botón del diseño «Rótulo».
 * Se usan con <Button> y también como className de BotonLlamada / BotonWhatsApp
 * de core (core pone el comportamiento; el aspecto sale de aquí).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 rounded-sm no-underline transition-[filter,background-color] select-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primario: "bg-primario text-sobre-primario font-extrabold shadow-boton hover:brightness-110",
        blanco:
          "bg-white text-tinta font-extrabold shadow-[inset_0_-3px_0_rgb(23_26_21/0.18)] hover:bg-tarjeta",
        "contorno-claro": "border-2 border-white text-white font-bold hover:bg-white/10",
        "contorno-tinta": "border-2 border-tinta bg-tarjeta text-tinta font-bold hover:bg-papel",
        tinta: "bg-tinta text-white font-bold hover:brightness-125",
        enlace:
          "justify-start rounded-none px-0 font-bold underline underline-offset-4 hover:decoration-2",
      },
      size: {
        sm: "min-h-11 px-4 text-[15px]",
        md: "min-h-[52px] px-5 text-[17px]",
        lg: "min-h-[60px] px-[22px] text-[19px]",
        xl: "min-h-[68px] px-[22px] text-[19px]",
        enlace: "min-h-11 text-[17px]",
      },
    },
    defaultVariants: {
      variant: "primario",
      size: "md",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
