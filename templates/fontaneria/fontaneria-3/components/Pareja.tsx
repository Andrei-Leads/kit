import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { llamadaCta, llamadaHero, whatsappCta, whatsappFoto, whatsappPagina } from "@/lib/botones";
import type { Confianza, DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

/**
 * Icono + «Llamar 24 h» y el número debajo (contenido de llamada-hero,
 * llamada-cta y llamada-menu). `numeroTitulo` (llamada-menu): el número grande
 * en Fraunces y el texto encima, más pequeño.
 */
export function ContenidoLlamada({ texto, telefono, grande, numeroTitulo }: { texto: string; telefono: string; grande?: boolean; numeroTitulo?: boolean }) {
  if (numeroTitulo) {
    return (
      <>
        <Phone aria-hidden="true" strokeWidth={2.2} className="size-7 flex-none" />
        <span className="flex flex-col gap-1">
          <span className="text-base font-bold">{texto}</span>
          <span className="font-titulo text-[clamp(1.75rem,1.5rem+1vw,2.25rem)] leading-none font-medium tracking-[-0.01em] whitespace-nowrap lining-nums">
            {telefonoVisible(telefono)}
          </span>
        </span>
      </>
    );
  }
  return (
    <>
      <Phone aria-hidden="true" strokeWidth={2.2} className={cn("flex-none", grande ? "size-[26px]" : "size-6")} />
      <span className="flex flex-col">
        <span className={cn("font-bold", grande ? "text-xl" : "text-[1.1875rem]")}>{texto}</span>
        <span className={cn("font-medium tabular-nums", grande ? "text-base" : "text-[0.9375rem]")}>{telefonoVisible(telefono)}</span>
      </span>
    </>
  );
}

/** Línea de confianza: «★ 4,9 · 186 reseñas en Google · Urgencias 24 h». Sin datos, nada. */
export function LineaConfianza({ confianza, className }: { confianza: Confianza; className?: string }) {
  const { valoracion, extra } = confianza;
  if (!valoracion && !extra) return null;
  return (
    <p className={cn("m-0 text-[0.9375rem] leading-snug font-semibold", className)}>
      {valoracion && (
        <>
          <span aria-hidden="true">★ </span>
          {valoracion}
        </>
      )}
      {valoracion && extra && " · "}
      {extra}
    </p>
  );
}

type Props = {
  cta: DatosCta;
  /** "pagina": sobre la arena. "foto": sobre el velo del hero. "cta": sobre la tinta. */
  variante?: "pagina" | "foto" | "cta";
  textoWhatsapp?: string;
  /** Sustituye a la línea de confianza estándar (p. ej. la del hero). `null` la quita. */
  linea?: ReactNode;
  className?: string;
};

/**
 * Pareja de botones: la llamada manda (el más grande); WhatsApp justo debajo
 * en móvil y al lado en escritorio. Sin WhatsApp, la llamada ocupa todo el ancho.
 * Debajo, la línea de confianza (solo con datos reales).
 */
export function Pareja({ cta, variante = "pagina", textoWhatsapp = "Envíanos una foto por WhatsApp", linea, className }: Props) {
  const claseLlamada = variante === "cta" ? llamadaCta : llamadaHero;
  const claseWa = variante === "cta" ? whatsappCta : variante === "foto" ? whatsappFoto : whatsappPagina;
  return (
    <div className={cn("flex max-w-[640px] flex-col gap-3", variante === "cta" && "max-w-[680px] gap-3.5", className)}>
      <div className="flex flex-wrap gap-3">
        <BotonLlamada telefono={cta.telefono} className={claseLlamada}>
          <ContenidoLlamada texto={cta.textoLlamada} telefono={cta.telefono} grande={variante === "cta"} />
        </BotonLlamada>
        {cta.whatsapp && (
          <BotonWhatsApp numero={cta.whatsapp} mensaje={cta.mensaje} className={claseWa}>
            <MessageCircle aria-hidden="true" strokeWidth={2.2} className="size-[22px] flex-none" />
            {textoWhatsapp}
          </BotonWhatsApp>
        )}
      </div>
      {linea === undefined ? <LineaConfianza confianza={cta.confianza} /> : linea}
    </div>
  );
}

/** Pareja suelta entre secciones del inicio (tras «Cómo trabajamos» y tras las zonas). */
export function ParejaSuelta({ cta }: { cta: DatosCta }) {
  return (
    <div className="contenedor -mt-[clamp(2rem,1.5rem+2vw,4rem)] pb-[clamp(3.5rem,2.5rem+3vw,6rem)]">
      <Pareja cta={cta} />
    </div>
  );
}
