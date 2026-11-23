import type { Metadata } from "next";
import { metadatosPagina, urlComoLlegar } from "@andrei-leads/core";

import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Lamina } from "@/components/Lamina";
import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { dosCifras, notaHorario, pasosTaller } from "@/lib/formato";
import { mensajeTaller } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "El taller" });

const TITULO_BLOQUE = "titulo mb-4 border-t border-tinta pt-4 text-h3-bloque leading-[1.15]";

/**
 * /empresa, «El taller» (encargo §7): la historia (o la descripción corta), las fotos del taller en
 * láminas 3:2, «Cómo trabajamos» (los pasos del proceso en corto), el equipo, «Nuestras garantías» (las
 * garantías) y la dirección con «Cómo llegar» junto a la pareja. Cada bloque sin datos se oculta.
 */
export default function Page() {
  const { negocio, contacto, empresa, garantias } = config;
  const { direccion } = contacto;
  const historia = empresa.historia.length > 0 ? empresa.historia : [negocio.descripcionCorta];
  const pasos = pasosTaller(config.proceso);

  return (
    <Marco config={config} pagina="empresa" rotulo="El taller">
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        rotulo={negocio.anioFundacion ? `El taller · desde ${negocio.anioFundacion}` : "El taller"}
        titulo={`Nuestro taller en ${direccion.ciudad}`}
      >
        <div className="mt-2 flex max-w-[66ch] flex-col gap-4">
          {historia.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </CabeceraPagina>

      {/* Con una sola foto, media columna en escritorio (a todo el ancho, una 3:2 quedaba muy alta). */}
      {empresa.imagenes.length === 1 && (
        <div className="pt-12 lg:w-1/2">
          <Lamina imagen={empresa.imagenes[0]} numero={1} proporcion="3/2" preload sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
      )}
      {empresa.imagenes.length > 1 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 pt-12">
          {empresa.imagenes.map((im, i) => (
            <Lamina key={im.src + i} imagen={im} numero={i + 1} proporcion="3/2" preload={i === 0} sizes="(min-width: 1024px) 45vw, 100vw" />
          ))}
        </div>
      )}

      <section aria-labelledby="h2-como" className="pt-16">
        <h2 id="h2-como" className={TITULO_BLOQUE}>
          Cómo trabajamos
        </h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-6">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="flex gap-3.5 border-b border-borde py-3.5">
              <span className="font-titulo text-[13px] text-lapiz">{dosCifras(i + 1)}</span>
              <span>{p.titulo}</span>
            </li>
          ))}
        </ol>
      </section>

      {empresa.equipo.length > 0 && (
        <section aria-labelledby="h2-equipo" className="pt-16">
          <h2 id="h2-equipo" className={TITULO_BLOQUE}>
            Quién está en el banco
          </h2>
          <ul className="max-w-[640px]">
            {empresa.equipo.map((e) => (
              <li key={e.nombre} className="flex justify-between gap-4 border-b border-borde py-3.5">
                <span className="font-semibold">{e.nombre}</span>
                {e.cargo && <span className="text-right font-titulo text-[13px] text-texto-suave">{e.cargo}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {garantias.length > 0 && (
        <section aria-labelledby="h2-garantias" className="pt-16">
          <h2 id="h2-garantias" className={TITULO_BLOQUE}>
            Nuestras garantías
          </h2>
          <ul className="flex flex-col gap-3">
            {garantias.map((g) => (
              <li key={g} className="flex gap-3.5">
                <span aria-hidden="true" className="font-titulo text-lapiz">
                  —
                </span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label="Dirección y contacto del taller" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-8 pt-16">
        <address className="flex flex-col gap-1 border-t border-tinta pt-4 not-italic">
          <span className="etiqueta text-texto-suave">El taller</span>
          <span>{direccion.calle}</span>
          <span>
            {direccion.cp} {direccion.ciudad}
          </span>
          <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener" className="enlace-mono min-h-11 self-start">
            Cómo llegar →
          </a>
        </address>
        <Pareja contacto={contacto} mensaje={mensajeTaller(contacto)} nota={notaHorario(contacto)} />
      </section>
    </Marco>
  );
}
