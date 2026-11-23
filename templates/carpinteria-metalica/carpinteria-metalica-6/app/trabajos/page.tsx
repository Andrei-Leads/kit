import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Galeria } from "@/components/secciones/Galeria";
import { RejillaFachadas } from "@/components/secciones/TarjetaFachada";
import { mensajeInicio } from "@/lib/mensajes";
import { conAntesPrimero } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Fachadas" });

const CHIP = "inline-flex min-h-11 items-center rounded-pastilla border border-borde bg-superficie px-4 text-[15px] font-bold no-underline hover:bg-primario-suave";

/**
 * /trabajos «Fachadas» (encargo §7 e Interiores.dc.html): migas, h1, filtro por servicio y las
 * tarjetas con deslizador (1 o 2 columnas). Sin trabajos, la galería; sin nada, 404.
 *
 * Filtro sin JavaScript y sin `searchParams` (la página sigue estática): cada pastilla es un
 * enlace a `#servicio-<slug>`, y un `<style>` generado de los datos oculta las tarjetas de los
 * demás servicios con `:target`. «Todas» vuelve a `#fachadas`.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto, trabajos, galeria, servicios } = config;
  const lista = conAntesPrimero(trabajos);
  const filtros = servicios.filter((s) => trabajos.some((t) => t.servicio === s.slug));
  const conFiltro = filtros.length >= 2;
  // Los slugs solo llevan [a-z0-9-] (los valida core): seguros dentro de un selector.
  const css = filtros
    .map(
      (s) =>
        `body:has(#servicio-${s.slug}:target) [data-servicio]:not([data-servicio="${s.slug}"]){display:none}` +
        `body:has(#servicio-${s.slug}:target) [data-filtro="${s.slug}"]{background:var(--color-texto);color:var(--color-fondo);border-color:var(--color-texto)}` +
        `body:has(#servicio-${s.slug}:target) [data-filtro="todas"]{background:var(--color-superficie);color:var(--color-texto);border-color:var(--color-borde)}`,
    )
    .join("");
  return (
    <>
      <span data-pagina="trabajos" hidden />
      <section id="fachadas" className="contenedor pt-2 pb-[clamp(56px,2rem+6vw,112px)]">
        <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "/trabajos", texto: "Fachadas" }]} />
        <h1 className="titulo-display mt-2">Fachadas</h1>
        <p className="mt-4 max-w-[40rem] text-texto-suave">
          {trabajos.some((t) => t.antes)
            ? "Antes y después de nuestros trabajos. Desliza cada foto para ver el cambio."
            : `Trabajos terminados en ${contacto.direccion.ciudad} y alrededores.`}
        </p>
        {conFiltro && (
          <>
            <style>{css}</style>
            {filtros.map((s) => (
              <span key={s.slug} id={`servicio-${s.slug}`} className="block scroll-mt-24" />
            ))}
            <nav aria-label="Filtrar por servicio" className="mt-6 -mr-4 overflow-x-auto pr-4">
              <ul className="flex gap-2 max-lg:w-max lg:flex-wrap">
                <li>
                  <a href="#fachadas" data-filtro="todas" className={`${CHIP} border-texto bg-texto text-fondo hover:bg-texto`}>
                    Todas
                  </a>
                </li>
                {filtros.map((s) => (
                  <li key={s.slug}>
                    <a href={`#servicio-${s.slug}`} data-filtro={s.slug} className={CHIP}>
                      {s.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
        <div className="mt-[clamp(28px,4vw,40px)]">
          {lista.length > 0 ? (
            <RejillaFachadas trabajos={lista} whatsapp={contacto.whatsapp} nivel="h2" preloadPrimera />
          ) : (
            <Galeria galeria={galeria} />
          )}
        </div>
      </section>
      <CtaFinal
        cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
        titulo="¿Cómo quedaría tu fachada?"
        texto={contacto.whatsapp ? "Hazle una foto desde la acera de enfrente y mándanosla. Te decimos qué cambiaríamos." : undefined}
      />
    </>
  );
}
