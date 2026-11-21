import Link from "next/link";
import Image from "next/image";
import { BotonLlamada, BotonWhatsApp, type Ancla, type Imagen, type SiteConfig } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { IconoMensaje, IconoTelefono } from "@/components/Iconos";
import { boton } from "@/lib/estilos";
import { textoLlamar } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  nombre: string;
  logo?: Imagen;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h">;
  items: Ancla[];
  mensaje: string;
};

/**
 * Tamaño del nombre según su largo, para que se lea entero en 2 líneas como máximo a 375 px (nunca «…»):
 * hasta 24 caracteres, 1,125 rem; hasta 36, 1 rem (encargo §5, «Nombre largo»); más largo, 0,875 rem y el
 * botón de llamada de la cabecera se queda en icono por debajo de 768 px (el texto «Llamar» sigue para el
 * lector de pantalla y la barra móvil lleva «Llamar ahora» a la vista).
 */
function tamanoNombre(nombre: string) {
  if (nombre.length <= 24) return { texto: "text-lg max-w-[16ch]", largo: false, muyLargo: false };
  if (nombre.length <= 36) return { texto: "text-base", largo: true, muyLargo: false };
  // Nombre muy largo (p. ej. 48 caracteres): letra más pequeña y sin logo en móvil ni entre 960 y 1279 px, para que quepa en 2 líneas.
  return { texto: "text-[13px] leading-[1.1] md:text-sm lg:text-[13px] xl:text-[15px] xl:leading-[1.15]", largo: true, muyLargo: true };
}

/**
 * Cabecera «barra clásica» (encargo §5): blanca y fija, 60 px en móvil y 72 px desde 960 px. Nombre
 * (con logo de 32 px si lo hay) a la izquierda; en escritorio, menú + «Llamar · número» + «Escribir por
 * WhatsApp» (entre 960 y 1279 px, «Llamar» y «WhatsApp» a secas para que quepa el menú); en móvil, «Llamar» y el botón «Menú» que abre el panel con `popover` (sin JavaScript).
 */
export function Cabecera({ nombre, logo, contacto, items, mensaje }: Props) {
  const { texto, largo, muyLargo } = tamanoNombre(nombre);
  return (
    <header className="sticky top-0 z-30 border-b border-borde bg-white/96 backdrop-blur-sm">
      <div className="contenedor flex h-15 items-center gap-3 lg:h-18">
        <Link
          href="/"
          className={cn(
            "foco flex min-h-11 min-w-0 flex-[0_1_auto] items-center gap-2.5 self-stretch leading-[1.15] font-extrabold tracking-[-0.015em] no-underline",
            texto,
          )}
        >
          {logo && (
            <Image
              src={logo.src}
              alt=""
              width={32}
              height={32}
              className={cn("size-8 flex-none object-contain", muyLargo && "max-md:hidden lg:max-xl:hidden")}
            />
          )}
          <span className="min-w-0 text-balance">{nombre}</span>
        </Link>
        <div className="min-w-0 flex-1" />
        <nav aria-label="Principal" className="hidden gap-0.5 lg:flex">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="foco inline-flex min-h-11 items-center rounded-boton px-2.5 py-2.5 xl:px-3.5 text-base leading-tight font-medium no-underline hover:bg-superficie"
            >
              {i.texto}
            </Link>
          ))}
        </nav>
        <BotonLlamada telefono={contacto.telefono} className={cn(boton.llamadaCabecera, "flex-none max-[359px]:px-3.5", muyLargo && "max-md:px-3.5")}>
          <IconoTelefono tamano={18} />
          {/* El número entero solo donde cabe: 768–959 px (sin menú) y desde 1280 px; con nombre largo, desde 1280. */}
          {/* Por debajo de 360 px (y con nombre muy largo en móvil), solo el icono: «Llamar» queda para el lector de pantalla. */}
          <span className={cn(largo ? "xl:hidden" : "md:hidden lg:inline xl:hidden", "max-[359px]:sr-only", muyLargo && "max-md:sr-only")}>Llamar</span>
          <span className={largo ? "hidden xl:inline" : "hidden md:inline lg:hidden xl:inline"}>{textoLlamar(contacto)}</span>
        </BotonLlamada>
        {contacto.whatsapp && (
          <BotonWhatsApp
            numero={contacto.whatsapp}
            mensaje={mensaje}
            className={cn(boton.whatsappCabecera, "hidden lg:inline-flex")}
          >
            <IconoMensaje tamano={18} />
            <span className="xl:hidden">WhatsApp</span>
            <span className="hidden xl:inline">Escribir por WhatsApp</span>
          </BotonWhatsApp>
        )}
        <MenuPopover enlaces={items} claseBoton={cn("flex-none lg:hidden", muyLargo && "px-3")} />
      </div>
    </header>
  );
}
