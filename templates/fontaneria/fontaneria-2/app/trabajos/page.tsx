import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { hayPrecios } from "@/lib/precios";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { TarjetasTrabajo } from "@/components/secciones/TarjetasTrabajo";
import { h1Pagina } from "@/lib/estilos";
import { cn } from "@/lib/utils";
import { mensajeBase } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

const PILDORA =
  "foco inline-flex min-h-11 items-center rounded-full border border-borde bg-fondo px-4.5 text-base font-semibold text-texto no-underline hover:bg-alterna";
const ACTIVA = "border-texto bg-texto text-fondo hover:bg-texto";

/**
 * /trabajos (encargo §7): tarjetas con foto 4:3 y contexto, con filtro por servicio en píldoras. Sin
 * trabajos, la `galeria` en rejilla con radio 20 px. Sin trabajos ni galería, 404 (y fuera del menú).
 *
 * Filtro sin JavaScript ni `?servicio=` (con cacheComponents, leer searchParams obliga a un Suspense que
 * sin JavaScript no se pinta): cada píldora es un ancla `#servicio-<slug>` y una regla CSS generada con
 * los datos oculta, con `:target`, las tarjetas de los demás servicios. Solo con 2 o más servicios con
 * trabajos.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, contacto } = config;
  const conTrabajos = config.servicios.filter((s) => trabajos.some((t) => t.servicio === s.slug));
  const filtro = conTrabajos.length >= 2;
  const conPrecio = trabajos.some((t) => t.precio);

  const css = conTrabajos
    .map((s) => {
      const id = `#servicio-${s.slug}`;
      return (
        `${id}:target~.rejilla-trabajos>li:not([data-servicio="${s.slug}"]){display:none}` +
        `${id}:target~.filtros a[href="${id}"]{background:var(--color-texto);border-color:var(--color-texto);color:var(--color-fondo)}` +
        `${id}:target~.filtros a[href="#trabajos"]{background:var(--color-fondo);border-color:var(--color-borde);color:var(--color-texto)}`
      );
    })
    .join("");

  return (
    <>
      <section id="trabajos" className="contenedor flex flex-col gap-6 pt-[clamp(20px,3vw,40px)] pb-[clamp(48px,6vw,88px)]">
        <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "/trabajos", texto: "Trabajos" }]} />
        <div className="flex max-w-180 flex-col gap-3">
          <h1 className={h1Pagina}>Trabajos</h1>
          <p className="m-0 text-texto-suave">
            {trabajos.length === 0
              ? "Fotos de algunos trabajos recientes."
              : `Algunos avisos recientes, con dónde fue${conPrecio ? ", cuánto duró y lo que costó." : " y cuánto duró."}`}
          </p>
        </div>

        {trabajos.length === 0 ? (
          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
            {galeria.map((g, i) => (
              <li key={g.src} className="flex flex-col gap-2">
                <Foto imagen={g} preload={i === 0} proporcion="4/3" sizes="(min-width: 960px) 380px, (min-width: 768px) 50vw, 100vw" />
                {g.titulo && <p className="m-0 font-semibold">{g.titulo}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-6">
            {filtro && (
              <>
                <style>{css}</style>
                {conTrabajos.map((s) => (
                  <span key={s.slug} id={`servicio-${s.slug}`} className="sr-only" />
                ))}
                <nav aria-label="Filtrar por servicio" className="filtros">
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    <li>
                      <a href="#trabajos" className={cn(PILDORA, ACTIVA)}>
                        Todos
                      </a>
                    </li>
                    {conTrabajos.map((s) => (
                      <li key={s.slug}>
                        <a href={`#servicio-${s.slug}`} className={PILDORA}>
                          {s.titulo}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            )}
            <TarjetasTrabajo trabajos={trabajos} nivel="h2" conFiltro={filtro} preloadPrimera />
          </div>
        )}
      </section>
      <CtaFinal contacto={config.contacto} valoracion={config.valoracion} conPrecios={hayPrecios(config)} mensaje={mensajeBase(contacto)} />
    </>
  );
}
