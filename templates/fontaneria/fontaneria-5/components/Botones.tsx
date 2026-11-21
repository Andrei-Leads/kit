import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { cn } from "@/lib/utils";
import { textoLlamarCorto } from "@/lib/formato";
import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";

/*
 * Variantes de botón de «Llegamos» (export «Llegamos CTAs»). Llamar es el único relleno primario
 * de cada bloque; WhatsApp va siempre en contorno de 2 px. El recorte (clip-path) va en el <span>
 * interior y el foco en el enlace, para que el anillo no se recorte.
 */

type Contacto = Pick<SiteConfig["contacto"], "telefono" | "urgencias24h" | "tiempoLlegada">;

/** «Llamar 24 h · 600 00 50 05» con el número sin partir: en pantallas estrechas salta entero. */
function TextoLlamar({ contacto }: { contacto: Pick<Contacto, "telefono" | "urgencias24h"> }) {
  return (
    <span>
      {contacto.urgencias24h ? "Llamar 24 h" : "Llamar"} · <span className="whitespace-nowrap">{telefonoVisible(contacto.telefono)}</span>
    </span>
  );
}

const ENLACE = "boton block no-underline";
const RELLENO = "bg-primario text-sobre-primario hover:bg-primario-hover";

/** llamada-hero: 64 px (68 en escritorio), segunda línea con el tiempo de llegada. */
export function LlamadaHero({ contacto, className }: { contacto: Contacto; className?: string }) {
  return (
    <BotonLlamada telefono={contacto.telefono} className={cn(ENLACE, className)}>
      <span className={cn("corte flex min-h-16 items-center gap-3 pr-8 pl-5 lg:min-h-[68px] lg:pr-[34px]", RELLENO)}>
        <IconoTelefono />
        <span className="flex flex-col">
          <span className="font-titulo text-[19px] leading-[1.15] font-bold tabular-nums lg:text-xl lg:whitespace-nowrap">
            <TextoLlamar contacto={contacto} />
          </span>
          {contacto.tiempoLlegada && (
            <span className="text-sm leading-tight font-semibold">llegamos en {contacto.tiempoLlegada}</span>
          )}
        </span>
      </span>
    </BotonLlamada>
  );
}

/** llamada-cierre: 56 px, cierres de bloque, fichas y 404. */
export function LlamadaCierre({ contacto, className, alto = "min-h-14" }: { contacto: Contacto; className?: string; alto?: string }) {
  return (
    <BotonLlamada telefono={contacto.telefono} className={cn(ENLACE, className)}>
      <span
        className={cn(
          "corte flex h-full items-center gap-2.5 pr-[30px] pl-5 font-titulo text-lg leading-[1.15] font-bold tabular-nums",
          alto,
          RELLENO,
        )}
      >
        <IconoTelefono />
        <TextoLlamar contacto={contacto} />
      </span>
    </BotonLlamada>
  );
}

/** llamada-zona: 64 px con corte en diagonal a la derecha. */
export function LlamadaZona({ contacto, className }: { contacto: Contacto; className?: string }) {
  return (
    <BotonLlamada telefono={contacto.telefono} className={cn(ENLACE, className)}>
      <span
        className={cn(
          "corte-diagonal flex min-h-16 items-center gap-2.5 pr-11 pl-5 font-titulo text-lg leading-[1.15] font-bold tabular-nums lg:pr-14 lg:pl-[22px] lg:text-[19px]",
          RELLENO,
        )}
      >
        <IconoTelefono />
        <TextoLlamar contacto={contacto} />
      </span>
    </BotonLlamada>
  );
}

/** llamada-cta / llamada-contacto: «Llamar 24 h» encima y el número a tamaño titular. */
export function LlamadaGrande({
  contacto,
  className,
  tamanoNumero = "text-[34px] lg:text-[44px]",
  alto = "min-h-[84px] lg:min-h-[92px]",
}: {
  contacto: Contacto;
  className?: string;
  tamanoNumero?: string;
  alto?: string;
}) {
  return (
    <BotonLlamada telefono={contacto.telefono} className={cn(ENLACE, className)}>
      <span className={cn("corte flex h-full items-center gap-3.5 pr-9 pl-5 lg:pl-6", alto, RELLENO)}>
        <IconoTelefono />
        <span className="flex flex-col">
          <span className="text-[15px] leading-tight font-semibold lg:text-base">{textoLlamarCorto(contacto)}</span>
          <span className={cn("font-titulo leading-[1.05] font-bold tracking-[-0.015em] whitespace-nowrap tabular-nums", tamanoNumero)}>
            {telefonoVisible(contacto.telefono)}
          </span>
        </span>
      </span>
    </BotonLlamada>
  );
}

/** whatsapp-hero / whatsapp-cierre: contorno de 2 px en tinta sobre blanco, misma esquina cortada. */
export function WhatsappContorno({
  numero,
  mensaje,
  children,
  className,
  alto = "min-h-[52px]",
}: {
  numero: string;
  mensaje: string;
  children: ReactNode;
  className?: string;
  alto?: string;
}) {
  return (
    <BotonWhatsApp numero={numero} mensaje={mensaje} className={cn(ENLACE, className)}>
      <span className="corte block h-full bg-tinta p-0.5">
        <span
          className={cn(
            "corte-13 flex h-full items-center gap-2.5 bg-superficie pr-[26px] pl-[18px] font-titulo text-[17px] leading-[1.15] font-semibold text-texto hover:bg-primario-suave",
            alto,
          )}
        >
          <IconoWhatsApp />
          {children}
        </span>
      </span>
    </BotonWhatsApp>
  );
}

/** whatsapp-cta: contorno de 2 px claro sobre tinta. */
export function WhatsappSobreTinta({ numero, mensaje, children, className }: { numero: string; mensaje: string; children: ReactNode; className?: string }) {
  return (
    <BotonWhatsApp numero={numero} mensaje={mensaje} className={cn(ENLACE, "focus-visible:shadow-[0_0_0_2px_var(--color-tinta)]", className)}>
      <span className="flex h-full min-h-14 items-center gap-2.5 border-2 border-sobre-tinta px-[18px] font-titulo text-[17px] leading-[1.15] font-semibold text-sobre-tinta hover:bg-tinta-2 lg:px-6">
        <IconoWhatsApp />
        {children}
      </span>
    </BotonWhatsApp>
  );
}

/**
 * Pareja de cierre (tras «Cómo trabajamos», tras «Servicios», fichas…): llamar + WhatsApp + una línea
 * de confianza (horario o valoración). En móvil, apilados; en escritorio, en fila.
 */
export function ParCierre({
  contacto,
  whatsapp,
  mensaje,
  textoWhatsapp = "Escribir por WhatsApp",
  linea,
  columna,
  className,
}: {
  contacto: Contacto;
  whatsapp?: string;
  mensaje: string;
  textoWhatsapp?: string;
  linea?: string;
  /** Siempre apilados (columna lateral de la ficha). */
  columna?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2.5", !columna && "lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-4 lg:gap-y-3", className)}>
      <LlamadaCierre contacto={contacto} />
      {whatsapp && (
        <WhatsappContorno numero={whatsapp} mensaje={mensaje}>
          {textoWhatsapp}
        </WhatsappContorno>
      )}
      {linea && <p className="m-0 text-sm text-texto-suave lg:text-[15px]">{linea}</p>}
    </div>
  );
}
