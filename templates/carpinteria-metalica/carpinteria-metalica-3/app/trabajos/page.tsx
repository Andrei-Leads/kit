import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Foto } from "@/components/Foto";
import { RejillaTrabajos, type TrabajoLista } from "@/components/secciones/RejillaTrabajos";
import config from "@/site.config";
import { hayTrabajos } from "@/lib/navegacion";
import { seccion } from "@/lib/estilos";

export const metadata: Metadata = { title: "Trabajos" };

export default function Page() {
  if (!hayTrabajos(config)) notFound();

  const hayTrabajosPropios = config.trabajos.length > 0;

  const trabajos: TrabajoLista[] = config.trabajos.map((t) => ({
    slug: t.slug,
    titulo: t.titulo,
    meta: [t.ubicacion, t.duracion].filter(Boolean).join(" · "),
    imagen: t.imagenes[0],
    conAntes: Boolean(t.antes),
    servicio: t.servicio,
  }));

  const slugsConTrabajos = new Set(trabajos.flatMap((t) => (t.servicio ? [t.servicio] : [])));
  const filtros = config.servicios
    .filter((s) => slugsConTrabajos.has(s.slug))
    .map((s) => ({ slug: s.slug, titulo: s.titulo }));

  return (
    <section className={`contenedor flex flex-col gap-5 ${seccion}`}>
      <div className="flex flex-col gap-2">
        <h1 className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.015em] md:text-[56px]">
          Trabajos
        </h1>
        <p className="m-0 text-tinta-suave">
          {hayTrabajosPropios
            ? "Algunas reparaciones recientes, con dónde y cuánto tardamos."
            : "Algunos trabajos recientes."}
        </p>
      </div>
      {hayTrabajosPropios ? (
        <RejillaTrabajos trabajos={trabajos} filtros={filtros} />
      ) : (
        <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-3 md:gap-5">
          {config.galeria.map((g) => (
            <li key={g.src}>
              <figure className="m-0 flex flex-col gap-2">
                <Foto imagen={g} proporcion="1/1" sizes="(min-width: 1120px) 360px, (min-width: 768px) 33vw, 50vw" />
                {g.titulo && (
                  <figcaption className="text-[15px] leading-tight font-bold text-pretty md:text-lg">
                    {g.titulo}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
