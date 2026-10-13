import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Variantes de botón del diseño «Reparaciones».
 * Se usan con <Button> y como className de BotonLlamada / BotonWhatsApp de core
 * (core pone el comportamiento; el aspecto sale de aquí).
 * Las de llamada grandes llevan dentro <ContenidoLlamada>.
 */
const buttonVariants = cva(
  "rounded-md no-underline transition-[filter,background-color,border-color,padding] select-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /* Hero y contacto: bloque de dos líneas, ≥ 76 px. */
        llamadaHero:
          "flex min-h-[76px] items-center justify-start gap-3.5 bg-primario px-4 py-2.5 text-left text-sobre-primario shadow-boton hover:brightness-110",
        /* CTA final, solo sobre primario. */
        llamadaHeroBlanca:
          "flex min-h-[76px] items-center justify-start gap-3.5 bg-tarjeta px-4 py-2.5 text-left text-primario shadow-boton hover:brightness-95",
        whatsappHero:
          "flex min-h-[52px] items-center justify-center gap-2.5 border-2 border-tinta bg-tarjeta px-4 text-[17px] font-semibold text-tinta hover:bg-papel",
        llamadaCabecera:
          "inline-flex min-h-11 items-center justify-center gap-2 bg-primario px-3.5 text-[17px] font-bold text-sobre-primario hover:brightness-110 md:min-h-12 md:px-4 md:tabular-nums",
        barraLlamar:
          "flex min-h-14 flex-1 items-center justify-center gap-2 bg-primario text-lg font-bold text-sobre-primario hover:brightness-110",
        barraWhatsapp:
          "flex min-h-14 flex-1 items-center justify-center gap-2 bg-tinta text-lg font-bold text-white hover:brightness-125",
        /* Fila-enlace: hover/foco = borde izquierdo de 6 px en primario (el padding baja 4 px para no saltar). */
        filaAveria:
          "relative flex min-h-[68px] w-full items-center gap-3.5 border-2 border-tinta bg-tarjeta py-3 pr-4 pl-3.5 text-tinta shadow-placa hover:border-l-6 hover:border-l-primario hover:pl-2.5 focus-visible:border-l-6 focus-visible:border-l-primario focus-visible:pl-2.5",
        llamadaServicio:
          "flex min-h-[76px] w-full items-center justify-start gap-3.5 bg-primario px-4 py-2.5 text-left text-sobre-primario shadow-boton hover:brightness-110",
        enlaceMedida:
          "inline-flex min-h-11 items-center gap-2 rounded-none font-bold text-tinta underline underline-offset-4 hover:decoration-2",
        llamadaSheet:
          "flex min-h-16 w-full items-center justify-center gap-3 bg-primario px-4 text-[22px] font-extrabold tabular-nums text-sobre-primario hover:brightness-110",
        llamadaPequena:
          "inline-flex min-h-11 items-center justify-center gap-2 bg-primario px-4 font-semibold text-sobre-primario hover:brightness-110",
        llamadaTrabajo:
          "flex min-h-[60px] w-full items-center justify-center gap-3 bg-primario px-4 text-[22px] font-extrabold tabular-nums text-sobre-primario hover:brightness-110",
        whatsappSecundario:
          "flex min-h-[52px] w-full items-center justify-center gap-2.5 border-2 border-tinta bg-tarjeta px-4 text-[17px] font-semibold text-tinta hover:bg-papel",
        whatsappContornoBlanco:
          "flex min-h-[52px] items-center justify-center gap-2.5 border-2 border-white bg-transparent px-4 text-[17px] font-semibold text-white hover:bg-white/10",
        whatsappAsistente:
          "flex min-h-14 w-full items-center justify-center gap-2.5 bg-tinta px-4 py-2 text-center text-[17px] font-semibold text-white hover:brightness-125",
      },
    },
    defaultVariants: {
      variant: "llamadaPequena",
    },
  }
);

function Button({
  className,
  variant,
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
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
