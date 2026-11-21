import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Encabezado } from "@/components/Encabezado";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { mensajeInicio } from "@/lib/mensajes";
import { lineaHorario, textoLlamar } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

const CHIP = "inline-flex min-h-11 items-center border border-borde px-3.5 text-sm font-semibold";

/**
 * Filtro por servicio sin JavaScript y sin renderizar por petición: cada etiqueta enlaza a
 * `#servicio-<slug>` y el CSS (`:target` + `:has()`) oculta los demás trabajos y marca la etiqueta.
 * (El diseño pedía `?servicio=`; con `cacheComponents` eso obliga a pintar la página en cada visita.)
 */
function cssFiltro(slugs: string[]): string {
  const reglas = slugs.map(
    (s) =>
      `main:has(#servicio-${s}:target) [data-servicio]:not([data-servicio="${s}"]){display:none}` +
      `main:has(#servicio-${s}:target) a[href="#servicio-${s}"]{background:var(--color-texto);color:var(--color-fondo);border-color:var(--color-texto)}`,
  );
  reglas.push(
    `main:not(:has([data-filtro]:target)) a[data-todos]{background:var(--color-texto);color:var(--color-fondo);border-color:var(--color-texto)}`,
  );
  return reglas.join("\n");
}

/** /trabajos: filas con miniatura 4:3, contexto y enlace. Sin trabajos, la galería en rejilla. Sin nada, 404. */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto, trabajos, galeria } = config;
  const conTrabajos = config.servicios.filter((s) => trabajos.some((t) => t.servicio === s.slug));
  return (
    <>
      <Encabezado
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
        ]}
        titulo="Trabajos"
      >
        {trabajos.length > 0 && conTrabajos.length > 1 && (
          <>
            <style>{cssFiltro(conTrabajos.map((s) => s.slug))}</style>
            {conTrabajos.map((s) => (
              <span key={s.slug} id={`servicio-${s.slug}`} data-filtro className="block scroll-mt-24" />
            ))}
            <nav aria-label="Filtrar por servicio" className="mt-6 flex flex-wrap gap-2">
              <Link href="/trabajos" data-todos className={CHIP}>
                Todos
              </Link>
              {conTrabajos.map((s) => (
                <a key={s.slug} href={`#servicio-${s.slug}`} className={CHIP}>
                  {s.titulo}
                </a>
              ))}
            </nav>
          </>
        )}
        {trabajos.length > 0 ? (
          <div className="mt-7 border-y-3 border-primario-luz [&>article+article]:border-t [&>article+article]:border-borde">
            {trabajos.map((t, i) => (
              <article key={t.slug} data-servicio={t.servicio ?? ""} className="flex flex-wrap gap-x-8 gap-y-4 py-5">
                <Foto imagen={t.imagenes[0]} sizes="(min-width: 1024px) 400px, calc(100vw - 32px)" proporcion="4/3" preload={i === 0} className="max-w-[400px] flex-[1_1_280px]" />
                <div className="min-w-0 flex-[2_1_360px]">
                  <p className="text-sm text-texto-suave tabular-nums">{[t.ubicacion, t.anio, t.duracion].filter(Boolean).join(" · ")}</p>
                  <h2 className="condensada mt-1.5 text-[clamp(1.625rem,1.2rem+1.4vw,2.5rem)] leading-[1.02]">
                    <Link href={`/trabajos/${t.slug}`} className="hover:text-primario-luz">
                      {t.titulo}
                    </Link>
                  </h2>
                  <p className="mt-2.5 max-w-[60ch] text-texto-suave">{t.descripcion}</p>
                  <Link href={`/trabajos/${t.slug}`} className="mt-1.5 inline-flex min-h-11 items-center gap-2 font-bold text-primario-luz underline underline-offset-4">
                    Ver el trabajo<span className="sr-only">: {t.titulo}</span> <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <ul className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
            {galeria.map((g) => (
              <li key={g.src}>
                <figure>
                  <Foto imagen={g} sizes="(min-width: 1024px) 380px, 50vw" proporcion="1/1" />
                  {g.titulo && <figcaption className="mt-2 text-sm text-texto-suave">{g.titulo}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        )}
      </Encabezado>
      <CtaFinal
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensaje={mensajeInicio(contacto)}
        textoLlamar={textoLlamar(contacto)}
        horario={lineaHorario(contacto)}
      />
    </>
  );
}
