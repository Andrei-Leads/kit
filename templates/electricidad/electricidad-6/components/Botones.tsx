import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { Bocadillo, Telefono } from "@/components/Iconos";
import { textoLlamar, textoLlamarCorto } from "@/lib/textos";
import { cn } from "@/lib/utils";

/*
 * Variantes de botón con nombre (encargo §3). Todas son BotonLlamada / BotonWhatsApp de core con
 * className; el paralelogramo es un pseudo-elemento (clases `placa`, `placa-falsa` en globals.css).
 */

type Contacto = Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h">;

/** llamada-placa: paralelogramo primario de 44 px. Cabecera y filas. */
export function LlamadaPlaca({
  contacto,
  conNumero,
  texto,
  className,
}: {
  contacto: Contacto;
  conNumero?: boolean;
  /** Texto propio (la cabecera móvil dice solo «Llamar»); por defecto «Llamar 24 h» o «Llamar». */
  texto?: string;
  className?: string;
}) {
  const numero = telefonoVisible(contacto.telefono);
  const rotulo = texto ?? textoLlamarCorto(contacto);
  return (
    <BotonLlamada telefono={contacto.telefono} className={cn("placa", className)}>
      <Telefono />
      {conNumero ? (
        <span>{`${rotulo} · ${numero}`}</span>
      ) : (
        <span>
          {rotulo}
          <span className="sr-only"> al {numero}</span>
        </span>
      )}
    </BotonLlamada>
  );
}

/** whatsapp-linea: contorno de 2 px en --color-texto. Solo con `contacto.whatsapp`. */
export function WhatsAppLinea({
  numero,
  mensaje,
  texto = "Envíanos una foto de la avería",
  className,
}: {
  numero?: string;
  mensaje: string;
  texto?: string;
  className?: string;
}) {
  if (!numero) return null;
  return (
    <BotonWhatsApp numero={numero} mensaje={mensaje} className={cn("wa-linea", className)}>
      <Bocadillo />
      <span>
        {texto}
        {/* El nombre accesible dice siempre a dónde lleva el botón. */}
        {!/whatsapp/i.test(texto) && <span className="sr-only"> por WhatsApp</span>}
      </span>
    </BotonWhatsApp>
  );
}

/**
 * telefono-gigante: el bloque enlace entero. Móvil: la placa «Llamar ahora / 24 h» de 56 px a todo el
 * ancho y debajo el número en display condensada (nunca se parte). Escritorio: la placa a la izquierda,
 * a la altura de la primera línea del número, y WhatsApp debajo de la placa (subgrid; el enlace y el
 * botón de WhatsApp son hermanos, nunca anidados). El número es texto (LCP) y no se anima.
 */
export function TelefonoGigante({
  contacto,
  mensaje,
  textoWhatsapp,
  className,
}: {
  contacto: Contacto;
  mensaje: string;
  textoWhatsapp?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 lg:grid-cols-[20rem_auto] lg:justify-start lg:gap-x-10 lg:gap-y-3", className)}>
      <BotonLlamada
        telefono={contacto.telefono}
        className="telefono-gigante grid gap-2 text-texto no-underline lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:grid-cols-subgrid lg:grid-rows-subgrid lg:gap-y-3"
      >
        <span className="placa-falsa lg:col-start-1 lg:row-start-1 lg:self-start">
          <Telefono className="size-5" />
          {textoLlamar(contacto)}
        </span>
        <span className="condensada block text-display leading-[0.95] tracking-[-0.01em] whitespace-nowrap tabular-nums lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:-mt-[0.06em]">
          {telefonoVisible(contacto.telefono)}
        </span>
      </BotonLlamada>
      <WhatsAppLinea
        numero={contacto.whatsapp}
        mensaje={mensaje}
        texto={textoWhatsapp}
        className="lg:relative lg:z-10 lg:col-start-1 lg:row-start-2 lg:self-start"
      />
    </div>
  );
}

/** Pareja Llamar + WhatsApp que cierra bloques (inicio, servicios, fichas). Sin WhatsApp, Llamar ocupa todo. */
export function Pareja({
  contacto,
  mensaje,
  textoWhatsapp,
  className,
}: {
  contacto: Contacto;
  mensaje: string;
  textoWhatsapp?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3", contacto.whatsapp && "sm:grid-cols-2", className)}>
      <LlamadaPlaca contacto={contacto} conNumero className="min-h-14 w-full px-4 text-[1.0625rem]" />
      <WhatsAppLinea numero={contacto.whatsapp} mensaje={mensaje} texto={textoWhatsapp} className="min-h-14" />
    </div>
  );
}
