import Link from "next/link";
import type { CSSProperties } from "react";
import { telefonoVisible, type Servicio, type SiteConfig } from "@andrei-leads/core";

import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { Luz } from "@/components/Luz";
import { ParejaCta } from "@/components/ParejaCta";
import { TituloLineas } from "@/components/TituloLineas";
import { Foto } from "@/components/base/Foto";
import { mensajeDeServicio, RESPUESTA, TEXTO_WA, textoWaServicio } from "@/lib/mensajes";
import { dosCifras, textoLlamar } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  servicios: readonly Servicio[];
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  /** Mensaje de la pareja general del final. */
  mensaje: string;
  /** Cuántos se apilan (inicio 4, /servicios 6); el resto va en filas. */
  apilados: number;
};

/**
 * Soluciones apiladas (encargo §5.3, sección estrella): una `<ol>` en la que cada bloque
 * (texto + foto) se fija con `position: sticky` y el siguiente sube por encima; el tapado
 * se aleja (`scale(.94)` y un velo) con la línea de tiempo del siguiente. 0 KB de JS. Cada
 * bloque lleva su pareja con el mensaje de su servicio. En móvil, bloques más bajos (foto
 * 3:2). Con «reducir movimiento», lista normal. Con 1 servicio, un bloque sin sticky.
 */
export function SolucionesApiladas({ servicios, contacto, mensaje, apilados }: Props) {
  const total = servicios.length;
  const pila = servicios.slice(0, apilados);
  const filas = servicios.slice(apilados);
  const apilar = pila.length > 1;
  const nombres = pila.map((_, i) => `--b${i}`).join(", ");
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-soluciones" className="bg-tinta pt-(--seccion) text-sobre-tinta">
      <div className="contenedor pb-10 lg:pb-16">
        <p className="etiqueta">Soluciones</p>
        <TituloLineas id="titulo-soluciones" lineas={["Cada hueco,", <>su <em>solución</em>.</>]} className="titulo-h2 mt-3" />
      </div>
      <ol className={cn("m-0 list-none p-0", apilar && "apilado")} style={apilar ? ({ timelineScope: nombres } as CSSProperties) : undefined}>
        {pila.map((s, i) => (
          <Bloque
            key={s.slug}
            servicio={s}
            i={i}
            total={total}
            contacto={contacto}
            siguiente={apilar && i < pila.length - 1 ? `--b${i + 1}` : undefined}
          />
        ))}
      </ol>
      {(filas.length > 0 || apilar) && (
        <div className="contenedor pt-10 pb-(--seccion) lg:pt-16">
          {filas.length > 0 && (
            <ul className="m-0 mb-10 list-none border-t border-borde-tinta p-0">
              {filas.map((s, j) => (
                <li key={s.slug} className="border-b border-borde-tinta">
                  <Link href={`/servicios/${s.slug}`} className="group flex min-h-16 items-baseline gap-5 py-4 no-underline">
                    <span className="min-w-6 text-xs tracking-[0.12em] text-sobre-tinta-suave">{dosCifras(apilados + j + 1)}</span>
                    <span className="fino flex-1 text-2xl leading-tight lg:text-[28px]">{s.titulo}</span>
                    <span aria-hidden="true" className="text-2xl">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <ParejaCta
            cta={{ ...contacto, mensaje }}
            textoWhatsapp={TEXTO_WA}
            tono="oscuro"
            confianza={{ texto: RESPUESTA }}
            className="max-w-[620px]"
          />
        </div>
      )}
      {!filas.length && !apilar && <div className="pb-(--seccion)" />}
    </section>
  );
}

function Bloque({
  servicio: s,
  i,
  total,
  contacto,
  siguiente,
}: {
  servicio: Servicio;
  i: number;
  total: number;
  contacto: Props["contacto"];
  siguiente?: string;
}) {
  const [foto, mini] = s.imagenes;
  const num = dosCifras(i + 1);
  const fondo = i % 2 === 1 ? "bg-tinta-suave" : "bg-tinta";
  return (
    <li
      className="bloque"
      data-tono="oscuro"
      style={{ "--i": i, "--vt": `--b${i}`, "--siguiente": siguiente ?? "none" } as CSSProperties}
    >
      <div className={cn("bloque-cuerpo border-t border-borde-tinta", fondo)}>
        <div className="contenedor flex flex-col gap-4 py-6 lg:h-[max(560px,calc(100svh-120px))] lg:flex-row lg:items-stretch lg:gap-12 lg:py-10">
          <div className="flex min-w-0 flex-col lg:max-w-[480px] lg:flex-1 lg:justify-center">
            <p className="etiqueta">
              {num} / {dosCifras(total)}
            </p>
            <h3 className="fino m-0 mt-2 text-[28px] leading-[1.1] lg:mt-4 lg:text-[44px]">
              <Link href={`/servicios/${s.slug}`} className="no-underline hover:underline hover:decoration-1 hover:underline-offset-[6px]">
                {s.titulo}
              </Link>
            </h3>
            <p className="m-0 mt-3 line-clamp-3 text-[15px] text-sobre-tinta-suave lg:mt-4 lg:line-clamp-none lg:text-base">{s.descripcion}</p>
            {s.incluye.length > 0 && (
              <ul className="m-0 mt-6 hidden list-none border-t border-borde-tinta p-0 text-sm lg:block">
                {s.incluye.slice(0, 3).map((x) => (
                  <li key={x} className="border-b border-borde-tinta py-2.5">
                    {x}
                  </li>
                ))}
              </ul>
            )}
            {s.precioDesde && <p className="fino m-0 mt-5 hidden text-2xl lg:block">{s.precioDesde}</p>}
            <EnlaceFlecha href={`/servicios/${s.slug}`} className="mt-3 hidden lg:inline-flex">
              Ver la solución
            </EnlaceFlecha>
            <ParejaCta
              cta={{ ...contacto, mensaje: mensajeDeServicio(s) }}
              textoWhatsapp={
                <>
                  <span className="lg:hidden">WhatsApp</span>
                  <span className="hidden lg:inline">{textoWaServicio(s.titulo)}</span>
                </>
              }
              textoLlamar={
                <>
                  <span className="lg:hidden">
                    Llamar<span className="sr-only"> al {telefonoVisible(contacto.telefono)}</span>
                  </span>
                  <span className="hidden lg:inline">{textoLlamar(contacto.telefono)}</span>
                </>
              }
              tono="oscuro"
              className="mt-4 lg:mt-8"
            />
          </div>
          <div className="relative min-h-0 lg:ml-auto lg:aspect-[4/5] lg:h-full lg:flex-none">
            {foto ? (
              <>
                <Foto
                  imagen={foto}
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  proporcion="relleno"
                  etiqueta="dentro"
                  tono="oscuro"
                  transicion={`servicio-${s.slug}`}
                  className="aspect-[3/2] lg:aspect-auto"
                />
                {mini && (
                  <Foto
                    imagen={mini}
                    sizes="180px"
                    etiqueta="no"
                    tono="oscuro"
                    className="absolute bottom-10 -left-[90px] z-[2] hidden w-[180px] lg:block"
                  />
                )}
              </>
            ) : (
              <Luz
                tono="oscuro"
                proporcion="relleno"
                fondo={i % 2 === 1 ? "var(--color-tinta)" : "var(--color-tinta-suave)"}
                numero={num}
                tamanoNumero="clamp(5rem, 3rem + 6vw, 10rem)"
                className="aspect-[3/2] lg:aspect-auto"
              />
            )}
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="bloque-velo" />
    </li>
  );
}
