import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina, trabajosDelServicio, type Trabajo } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FilasTrabajos } from "@/components/secciones/FilasTrabajos";
import { mensajeBase } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

type Grupo = { id: string; titulo: string; trabajos: Trabajo[] };

/** Trabajos agrupados por servicio, en el orden de `servicios`; los que no tienen servicio, al final. */
function grupos(): Grupo[] {
  const lista: Grupo[] = config.servicios
    .map((s) => ({ id: `servicio-${s.slug}`, titulo: s.titulo, trabajos: trabajosDelServicio(config.trabajos, s) }))
    .filter((g) => g.trabajos.length > 0);
  const sueltos = config.trabajos.filter((t) => !t.servicio);
  if (sueltos.length > 0) lista.push({ id: "otros-avisos", titulo: "Otros avisos", trabajos: sueltos });
  return lista;
}

/**
 * /trabajos (encargo §7): lista compacta de avisos resueltos. El filtro por servicio son chips en
 * paralelogramo con anclas `#servicio-<slug>` (página estática, sin `searchParams`; decisión común de
 * la tanda). Sin trabajos, la galería en rejilla de 3. Sin trabajos ni galería, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto } = config;
  const lista = grupos();
  const conFiltro = lista.length > 1;

  return (
    <>
      <section className="bg-fondo [background-image:var(--haz)]">
        <div className="contenedor flex flex-col gap-6 pt-2 pb-10 lg:pb-14">
          <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "/trabajos", texto: "Trabajos" }]} />
          <h1 id="inicio-trabajos" className="titulo-h1 m-0">
            {config.trabajos.length > 0 ? "Avisos resueltos" : "Trabajos"}
          </h1>

          {conFiltro && (
            <nav aria-label="Filtrar por servicio">
              <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-2 p-0 ps-1.5">
                {lista.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="chip normal-case tracking-normal text-texto">
                      {g.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {lista.length > 0 &&
            (conFiltro ? (
              lista.map((g) => (
                <section key={g.id} id={g.id} aria-labelledby={`${g.id}-titulo`} className="flex scroll-mt-4 flex-col gap-3 pt-4">
                  <h2 id={`${g.id}-titulo`} className="condensada m-0 text-[1.75rem] leading-none uppercase">
                    {g.titulo}
                  </h2>
                  <FilasTrabajos trabajos={g.trabajos} />
                </section>
              ))
            ) : (
              <FilasTrabajos trabajos={config.trabajos} nivel="h2" />
            ))}

          {config.trabajos.length === 0 && (
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {config.galeria.map((f) => (
                <li key={f.src}>
                  <figure className="m-0 flex flex-col gap-2">
                    <Foto imagen={f} proporcion="4/3" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                    {f.titulo && <figcaption className="text-[0.9375rem] text-texto-suave">{f.titulo}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          )}
          {conFiltro && (
            <p className="m-0">
              <Link href="#inicio-trabajos" className="foco inline-flex min-h-11 items-center text-texto-suave underline">
                Volver arriba
              </Link>
            </p>
          )}
        </div>
      </section>
      <CtaFinal contacto={contacto} mensaje={mensajeBase(contacto)} />
    </>
  );
}
