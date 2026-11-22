import Link from "next/link";
import type { CSSProperties } from "react";
import { precioDesde, type Servicio } from "@andrei-leads/core";

import { EnlaceFlecha, Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { mensajeDeServicio } from "@/lib/mensajes";
import { numero, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

import { Titular } from "./Titular";

type Props = {
  servicios: readonly Servicio[];
  telefono: string;
  whatsapp?: string;
  /** Inicio: con antetítulo, «Lo que hacemos» y una frase. En /servicios el título es el h1 del hero. */
  conCabecera?: boolean;
};

/** Se apilan como mucho 6; el resto va en filas bajo «Más servicios» (encargo §5.4). */
const MAX_APILADOS = 6;

/**
 * Bloque largo (decidido en el servidor por caracteres): deja de ser sticky para
 * no tapar nunca texto ni botones en móvil (encargo §5.4).
 */
function esLargo(s: Servicio): boolean {
  return s.titulo.length > 44 || s.descripcion.length > 240 || s.incluye.slice(0, 3).some((x) => x.length > 48);
}

/**
 * Servicios apilados, la sección estrella (recurso 5, encargo §5.4). Cada
 * servicio es un bloque opaco `position: sticky` (tinta / tinta suave
 * alternos) y el que queda tapado baja a `scale .94` y `opacity .5` con el
 * scroll. Cada bloque lleva su pareja de CTAs con el mensaje de ese servicio.
 * 0 KB de JS (globals.css, `.apilado`). Con «reducir movimiento», lista normal;
 * sin soporte de view(), sticky sin encogido. 1 servicio: bloque normal.
 */
export function ServiciosApilados({ servicios, telefono, whatsapp, conCabecera = true }: Props) {
  const apilados = servicios.slice(0, MAX_APILADOS);
  const mas = servicios.slice(MAX_APILADOS);
  return (
    <section data-tono="oscuro" aria-labelledby={conCabecera ? "titulo-servicios" : undefined} aria-label={conCabecera ? undefined : "Servicios"} className="sobre-tinta bg-tinta text-white">
      {conCabecera && (
        <div className="contenedor grid gap-[18px] pt-[88px] pb-12 lg:grid-cols-[1fr_minmax(0,360px)] lg:items-end lg:gap-16 lg:pt-36 lg:pb-20 libre-flotante">
          <div className="flex flex-col gap-[18px]">
            <p className="etiqueta">Servicios</p>
            <Titular id="titulo-servicios" className="text-[45px] lg:text-h2" lineas={[<>Lo que <em>hacemos</em></>]} />
          </div>
          <p className="m-0 text-sobre-tinta-suave">
            {servicios.length === 1 ? "Un tipo de obra" : `${servicios.length} tipos de obra`} en los que trabajamos.
          </p>
        </div>
      )}
      <ul className="apilado m-0 list-none p-0" data-apilar={apilados.length > 1 || undefined}>
        {apilados.map((s, i) => (
          <Bloque key={s.slug} servicio={s} i={i} telefono={telefono} whatsapp={whatsapp} />
        ))}
      </ul>
      {mas.length > 0 && (
        <div className="contenedor pt-16 pb-8 lg:pt-24">
          <h3 className="etiqueta mb-6">Más servicios</h3>
          <ul className="m-0 list-none p-0">
            {mas.map((s) => (
              <li key={s.slug} className="border-t border-white/16 last:border-b">
                <Link href={`/servicios/${s.slug}`} className="flex min-h-16 items-center justify-between gap-4 py-3 no-underline">
                  <span className="titulo text-2xl lg:text-[28px]">{s.titulo}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function Bloque({ servicio: s, i, telefono, whatsapp }: { servicio: Servicio; i: number; telefono: string; whatsapp?: string }) {
  const foto = s.imagenes[0];
  const precio = s.precioDesde ? precioDesde(s.precioDesde) : undefined;
  const largo = esLargo(s);
  const cta: DatosCta = { telefono, whatsapp, mensaje: mensajeDeServicio(s) };
  return (
    <li
      className={cn("bloque border-t border-white/14", i % 2 === 1 ? "bg-tinta-suave" : "bg-tinta", largo && "bloque--largo")}
      style={{ "--i": i } as CSSProperties}
    >
      <article aria-labelledby={`servicio-${s.slug}`} className="bloque__dentro flex h-full flex-col bg-inherit lg:grid lg:grid-cols-2">
        <div className="relative min-h-[72px] flex-[1_1_0] overflow-hidden max-lg:max-h-[174px] max-lg:basis-[174px] lg:order-2 lg:min-h-[480px]">
          {foto ? (
            <Foto imagen={foto} sizes="(min-width: 1024px) 50vw, 100vw" proporcion="relleno" className="absolute inset-0 rounded-none" />
          ) : (
            <div aria-hidden="true" className="textura absolute inset-0 flex items-end bg-tinta-suave px-4 lg:px-14">
              <span className="titulo text-[150px] leading-[0.78] font-extralight text-white/90 lg:text-[12rem]">{numero(i)}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 px-4 pt-5 pb-[calc(18px+var(--i)*10px)] max-lg:flex-none lg:gap-5 lg:py-14 lg:pr-14 lg:pl-[var(--margen)]">
          <div className="flex items-center justify-between gap-3 lg:justify-start lg:gap-6">
            <p className="etiqueta">{numero(i)} · Servicio</p>
            {precio && <p className="etiqueta !text-sobre-tinta-suave">{precio.desde ? `Desde ${precio.importe}` : precio.importe}</p>}
          </div>
          <h3 id={`servicio-${s.slug}`} className="titulo text-[28px] lg:text-[clamp(2rem,1.4rem+2.6vw,3.5rem)]">
            {s.titulo}
          </h3>
          <p className={cn("m-0 text-[15px] leading-normal text-sobre-tinta-suave lg:max-w-[480px] lg:text-lg", !largo && "max-lg:line-clamp-3")}>
            {s.descripcion}
          </p>
          {s.incluye.length > 0 && (
            <ul className="m-0 mt-0.5 list-none p-0 lg:max-w-[480px]">
              {s.incluye.slice(0, 3).map((x) => (
                <li key={x} className="border-t border-white/16 py-[5px] text-sm leading-[1.15] text-[#dfe6ec] lg:py-3 lg:text-[15px]">
                  {x}
                </li>
              ))}
            </ul>
          )}
          <Pareja cta={cta} tono="oscuro" textoWhatsapp="Pedir por WhatsApp" className="mt-auto pt-1" />
          <EnlaceFlecha href={`/servicios/${s.slug}`} className="-mt-1 text-sm text-white">
            Ver el servicio
          </EnlaceFlecha>
        </div>
      </article>
    </li>
  );
}
