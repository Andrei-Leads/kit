import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * Variantes de botón del diseño «Del barrio» (Specs §4).
 * Se usan con <Button>, con <a>/<Link> (buttonVariants) y como className de
 * BotonLlamada / BotonWhatsApp de core (core pone el comportamiento; el aspecto sale de aquí;
 * nunca asChild sobre los botones de core). Casi rectos (rounded-boton, 4 px), peso 700, área ≥ 44 px.
 * El primario siempre lleva texto blanco (text-sobre-primario). Las variantes «sobre foto» y
 * «sobre tinta» se usan dentro de un contenedor con la utilidad `sobre-foto` / `sobre-tinta`
 * (anillo de foco blanco).
 */
const base = "no-underline select-none transition-[color,background-color,filter] disabled:pointer-events-none disabled:opacity-50";
const caja = "rounded-boton font-bold";
/** Relleno primario con texto blanco. */
const relleno = "bg-primario text-sobre-primario hover:brightness-110";
/** Contorno tinta de 2 px sobre piedra o blanco. */
const contorno = "border-2 border-tinta bg-transparent text-tinta hover:bg-piedra-2";
/** Contorno blanco de 2 px sobre foto o tinta. */
const contornoBlanco = "border-2 border-white bg-transparent text-white hover:bg-white/10";

const buttonVariants = cva(base, {
  variants: {
    variant: {
      /* llamada-foto: hero (sobre foto o tinta). Blanco, ≥ 60 px, a todo el ancho en móvil. Icono + «Llamar» + número en 23 px. */
      llamadaFoto: `${caja} flex min-h-[60px] w-full items-center justify-center gap-3 bg-white px-5 py-2 text-tinta hover:bg-piedra-2 sm:w-auto sm:min-w-[300px]`,
      /* whatsapp-foto-hero: hero. Contorno blanco de 2 px, 52 px. */
      whatsappFotoHero: `${caja} flex min-h-[52px] w-full items-center justify-center gap-2.5 px-[18px] py-2 text-center font-semibold sm:w-auto ${contornoBlanco}`,
      /* llamada-cabecera: 44 px, relleno primario. Siempre visible. */
      llamadaCabecera: `${caja} inline-flex min-h-11 flex-none items-center gap-2 px-4 text-[17px] ${relleno}`,
      /* llamada-acento: reseñas, servicios y CTA de las fichas. Primario, 56 px. */
      llamadaAcento: `${caja} inline-flex min-h-14 items-center justify-center gap-2.5 px-6 py-2 text-center text-lg ${relleno}`,
      /* llamada-acento grande: /contacto. Primario, 68 px, a todo el ancho en móvil. */
      llamadaAcentoGrande: `${caja} flex min-h-[68px] w-full items-center justify-center gap-3 px-6 py-2 text-center text-xl sm:w-auto ${relleno}`,
      /* whatsapp-linea: servicios y contacto. Contorno tinta de 2 px, 52 px. */
      whatsappLinea: `${caja} flex min-h-[52px] items-center justify-center gap-2.5 px-[18px] py-2 text-center ${contorno}`,
      /* barra-menu: barra combinada. Sin relleno, 64 × 48 px, icono encima de «Menú». */
      barraMenu:
        "flex min-h-12 w-16 flex-none cursor-pointer flex-col items-center justify-center gap-px border-0 bg-transparent p-0 text-base leading-[1.1] font-semibold text-tinta no-underline select-none",
      /* barra-llamar: barra combinada. Relleno primario, 48 px. */
      barraLlamar: `${caja} flex min-h-12 flex-1 items-center justify-center gap-2 text-lg ${relleno}`,
      /* barra-whatsapp: barra combinada. Contorno tinta, 48 px. */
      barraWhatsapp: `${caja} flex min-h-12 flex-1 items-center justify-center gap-2 text-lg ${contorno}`,
      /* banda-cta: CTA final sobre tinta. Llamada en blanco (60 px) y WhatsApp con contorno blanco (60 px). */
      bandaCtaLlamar: `${caja} flex min-h-[60px] w-full flex-1 basis-[300px] items-center justify-center gap-3 bg-white px-5 py-2 text-tinta hover:bg-piedra-2`,
      bandaCtaWhatsapp: `${caja} flex min-h-[60px] flex-1 basis-[200px] items-center justify-center gap-2.5 px-[18px] py-2 text-center font-semibold ${contornoBlanco}`,
      /* Enlace de texto en tinta con subrayado primario, ≥ 48 px («Ver todos los servicios», «Ver todas en Google»). */
      enlace:
        "inline-flex min-h-12 items-center gap-2 font-bold text-tinta underline decoration-primario decoration-2 underline-offset-4 hover:decoration-4",
    },
  },
  defaultVariants: {
    variant: "whatsappLinea",
  },
});

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
