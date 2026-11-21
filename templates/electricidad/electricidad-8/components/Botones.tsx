import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { Flecha, IconoBocadillo, IconoTelefono } from "@/components/Iconos";
import { textoLlamar } from "@/lib/formato";
import { MENSAJE_JUNTA } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

/*
 * Variantes de botón con nombre (encargo §3). Todas son BotonLlamada o BotonWhatsApp de core: core
 * pone el enlace y la accesibilidad; aquí solo va el aspecto. Sin aria-label: el nombre accesible es
 * el texto visible. Foco: anillo de 2 px separado 2 px (noche sobre papel, blanco sobre noche).
 */

type Contacto = Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h">;

/** `llamada-dossier`: rectángulo de 56 px en noche con el número en la serif; `invertido` sobre bandas noche. */
export function LlamadaDossier({ contacto, invertido, className }: { contacto: Contacto; invertido?: boolean; className?: string }) {
  return (
    <BotonLlamada
      telefono={contacto.telefono}
      className={cn(
        "inline-flex min-h-14 w-full shrink-0 flex-wrap items-center justify-center gap-x-3 px-6 sm:flex-nowrap sm:whitespace-nowrap font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foco sm:w-auto",
        invertido
          ? "bg-superficie text-noche hover:bg-alterna active:bg-[color-mix(in_oklab,var(--color-alterna)_90%,black)]"
          : "bg-noche text-noche-texto hover:bg-acento active:bg-[color-mix(in_oklab,var(--color-noche)_80%,black)]",
        className,
      )}
    >
      <IconoTelefono />
      <span>{textoLlamar(contacto)}</span>
      <span className="cifras-antiguas font-titulo text-[1.375rem] font-normal tracking-[0.01em]">{telefonoVisible(contacto.telefono)}</span>
    </BotonLlamada>
  );
}

/** `whatsapp-linea`: enlace subrayado con línea de 1 px en acento, bocadillo y flecha. */
export function WhatsappLinea({
  numero,
  mensaje,
  children = "Envíanos fotos de la instalación",
  sobreNoche,
  compacto,
  className,
}: {
  numero: string;
  mensaje: string;
  children?: React.ReactNode;
  sobreNoche?: boolean;
  /** Texto en dos líneas como mucho (hero de escritorio: al lado de la llamada). */
  compacto?: boolean;
  className?: string;
}) {
  // Si el texto visible no dice «WhatsApp», el lector de pantalla lo oye igualmente.
  const diceWhatsApp = typeof children === "string" && /whatsapp/i.test(children);
  return (
    <BotonWhatsApp
      numero={numero}
      mensaje={mensaje}
      className={cn(
        "group/wa inline-flex min-h-11 items-center gap-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foco",
        sobreNoche ? "text-noche-texto" : "text-texto active:text-acento",
        className,
      )}
    >
      <IconoBocadillo className="size-4 shrink-0" />
      <span
        className={cn(
          "underline decoration-1 underline-offset-[5px] group-hover/wa:decoration-2",
          sobreNoche ? "decoration-noche-suave" : "decoration-acento",
          compacto && "sm:max-w-[14ch]",
        )}
      >
        {children}
        {!diceWhatsApp && <span className="sr-only"> por WhatsApp</span>} <Flecha />
      </span>
    </BotonWhatsApp>
  );
}

/** `presupuesto-junta`: rectángulo primario con sobre-primario (es un BotonWhatsApp). */
export function PresupuestoJunta({ numero, className }: { numero: string; className?: string }) {
  return (
    <BotonWhatsApp
      numero={numero}
      mensaje={MENSAJE_JUNTA}
      className={cn(
        "inline-flex min-h-13 items-center justify-center gap-2.5 bg-primario px-5 font-semibold text-sobre-primario hover:bg-(--primario-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foco",
        className,
      )}
    >
      <IconoBocadillo />
      Pedir presupuesto para la junta
      <span className="sr-only"> por WhatsApp</span>
    </BotonWhatsApp>
  );
}

/**
 * Pareja Llamar + WhatsApp (encargo §3, «CTAs claros»): `llamada-dossier` y, justo debajo en móvil
 * o al lado en escritorio, `whatsapp-linea`. Sin WhatsApp, solo la llamada, sin hueco.
 */
export function ParCta({
  contacto,
  mensaje,
  textoWhatsapp,
  invertido,
  compacta,
  className,
}: {
  contacto: Contacto;
  mensaje: string;
  textoWhatsapp?: string;
  invertido?: boolean;
  /** Hero: WhatsApp siempre al lado de la llamada desde `sm`, con el texto en dos líneas. */
  compacta?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-x-7 gap-y-3 sm:flex-row sm:flex-wrap sm:items-center",
        compacta && "sm:flex-nowrap sm:gap-x-6",
        className,
      )}
    >
      <LlamadaDossier contacto={contacto} invertido={invertido} />
      {contacto.whatsapp && (
        <WhatsappLinea numero={contacto.whatsapp} mensaje={mensaje} sobreNoche={invertido} compacto={compacta}>
          {textoWhatsapp}
        </WhatsappLinea>
      )}
    </div>
  );
}
