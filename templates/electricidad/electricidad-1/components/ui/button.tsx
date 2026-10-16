import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * Variantes de botón del diseño «Boletín» (Specs §4).
 * Se usan con <Button>, con <a>/<Link> (buttonVariants) y como className de
 * BotonLlamada / BotonWhatsApp de core (core pone el comportamiento; el aspecto sale de aquí).
 * Botones rectos de 2 px (rounded-boton), peso 700, área ≥ 44 px. Sin sombras.
 * El primario siempre lleva texto blanco (text-sobre-primario).
 */
const base = "no-underline select-none transition-[color,background-color,filter] disabled:pointer-events-none disabled:opacity-50";
const caja = "rounded-boton font-bold";
/** Relleno primario con texto blanco. */
const relleno = "bg-primario text-sobre-primario hover:brightness-110";
/** Contorno tinta de 2 px sobre papel. */
const contorno = "border-2 border-tinta bg-transparent text-tinta hover:bg-papel-2";

const buttonVariants = cva(base, {
  variants: {
    variant: {
      /* llamada-campo: hero y /contacto. ≥ 72 px, ancho completo en móvil. LLAMAR + número en mono. */
      llamadaCampo: `${caja} flex min-h-[72px] w-full items-center gap-4 py-2.5 pr-[22px] pl-[18px] md:w-auto ${relleno}`,
      /* whatsapp-foto: hero y /contacto. Contorno tinta 2 px, 52 px. */
      whatsappFoto: `${caja} flex min-h-[52px] items-center justify-center gap-2.5 px-[18px] py-2.5 text-center ${contorno}`,
      /* llamada-cabecera: 44 px. Móvil: icono + «Llamar». Escritorio: botón junto al número en mono. */
      llamadaCabecera: `${caja} inline-flex min-h-11 flex-none items-center gap-2 px-3.5 md:px-[18px] ${relleno}`,
      /* whatsapp-tramite: destacado y guías, con el mensajeWhatsapp del servicio. */
      whatsappTramite: `${caja} flex min-h-[52px] items-center justify-center gap-2.5 px-[18px] py-3 text-center ${relleno}`,
      /* llamada-linea: destacado y guías. Contorno tinta sobre papel blanco (también sobre el tinte del destacado); el número va en mono. */
      llamadaLinea: `${caja} flex min-h-[52px] items-center justify-center gap-2.5 border-2 border-tinta bg-papel px-[18px] py-3 text-center text-tinta hover:bg-papel-2`,
      /* barra-llamar / barra-whatsapp: barra móvil, 52 px. Llamar relleno | WhatsApp contorno. */
      barraLlamar: `${caja} flex min-h-[52px] flex-1 items-center justify-center gap-2 ${relleno}`,
      barraWhatsapp: `${caja} flex min-h-[52px] flex-1 items-center justify-center gap-2 ${contorno}`,
      /* banda-cta: CTA final sobre tinta. Llamada en blanco (72 px) y WhatsApp con contorno blanco. */
      bandaCtaLlamar: `${caja} flex min-h-[72px] w-full items-center gap-4 bg-white py-2 pr-[22px] pl-[18px] text-tinta hover:bg-papel-2 md:w-auto`,
      bandaCtaWhatsapp: `${caja} flex min-h-[52px] items-center justify-center gap-2.5 border-2 border-white px-[18px] py-2.5 text-center text-white hover:bg-white/10`,
      /* Botón de menú (cuadrado de 44 px con contorno tinta). */
      menu: `${caja} flex size-11 flex-none cursor-pointer items-center justify-center border-2 border-tinta bg-papel p-0 text-tinta hover:bg-papel-2`,
      /* Chip de filtro de /trabajos (enlace ancla, ≥ 44 px). Activo: tinta con texto blanco. */
      chipFiltro:
        "inline-flex min-h-11 items-center rounded-boton border border-tinta px-3.5 font-mono text-[13px] font-medium text-tinta hover:bg-papel-2 aria-[current]:bg-tinta aria-[current]:text-white",
      /* «Ver todos los servicios», «Ver la guía completa»…: texto subrayado con flecha, ≥ 44 px. */
      enlaceFlecha:
        "inline-flex min-h-11 items-center gap-2 rounded-boton font-bold text-tinta underline underline-offset-4 hover:decoration-2",
    },
  },
  defaultVariants: {
    variant: "llamadaLinea",
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
