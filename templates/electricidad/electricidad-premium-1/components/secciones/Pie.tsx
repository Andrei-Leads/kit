import Link from "next/link";
import { direccionLinea, enlacesLegales, listaRedes, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { Lema } from "@/components/secciones/Lema";
import { anioActual } from "@/lib/anio";

type Props = Pick<SiteConfig, "negocio" | "contacto" | "redes"> & { enlaces: readonly Ancla[] };

function Columna({ titulo, enlaces, externos }: { titulo: string; enlaces: readonly Ancla[]; externos?: boolean }) {
  if (enlaces.length === 0) return null;
  return (
    <nav aria-label={titulo}>
      <p className="etiqueta m-0 mb-4 text-acento">{titulo}</p>
      <ul className="m-0 flex list-none flex-col p-0">
        {enlaces.map((e) => (
          <li key={e.href}>
            {externos ? (
              <a href={e.href} rel="noopener noreferrer" target="_blank" className="inline-flex min-h-11 items-center no-underline hover:underline md:min-h-9">
                {e.texto}
              </a>
            ) : (
              <Link href={e.href} className="inline-flex min-h-11 items-center no-underline hover:underline md:min-h-9">
                {e.texto}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Pie sobre tinta (encargo §6): el lema en grande, datos, rutas, legales, redes y razón social. */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const { calle, cp, ciudad } = contacto.direccion;
  return (
    <footer className="pie border-t border-[var(--color-linea)] bg-tinta pt-[clamp(64px,3rem+4vw,128px)] pb-24 text-texto">
      <div className="contenedor">
        <Lema />
        <div className="mt-[clamp(48px,3rem+2vw,80px)] grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="m-0 mb-4 font-titulo text-xl font-medium">{negocio.nombre}</p>
            <address className="text-[15px] leading-relaxed text-texto-suave not-italic">
              <span className="sr-only">{direccionLinea(contacto.direccion)}</span>
              <span aria-hidden="true">
                {calle}
                <br />
                {cp} {ciudad}
              </span>
            </address>
            <a href={`mailto:${contacto.email}`} className="mt-3 inline-flex min-h-11 items-center text-[15px] break-all underline">
              {contacto.email}
            </a>
          </div>
          <Columna titulo="Web" enlaces={enlaces} />
          <Columna titulo="Legal" enlaces={enlacesLegales} />
          <Columna titulo="Redes" enlaces={listaRedes(redes)} externos />
        </div>
        <p className="mt-16 border-t border-[var(--color-linea)] pt-6 text-xs leading-relaxed text-texto-suave">
          {[negocio.nombreLegal, `NIF ${negocio.nif}`, negocio.registroMercantil, `© ${anio}`].filter(Boolean).join(" · ")}
        </p>
      </div>
    </footer>
  );
}
