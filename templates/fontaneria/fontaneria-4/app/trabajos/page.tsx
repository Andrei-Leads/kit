import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Marco } from "@/components/Marco";
import { CabeceraParte } from "@/components/secciones/CabeceraParte";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FichaTrabajo } from "@/components/secciones/FichaTrabajo";
import { dosCifras, lineaConfianza } from "@/lib/formato";
import { mensajeAviso } from "@/lib/mensajes";
import { datosMarco } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/** Solo caracteres de slug (los valida core): seguros dentro del CSS generado. */
const seguro = (s: string) => /^[a-z0-9-]+$/.test(s);

/**
 * /trabajos (encargo §7): archivo de partes. Cada trabajo es una ficha con casillas y polaroid. El
 * filtro por servicio son pestañas de archivador que funcionan sin JavaScript y sin hacer la página
 * dinámica: cada pestaña enlaza a `#servicio-<slug>` y el CSS generado oculta, con `:has(:target)`,
 * las fichas de otros servicios. Sin trabajos, la `galeria` como hoja de contactos. Sin ninguno, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, servicios, contacto } = config;
  const conTrabajos = servicios.filter((s) => trabajos.some((t) => t.servicio === s.slug) && seguro(s.slug));
  const filtro = conTrabajos.length > 1;
  const css = filtro
    ? conTrabajos
        .map(
          (s) =>
            `#archivo:has(#servicio-${s.slug}:target) article[data-servicio]:not([data-servicio="${s.slug}"]),` +
            `#archivo:has(#servicio-${s.slug}:target) article:not([data-servicio]){display:none}` +
            `#archivo:has(#servicio-${s.slug}:target) a[href="#servicio-${s.slug}"]{background:var(--color-superficie);border-bottom-color:var(--color-superficie);color:var(--color-primario);font-weight:700}` +
            `#archivo:has(#servicio-${s.slug}:target) a[href="#archivo"]{background:var(--color-alterna);border-bottom-color:var(--color-texto);color:var(--color-texto);font-weight:400}`,
        )
        .join("")
    : "";
  const pestana =
    "-mb-px flex min-h-11 flex-none items-center border border-texto px-3.5 font-titulo text-xs tracking-[0.04em] whitespace-nowrap uppercase no-underline";

  return (
    <Marco {...datosMarco(config)} pagina="trabajos" campos={trabajos.map((t) => ({ id: `t-${t.slug}`, texto: t.titulo }))}>
      <CabeceraParte
        tipo="Archivo de partes"
        casillas={[{ rotulo: "Partes", valor: dosCifras(trabajos.length || galeria.length) }]}
        titulo="Trabajos realizados"
        entradilla="Cada trabajo, con su parte: dónde, cuándo y cuánto duró."
      />
      <section id="archivo" aria-label="Archivo de trabajos" className="scroll-mt-16 px-(--pad) pt-(--sec)">
        {css && <style>{css}</style>}
        {trabajos.length > 0 ? (
          <>
            {conTrabajos.map((s) => (
              <span key={s.slug} id={`servicio-${s.slug}`} className="block scroll-mt-16" />
            ))}
            {filtro && (
              <nav aria-label="Filtrar por servicio" className="flex gap-1 overflow-x-auto border-b border-texto pl-2">
                <a href="#archivo" className={`${pestana} border-b-superficie bg-superficie font-bold text-primario`}>
                  Todos
                </a>
                {conTrabajos.map((s) => (
                  <a key={s.slug} href={`#servicio-${s.slug}`} className={`${pestana} bg-alterna`}>
                    {s.titulo}
                  </a>
                ))}
              </nav>
            )}
            <div className={`border border-texto bg-superficie px-4 ${filtro ? "border-t-0" : ""}`}>
              {trabajos.map((t, i) => (
                <FichaTrabajo key={t.slug} trabajo={t} indice={i} fondoCasillas="fondo" conEnlace />
              ))}
            </div>
          </>
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6 border border-texto bg-superficie p-4">
            {galeria.map((g, i) => (
              <li key={g.src} className={i % 2 ? "giro-der" : "giro-izq"}>
                <Foto imagen={g} sizes="(min-width: 64rem) 220px, 45vw" marco="pequena" />
                {g.titulo && <p className="mt-1.5 font-titulo text-xs">{g.titulo}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
      <CtaFinal contacto={config.contacto} confianza={lineaConfianza(config)} mensaje={mensajeAviso(contacto)} />
    </Marco>
  );
}
