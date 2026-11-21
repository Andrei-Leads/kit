import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { Marco } from "@/components/Marco";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { mensajeCuadro } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/** Solo caracteres de slug (los valida core): seguros dentro del CSS generado. */
const seguro = (s: string) => /^[a-z0-9-]+$/.test(s);

/**
 * /trabajos (encargo §7): rejilla compacta de 3 columnas con línea de ficha. El filtro por servicio
 * es una fila de módulos pequeños que funciona sin JavaScript y sin hacer la página dinámica: cada
 * uno enlaza a `#servicio-<slug>` y el CSS generado oculta, con `:has(:target)`, los trabajos de
 * otros servicios y baja la palanca del módulo activo. Sin trabajos, la `galeria`. Sin ninguno, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, servicios, contacto } = config;
  const conTrabajos = servicios.filter((s) => trabajos.some((t) => t.servicio === s.slug) && seguro(s.slug));
  const filtro = conTrabajos.length > 1;
  const activo = "background:var(--color-etiqueta)";
  const css = filtro
    ? conTrabajos
        .map(
          (s) =>
            `#rejilla:has(#servicio-${s.slug}:target) li[data-servicio]:not([data-servicio="${s.slug}"]),` +
            `#rejilla:has(#servicio-${s.slug}:target) li[data-trabajo]:not([data-servicio]){display:none}` +
            `#rejilla:has(#servicio-${s.slug}:target) a[href="#servicio-${s.slug}"]{${activo}}` +
            `#rejilla:has(#servicio-${s.slug}:target) a[href="#servicio-${s.slug}"] .maneta-filtro{translate:0 12px}` +
            `#rejilla:has(#servicio-${s.slug}:target) a[href="#rejilla"]{background:var(--color-superficie)!important}` +
            `#rejilla:has(#servicio-${s.slug}:target) a[href="#rejilla"] .maneta-filtro{translate:none}`,
        )
        .join("")
    : "";
  const modulo =
    "-ml-px flex min-h-12 items-center gap-2.5 border border-borde bg-superficie pr-3.5 pl-2.5 text-[15px] font-medium text-texto no-underline hover:bg-etiqueta focus-visible:relative focus-visible:z-[1]";

  return (
    <Marco actual="trabajos">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
        ]}
        className="contenedor pt-2"
      />
      <section id="rejilla" aria-labelledby="h1-trabajos" className="contenedor flex scroll-mt-20 flex-col gap-5 pt-3">
        {css && <style>{css}</style>}
        <h1 id="h1-trabajos" className="text-display leading-[1.02] font-semibold">
          Trabajos
        </h1>
        {trabajos.length > 0 ? (
          <>
            {/* Destinos del filtro: altura 0 y sin hueco en la columna (el -mb anula el gap). */}
            <div className="-mb-5 h-0">
              {conTrabajos.map((s) => (
                <span key={s.slug} id={`servicio-${s.slug}`} className="block scroll-mt-20" />
              ))}
            </div>
            {filtro && (
              <nav aria-label="Filtrar por servicio">
                <ul className="flex flex-wrap gap-y-2 pl-px">
                  {[{ slug: "", titulo: "Todos" }, ...conTrabajos].map((s) => (
                    <li key={s.slug || "todos"} className="flex">
                      <a href={s.slug ? `#servicio-${s.slug}` : "#rejilla"} className={modulo} style={s.slug ? undefined : { background: "var(--color-etiqueta)" }}>
                        <span aria-hidden="true" className="flex h-[26px] w-2.5 bg-texto-suave pt-px">
                          <span className={`maneta-filtro h-3 w-2.5 border border-texto bg-superficie ${s.slug ? "" : "translate-y-3"}`} />
                        </span>
                        {s.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3.5">
              {trabajos.map((t) => (
                <li key={t.slug} data-trabajo="" data-servicio={t.servicio} data-aparecer="">
                  <TarjetaTrabajo trabajo={t} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-3">
            {galeria.map((g) => (
              <li key={g.src}>
                <figure>
                  <Foto imagen={g} proporcion="1/1" sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 92vw" className="border border-carril" />
                  {g.titulo && <figcaption className="mt-1.5 text-[15px] font-medium">{g.titulo}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        )}
      </section>
      <CtaFinal contacto={contacto} mensaje={mensajeCuadro(contacto)} />
    </Marco>
  );
}
