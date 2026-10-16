import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * Variantes de botón del diseño «Sin sorpresas» (Specs §4).
 * Se usan con <Button>, con <a>/<Link> (buttonVariants) y como className de
 * BotonLlamada / BotonWhatsApp de core (core pone el comportamiento; el aspecto sale de aquí).
 * Píldoras (rounded-boton), peso 600, área ≥ 44 px, sin sombras. Las rellenas llevan el primario con
 * texto blanco; todas, borde-claro de 1 px para que el contorno se vea sobre noche con cualquier
 * primario. Las maquetas no definen hover: aquí un cambio de fondo/brillo discreto.
 *
 * Sobre BotonLlamada / BotonWhatsApp NUNCA se usa `asChild`: se les pasa buttonVariants(...) en `className`.
 */
const base =
  "no-underline select-none transition-[color,background-color,filter] disabled:pointer-events-none disabled:opacity-50";
const caja = "rounded-boton font-semibold";
/** Relleno primario con texto blanco y borde claro. */
const relleno = "border border-borde-claro bg-primario text-sobre-primario hover:brightness-110";
/** Contorno borde-claro sin relleno. */
const contorno = "border border-borde-claro bg-transparent text-texto hover:bg-texto/10";

const buttonVariants = cva(base, {
  variants: {
    variant: {
      /* llamada-luz: hero, CTA final y /contacto. Luz con texto noche, ≥ 64 px, a todo el ancho en móvil. «Llamar ahora» + número en 800. */
      llamadaLuz: `${caja} flex min-h-16 w-full items-center justify-center gap-3.5 bg-luz px-6 py-2 text-noche hover:bg-white lg:min-h-[68px] lg:w-auto lg:pr-[30px] lg:pl-[26px]`,
      /* whatsapp-foto: hero, CTA y /contacto. Contorno borde-claro, ≥ 52 px. */
      whatsappFoto: `${caja} flex min-h-[52px] items-center justify-center gap-2.5 px-[22px] py-2 text-center text-base lg:min-h-14 lg:px-6 ${contorno}`,
      /* llamada-cabecera: 44 px. Icono + «Llamar». También al pie del índice lateral. */
      llamadaCabecera: `${caja} inline-flex h-11 flex-none items-center gap-2 px-[18px] text-base ${relleno}`,
      /* llamada-precio: tablero de precios, a todo el ancho. */
      llamadaPrecio: `${caja} flex min-h-[54px] w-full items-center justify-center gap-2.5 px-[18px] py-2 text-center ${relleno}`,
      /* whatsapp-servicio: página de servicio y de trabajo, con el mensaje de la página. */
      whatsappServicio: `${caja} flex min-h-[52px] items-center justify-center gap-2.5 px-[22px] py-2 text-center text-base ${contorno}`,
      /* barra-llamar / barra-whatsapp: barra móvil, 52 px. Llamar relleno | WhatsApp contorno. */
      barraLlamar: `${caja} flex h-[52px] flex-1 items-center justify-center gap-2 text-[17px] ${relleno}`,
      barraWhatsapp: `${caja} flex h-[52px] flex-1 items-center justify-center gap-2 text-[17px] ${contorno}`,
      /* Teléfono del Sheet del menú móvil: luz con texto noche, 800. */
      llamadaMenu:
        "flex min-h-14 items-center justify-center gap-2.5 rounded-boton bg-luz text-[19px] font-extrabold text-noche hover:bg-white",
      /* Botón de menú y de cerrar (44 px, contorno borde-claro). */
      menu: `${caja} flex size-11 flex-none cursor-pointer items-center justify-center p-0 ${contorno}`,
      /* Chip de filtro de /trabajos (enlace ancla, ≥ 44 px). Activo: texto sobre noche. */
      chipFiltro:
        "inline-flex min-h-11 items-center rounded-pastilla border border-borde-claro px-4 text-[15px] font-semibold text-texto hover:bg-texto/10 aria-[current]:bg-texto aria-[current]:text-noche",
      /* «Ver todos los servicios», «Ver el servicio»…: texto subrayado, ≥ 44 px. */
      enlaceFlecha:
        "inline-flex min-h-11 items-center gap-2 font-semibold text-texto underline underline-offset-4 hover:decoration-2",
    },
  },
  defaultVariants: {
    variant: "whatsappServicio",
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

  return <Comp data-slot="button" className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export { Button, buttonVariants };
