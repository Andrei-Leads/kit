import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Marco } from "@/components/Marco";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FichaCaso } from "@/components/secciones/FichaCaso";
import { dosCifras } from "@/lib/formato";
import { mensajeEdificio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/** Solo caracteres de slug (los valida core): seguros dentro del CSS generado. */
const seguro = (s: string) => /^[a-z0-9-]+$/.test(s);

/**
 * /trabajos (encargo §7): fichas de caso con lámina 3:2 y línea de ficha con cotas. El filtro por
 * servicio es un índice de texto que funciona sin JavaScript y sin hacer la página dinámica: cada
 * entrada enlaza a `#servicio-<slug>` y el CSS generado oculta, con `:has(:target)`, los casos de
 * otros servicios. Solo salen servicios con algún trabajo. Sin trabajos, la `galeria` con pies.
 * Sin ninguno de los dos, 404.
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
            `#casos:has(#servicio-${s.slug}:target) article[data-servicio]:not([data-servicio="${s.slug}"]),` +
            `#casos:has(#servicio-${s.slug}:target) article:not([data-servicio]){display:none}` +
            `#casos:has(#servicio-${s.slug}:target) a[href="#servicio-${s.slug}"] .rotulo-filtro{text-decoration-line:underline;font-weight:700}` +
            `#casos:has(#servicio-${s.slug}:target) a[href="#casos"] .rotulo-filtro{text-decoration-line:none;font-weight:400}`,
        )
        .join("")
    : "";
  const entrada =
    "inline-flex min-h-11 items-baseline gap-2 py-2 focus-visible:outline-2 focus-visible:outline-foco hover:[&_.rotulo-filtro]:underline";

  return (
    <Marco actual="trabajos">
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
        ]}
        titulo="Trabajos"
        entradilla={trabajos.length > 0 ? "Obras terminadas, con su lugar, su año y su alcance." : undefined}
        className="pb-8 lg:pb-10"
      />
      <section id="casos" aria-label="Trabajos realizados" className="contenedor scroll-mt-20 pb-16 lg:pb-24">
        {css && <style>{css}</style>}
        {trabajos.length > 0 ? (
          <>
            {conTrabajos.map((s) => (
              <span key={s.slug} id={`servicio-${s.slug}`} className="block scroll-mt-20" />
            ))}
            {filtro && (
              <nav aria-label="Filtrar por servicio" className="mb-10 border-y border-linea-plano border-t-texto py-2">
                <ul className="flex flex-wrap gap-x-6">
                  <li>
                    <a href="#casos" className={entrada}>
                      <span aria-hidden="true" className="cifras-antiguas font-titulo text-[0.875rem] text-texto-suave">
                        00
                      </span>
                      <span className="rotulo-filtro font-bold decoration-1 underline-offset-4 [text-decoration-line:underline]">Todos</span>
                    </a>
                  </li>
                  {conTrabajos.map((s, i) => (
                    <li key={s.slug}>
                      <a href={`#servicio-${s.slug}`} className={entrada}>
                        <span aria-hidden="true" className="cifras-antiguas font-titulo text-[0.875rem] text-texto-suave">
                          {dosCifras(i + 1)}
                        </span>
                        <span className="rotulo-filtro decoration-1 underline-offset-4">{s.titulo}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
              {trabajos.map((t) => (
                <FichaCaso key={t.slug} trabajo={t} />
              ))}
            </div>
          </>
        ) : (
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {galeria.map((g) => (
              <li key={g.src}>
                <Foto imagen={g} sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw" marco="lamina" pie={g.titulo} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <CtaFinal contacto={contacto} mensaje={mensajeEdificio(contacto)} />
    </Marco>
  );
}
