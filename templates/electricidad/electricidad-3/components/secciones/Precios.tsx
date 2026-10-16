import Link from "next/link";
import type { Servicio, SiteConfig } from "@andrei-leads/core";
import { Check } from "lucide-react";

import { LlamadaPrecio, WhatsApp } from "@/components/BotonesContacto";
import { Mancha } from "@/components/Mancha";
import { PastillaPrecio } from "@/components/PastillaPrecio";
import { h2, h3 } from "@/lib/estilos";
import { mensajeGeneral } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type ServicioConPrecio = Pick<Servicio, "titulo" | "slug"> & { precioDesde: string };

type Props = {
  tarifas?: SiteConfig["tarifas"];
  /** Todos los servicios: se filtran los que tienen `precioDesde`. */
  servicios: Pick<Servicio, "titulo" | "slug" | "precioDesde">[];
  garantias: SiteConfig["garantias"];
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "mensajeWhatsapp">;
  /**
   * `"tablero"`: solo el tablero de tarifas (página de servicio). Sin título propio de modo «¿Cuánto me
   * costará?», sin «Precios por servicio» ni garantías. Si no hay tarifas, no pinta nada.
   */
  solo?: "tablero";
  /**
   * /servicios (decisión 6 de Ysst): sin el subbloque «Precios por servicio», que repetiría la rejilla de
   * servicios de arriba. Con `tarifas` solo se omite ese subbloque; sin `tarifas` (solo `precioDesde`) la
   * rejilla de precios tampoco sale y el bloque pasa al modo «¿Cuánto me costará?».
   */
  sinPrecioPorServicio?: boolean;
  /** Id de la sección (índice lateral). Por defecto `precios`. */
  id?: string;
  className?: string;
};

type Modo = "tablero" | "servicios" | "cuanto";

/** Los tres modos de «Lo que cuesta» (encargo §4): con `tarifas`, solo `precioDesde`, o sin precios. */
export function modoPrecios(
  tarifas: SiteConfig["tarifas"],
  servicios: Pick<Servicio, "precioDesde">[]
): Modo {
  if (tarifas && tarifas.items.length > 0) return "tablero";
  return servicios.some((s) => s.precioDesde) ? "servicios" : "cuanto";
}

/** Tarjeta de «desde» y «Precios por servicio»: enlace al servicio con su pastilla. */
function TarjetaPrecio({ servicio, grande }: { servicio: ServicioConPrecio; grande?: boolean }) {
  return (
    <Link
      href={`/servicios/${servicio.slug}`}
      className={cn(
        "tarjeta-servicio flex flex-col items-start rounded-tarjeta bg-superficie text-texto no-underline",
        grande ? "min-h-28 justify-between gap-3.5 px-4 pt-4 pb-3.5" : "gap-2 px-3.5 py-3"
      )}
    >
      <span className={cn("leading-[1.25] font-semibold text-pretty", grande ? "text-[17px]" : "text-[15px]")}>
        {servicio.titulo}
      </span>
      <PastillaPrecio
        precio={servicio.precioDesde}
        className={cn("max-w-full", grande ? "px-3.5 py-[7px] text-lg" : "px-[11px] py-[5px] text-sm")}
      />
    </Link>
  );
}

/**
 * «Lo que cuesta» (Specs §5; sección estrella, puesto 2 del inicio), sobre una mancha que crece una vez.
 *
 *  1. Con `tarifas`: tablero en superficie (filas ≥ 52 px, concepto en 600 y precio en pastilla) con
 *     `llamada-precio`, nota a 15 px, «Precios por servicio» (2 columnas, solo los que tienen `precioDesde`)
 *     y garantías en chips.
 *  2. Solo `precioDesde`: rejilla grande de 2 columnas + `llamada-precio` + garantías.
 *  3. Sin precios: «¿Cuánto me costará?» con `llamada-precio` y whatsapp-foto (sin WhatsApp, solo la llamada).
 * No es un recibo: filas suaves, separador sólido, pastilla, sin total.
 * Animación (Specs §8): el tablero lleva `data-anim="tablero"`; cada fila `data-fila` y su pastilla
 * `data-pastilla` (PastillaPrecio `indice`), con `--i` = índice de fila.
 */
