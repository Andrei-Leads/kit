import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-boton border font-mono whitespace-nowrap", {
  variants: {
    variant: {
      /* Chip de estado del hero («Urgencias 24 h», «Llegamos en 60 min»): contorno tinta 1 px,
         mono 13 px y cuadradito de aviso (decorativo) delante. */
      estado:
        "gap-2 border-tinta px-2.5 py-[5px] text-[13px] leading-[1.3] font-medium before:size-2 before:flex-none before:bg-aviso before:outline before:outline-1 before:outline-tinta before:content-['']",
      /* Etiqueta neutra (zonas, marcas): contorno regla, no es un control. */
      etiqueta: "border-regla px-2.5 py-[5px] text-[13px] leading-[1.3] font-medium text-tinta",
    },
  },
  defaultVariants: {
    variant: "estado",
  },
});

/** Etiqueta no interactiva (<span>). Para un enlace o botón, usa buttonVariants. */
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
