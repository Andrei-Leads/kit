import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { MarcaPagina } from "@/components/MarcaPagina";
import { BandaTrabajo, type DatosBanda } from "@/components/secciones/BandaTrabajo";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { mensajeInicio } from "@/lib/mensajes";
import { contextoTrabajo, datosCta, lineaConfianza, lugarAnio } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/**
 * Filtro por servicio sin JavaScript y con la página estática: cada enlace
 * apunta a `#servicio-<slug>` y el CSS (`:target` + `:has()`) oculta las demás
 * bandas y marca el enlace. (El encargo pedía `?servicio=`; con
 * `cacheComponents` eso obliga a pintar la página en cada visita.) Los slugs
 * solo llevan [a-z0-9-] (lo valida core): seguros dentro del CSS.
 */
function cssFiltro(slugs: string[]): string {
  const activo = "color:var(--color-texto);border-bottom-color:var(--color-texto)";
  return [
    ...slugs.map(
      (s) =>
        `main:has(#servicio-${s}:target) [data-servicio]:not([data-servicio="${s}"]){display:none}` +
        `main:has(#servicio-${s}:target) a[href="#servicio-${s}"]{${activo}}` +
        `main:has(#servicio-${s}:target) a[href="#servicio-${s}"] .filtro-activo{display:inline}`,
    ),
    `main:not(:has([data-filtro]:target)) a[data-todos]{${activo}}`,
    `main:not(:has([data-filtro]:target)) a[data-todos] .filtro-activo{display:inline}`,
  ].join("\n");
}

/** /trabajos (encargo §7): hero, filtro por servicio y bandas 4:1. Sin trabajos, la galería en bandas. Sin nada, 404. */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, contacto } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const conTrabajos = config.servicios.filter((s) => trabajos.some((t) => t.servicio === s.slug));
  const bandas: (DatosBanda & { servicio?: string })[] =
    trabajos.length > 0
      ? trabajos.map((t) => ({
          clave: t.slug,
          servicio: t.servicio ?? "",
          imagen: t.imagenes[0],
          etiqueta: lugarAnio(t) || undefined,
          titulo: t.titulo,
          descripcion: t.descripcion,
          contexto: contextoTrabajo(t).map((c) => c.dd).join(" · ") || undefined,
          href: `/trabajos/${t.slug}`,
        }))
      : galeria.map((g) => ({ clave: g.src, imagen: g, titulo: g.titulo }));
  const fotos = trabajos.length > 0 ? [trabajos[0]?.imagenes[0], trabajos[1]?.imagenes[0] ?? trabajos[0]?.imagenes[1]] : [galeria[0], galeria[1]];
  const filtro = trabajos.length > 0 && conTrabajos.length > 1;

  return (
    <>
      <MarcaPagina pagina="trabajos" inicioClaro />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
        ]}
        etiqueta="Trabajos"
        titulo={
          <>
            Trabajos con <em>nombre y lugar</em>
          </>
        }
        frase={`Obras terminadas en ${contacto.direccion.ciudad} y alrededores, cada una con su lugar, su año y su plazo.`}
        cta={cta}
        confianza={lineaConfianza(config)}
        fotos={[fotos[0], fotos[1]]}
      />
      <section data-tono="claro" aria-label="Lista de trabajos" className="bg-fondo pb-[var(--espacio-seccion)]">
        <div className="contenedor flex flex-col">
          {filtro && (
            <>
              <style>{cssFiltro(conTrabajos.map((s) => s.slug))}</style>
              {conTrabajos.map((s) => (
                <span key={s.slug} id={`servicio-${s.slug}`} data-filtro className="block scroll-mt-28" />
              ))}
              <nav aria-label="Filtrar por servicio" className="-mx-[var(--margen)] mb-12 overflow-x-auto border-b border-borde px-[var(--margen)] lg:mx-0 lg:px-0">
                <ul className="m-0 flex list-none gap-8 p-0 whitespace-nowrap">
                  <li>
                    <Link href="/trabajos" data-todos className="filtro-enlace">
                      Todos<span className="filtro-activo sr-only">, seleccionado</span>
                    </Link>
                  </li>
                  {conTrabajos.map((s) => (
                    <li key={s.slug}>
                      <a href={`#servicio-${s.slug}`} className="filtro-enlace">
                        {s.titulo}
                        <span className="filtro-activo sr-only">, seleccionado</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
          <div className="flex flex-col gap-12 [&>*+*]:border-t [&>*+*]:border-borde [&>*+*]:pt-12">
            {bandas.map((b) => (
              <div key={b.clave} data-servicio={b.servicio}>
                <BandaTrabajo banda={b} nivel="h2" />
              </div>
            ))}
          </div>
          <Pareja cta={cta} className="mt-16 border-t border-borde pt-10" />
        </div>
      </section>
    </>
  );
}
