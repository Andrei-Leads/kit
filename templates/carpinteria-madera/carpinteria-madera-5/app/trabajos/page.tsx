import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina, servicioDelTrabajo, type Trabajo } from "@andrei-leads/core";

import { ArcosGaleria, ArcosTrabajos } from "@/components/Arcos";
import { Pareja } from "@/components/Botones";
import { Par } from "@/components/Par";
import { Migas } from "@/components/base/Migas";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Restauraciones" });

type ConAntes = Trabajo & { antes: NonNullable<Trabajo["antes"]> };

/**
 * /trabajos «Restauraciones» (encargo §7): migas, h1, anclas por servicio (enlaces a la primera
 * restauración de cada uno, sin filtro con JavaScript), todos los pares grandes y, después, los
 * trabajos sin `antes` en arcos. Sin trabajos, la galería. Sin nada, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, contacto } = config;
  const pares = trabajos.filter((t): t is ConAntes => Boolean(t.antes));
  const solas = trabajos.filter((t) => !t.antes);
  // El ancla de cada servicio va en su primer trabajo (par o arco, en el orden de la página).
  const orden = [...pares, ...solas];
  const primeros = new Map<string, string>();
  for (const t of orden) if (t.servicio && !primeros.has(t.servicio)) primeros.set(t.servicio, t.slug);
  const ancla = (t: Trabajo) => (t.servicio && primeros.get(t.servicio) === t.slug ? `servicio-${t.servicio}` : undefined);
  const anclas = [...primeros.keys()].map((s) => config.servicios.find((x) => x.slug === s)).filter((s) => s !== undefined);

  return (
    <section className="contenedor pt-10 pb-[clamp(56px,8vw,104px)]">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Restauraciones" },
        ]}
      />
      <h1 className="titulo-display mt-3">Restauraciones</h1>
      <p className="mt-3 max-w-[44ch] text-texto-suave text-pretty">Cada pieza, como llegó al taller y como volvió a casa.</p>
      {anclas.length > 1 && (
        <nav aria-label="Por servicio" className="carril -mx-[clamp(16px,4vw,48px)] mt-6 overflow-x-auto px-[clamp(16px,4vw,48px)] pb-1">
          <ul className="flex gap-2">
            {anclas.map((s) => (
              <li key={s.slug} className="flex-none">
                <a
                  href={`#servicio-${s.slug}`}
                  className="flex min-h-12 items-center rounded-boton border-[1.5px] border-borde px-[18px] text-[15px] font-[560] whitespace-nowrap text-texto no-underline hover:border-texto"
                >
                  {s.titulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {pares.length > 0 && (
        <div className="mt-[clamp(32px,5vw,56px)] flex flex-col gap-[clamp(56px,8vw,96px)]">
          {pares.map((t, i) => (
            <Par key={t.slug} trabajo={t} whatsapp={contacto.whatsapp} nivel="h2" servicio={servicioDelTrabajo(config.servicios, t)} id={ancla(t)} preload={i === 0} />
          ))}
        </div>
      )}
      {solas.length > 0 && (
        <>
          {pares.length > 0 ? (
            <h2 className="mt-[clamp(56px,8vw,96px)] mb-5 text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] font-[620]">Más trabajos</h2>
          ) : (
            <div className="h-[clamp(32px,5vw,56px)]" />
          )}
          <ArcosTrabajos trabajos={solas} ancla={ancla} />
        </>
      )}
      {trabajos.length === 0 && (
        <div className="mt-[clamp(32px,5vw,56px)]">
          <ArcosGaleria galeria={galeria} />
        </div>
      )}
      <Pareja
        cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
        numeroEnLlamar
        className="mt-[clamp(40px,6vw,64px)] max-w-[620px]"
      />
    </section>
  );
}