export function Precios({ tarifas, servicios, garantias, contacto, solo, sinPrecioPorServicio, id = "precios", className }: Props) {
  const modoDatos = modoPrecios(tarifas, servicios);
  const modo: Modo = sinPrecioPorServicio && modoDatos === "servicios" ? "cuanto" : modoDatos;
  if (solo === "tablero" && modo !== "tablero") return null;

  const conPrecio: ServicioConPrecio[] = servicios.flatMap((s) =>
    s.precioDesde ? [{ titulo: s.titulo, slug: s.slug, precioDesde: s.precioDesde }] : []
  );
  const items = tarifas?.items ?? [];
  const titulo = modo === "cuanto" ? "¿Cuánto me costará?" : "Lo que cuesta";
  const idTitulo = `${id}-titulo`;
  const conGarantias = !solo && garantias.length > 0;
  const conPorServicio = modo === "tablero" && !solo && !sinPrecioPorServicio && conPrecio.length > 0;

  return (
    <section id={id} aria-labelledby={idTitulo} className={cn("relative pt-9 lg:pt-14", className)}>
      <Mancha
        forma="a"
        animada
        // -z-10: la mancha sube 34 px sobre la sección anterior (p. ej. la rejilla de /servicios); detrás de ella,
        // nunca encima de sus tarjetas.
        className="-top-[34px] -right-[70px] -z-10 h-[210px] w-[260px] lg:h-[320px] lg:w-[420px]"
      />
      <h2 id={idTitulo} className={cn(h2, "relative z-10 mb-4")}>
        {titulo}
      </h2>

      <div className="relative z-10 flex flex-wrap items-start gap-5">
        {modo === "tablero" && (
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-3">
            <div data-anim="tablero" className="rounded-tarjeta bg-superficie px-1.5 pt-1.5 pb-2.5">
              <ul className="m-0 list-none p-0">
                {items.map((fila, i) => (
                  <li
                    key={`${i}-${fila.concepto}`}
                    data-fila=""
                    style={{ "--i": i } as React.CSSProperties}
                    className="flex min-h-[52px] items-center justify-between gap-3 border-b border-linea py-2 pr-2 pl-3.5 last:border-b-0"
                  >
                    <span className="min-w-0 text-base leading-[1.3] font-semibold text-pretty">{fila.concepto}</span>
                    <PastillaPrecio precio={fila.precio} indice={i} />
                  </li>
                ))}
              </ul>
              <LlamadaPrecio telefono={contacto.telefono} className="mx-1 mt-2.5 w-auto" />
            </div>
            {tarifas?.nota && (
              <p className="m-0 px-1.5 text-[15px] leading-normal text-pretty text-texto-suave">{tarifas.nota}</p>
            )}
          </div>
        )}

        {conPorServicio && (
          <div className="min-w-0 flex-[1_1_280px]">
            <h3 className={cn(h3, "mb-2.5 text-lg")}>Precios por servicio</h3>
            <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0">
              {conPrecio.map((s) => (
                <li key={s.slug} className="flex *:w-full">
                  <TarjetaPrecio servicio={s} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {modo === "servicios" && (
          <div className="flex basis-full flex-col gap-3">
            <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 lg:grid-cols-3">
              {conPrecio.map((s) => (
                <li key={s.slug} className="flex *:w-full">
                  <TarjetaPrecio servicio={s} grande />
                </li>
              ))}
            </ul>
            <LlamadaPrecio telefono={contacto.telefono} className="lg:max-w-[420px]" />
          </div>
        )}

        {modo === "cuanto" && (
          <div className="flex max-w-[560px] basis-full flex-col gap-3 rounded-tarjeta bg-superficie p-5">
            <p className="m-0 mb-1 text-[17px] leading-[1.45] text-pretty">
              {contacto.whatsapp
                ? "Cuéntanos qué pasa por teléfono o mándanos una foto por WhatsApp."
                : "Cuéntanos qué pasa por teléfono."}
            </p>
            <LlamadaPrecio telefono={contacto.telefono} />
            {contacto.whatsapp && <WhatsApp numero={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} />}
          </div>
        )}

        {conGarantias && (
          <ul aria-label="Garantías" className="m-0 flex basis-full list-none flex-wrap gap-2 p-0">
            {garantias.map((g) => (
              <li
                key={g}
                className="inline-flex min-h-[38px] items-center gap-2 rounded-pastilla bg-superficie py-1.5 pr-3.5 pl-[7px] text-[15px] leading-[1.25] font-semibold"
              >
                <span aria-hidden="true" className="flex size-6 flex-none items-center justify-center rounded-full bg-mancha">
                  <Check strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="size-3.5" />
                </span>
                {g}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
