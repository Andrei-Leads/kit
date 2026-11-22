import Link from "next/link";
import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { llamarAl, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

/** Palabra destacada: Instrument Serif cursiva (una por titular). */
export function Destacada({ children }: { children: ReactNode }) {
  return <span className="destacada">{children}</span>;
}

/** Enlace de navegación «→» (nunca para contactar): línea de 1 px y flecha separada. */
export function Enlace({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("enlace", className)}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

type PropsTitular = {
  /** Primera línea. */
  antes: string;
  /** Palabra destacada, al empezar la segunda línea. */
  destacada: string;
  /** Resto de la segunda línea (p. ej. «a casa.»). */
  despues?: string;
  id?: string;
  /** "display" para el lema y el CTA final. */
  tamano?: "h2" | "display";
  className?: string;
};

/**
 * `h2` de interfaz en dos líneas fijas con máscara (recurso 2): cada línea sube desde
 * detrás de su `overflow: clip`. Sin soporte o con «reducir movimiento», quieto y visible.
 */
export function Titular({ antes, destacada, despues, id, tamano = "h2", className }: PropsTitular) {
  return (
    <h2 id={id} className={cn(tamano === "h2" ? "titulo-h2" : "titulo-display", className)}>
      <span className="mascara">
        <span>{antes}</span>
      </span>
      <span className="mascara">
        <span>
          <Destacada>{destacada}</Destacada>
          {despues ? ` ${despues}` : null}
        </span>
      </span>
    </h2>
  );
}

type PropsPareja = {
  datos: DatosCta;
  /** Texto de WhatsApp (por defecto «Enséñanos tu casa»). */
  textoWa?: ReactNode;
  /** Texto de Llamar (por defecto «Llamar al {teléfono}»). */
  textoLlamar?: ReactNode;
  /** Fondo sobre el que va: el secundario es de contorno en oscuro y de tinta en claro. */
  fondo: "claro" | "oscuro";
  alto?: 56 | 48;
  /** Apilados a todo el ancho (portada en móvil, pano). */
  apilada?: boolean;
  className?: string;
};

/**
 * Pareja de CTAs (anexo P2.4): `BotonWhatsApp` primero (`cta-principal`) y
 * `BotonLlamada` (`cta-secundario-claro/oscuro`). Sin WhatsApp, Llamar pasa a
 * `cta-principal` y ocupa el sitio de los dos, sin hueco.
 */
export function Pareja({ datos, textoWa = "Enséñanos tu casa", textoLlamar, fondo, alto = 56, apilada, className }: PropsPareja) {
  const tam = alto === 48 && "cta--48";
  return (
    <div className={cn("flex gap-3", apilada ? "flex-col" : "flex-wrap", className)}>
      {datos.whatsapp && (
        <BotonWhatsApp numero={datos.whatsapp} mensaje={datos.mensaje} className={cn("cta cta-principal", tam, !apilada && "flex-[1_1_auto]")}>
          <IconoWhatsapp />
          {textoWa}
        </BotonWhatsApp>
      )}
      <BotonLlamada
        telefono={datos.telefono}
        className={cn(
          "cta",
          tam,
          !apilada && "flex-[1_1_auto]",
          !datos.whatsapp ? "cta-principal" : fondo === "oscuro" ? "cta-secundario-claro" : "cta-secundario-oscuro",
        )}
      >
        {!datos.whatsapp && <IconoTelefono />}
        {textoLlamar ?? llamarAl(datos.telefono)}
      </BotonLlamada>
    </div>
  );
}

/** Cierre de sección: pareja de 56 px y línea de confianza debajo. */
export function ParejaCta({
  datos,
  confianza,
  fondo,
  textoWa,
  textoLlamar,
  className,
}: Pick<PropsPareja, "datos" | "fondo" | "textoWa" | "textoLlamar" | "className"> & { confianza?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Pareja datos={datos} fondo={fondo} textoWa={textoWa} textoLlamar={textoLlamar} className="flex-col sm:max-w-[620px] sm:flex-row" />
      {confianza && <p className={cn("m-0 text-sm", fondo === "oscuro" ? "text-texto-claro" : "text-texto-suave")}>{confianza}</p>}
    </div>
  );
}
