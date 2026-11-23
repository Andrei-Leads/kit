import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Filete } from "@/components/TituloSeccion";
import { Foto } from "@/components/base/Foto";
import { AnclasEstancias, GrupoPagina } from "@/components/secciones/Estancias";
import { mensajeInicio } from "@/lib/mensajes";
import { estancias } from "@/lib/textos";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/**
 * /trabajos (encargo §7): agrupados por servicio como en el inicio, con todos los trabajos y la
 * fila de anclas arriba (con 2 grupos o más). Sin trabajos, la `galeria`. Sin nada, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto, galeria } = config;
  const grupos = estancias(config.trabajos, config.servicios);
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) };
  return (
    <div data-pagina="trabajos">
      <section className="marco pt-[clamp(56px,8vw,128px)]">
        <h1 className="titulo-display">
          Trabajos, <em>estancia por estancia</em>
        </h1>
        <Filete className="mt-8" />
        <AnclasEstancias estancias={grupos} />
      </section>
      {grupos.map((g, i) => (
        <GrupoPagina key={g.id} estancia={g} indice={i} contacto={contacto} />
      ))}
      {grupos.length === 0 && (
        <ul className="marco grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-x-6 gap-y-10 pt-[clamp(40px,6vw,96px)]">
          {galeria.map((g) => (
            <li key={g.src}>
              <figure className="grid gap-2.5">
                <Foto imagen={g} sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 100vw" proporcion="4/5" />
                {g.titulo && <figcaption className="pie-foto">{g.titulo}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      )}
      <section aria-label="Contacto" className="marco py-[clamp(56px,7vw,96px)]">
        <Pareja cta={cta} />
      </section>
    </div>
  );
}
