import Link from "next/link";
import { BotonLlamada, enlacesLegales, listaRedes, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  enlaces: readonly Ancla[];
};

const ENLACE = "inline-flex min-h-11 items-center text-texto underline decoration-primario underline-offset-4";

/** Pie (entrega): nombre y descripción, navegación, contacto y redes; abajo, © y legales. */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const redesLista = listaRedes(redes);
  return (
    <footer className="border-t border-borde pb-[calc(80px+env(safe-area-inset-bottom))] lg:pb-0">
      <div className="contenedor pt-12 pb-7">
        <div className="flex flex-wrap justify-between gap-x-16 gap-y-8">
          <div className="max-w-[380px] flex-[1_1_260px]">
            <p className="text-[22px] leading-tight font-[650]">{negocio.nombre}</p>
            <p className="mt-2 text-[15px] text-texto-suave">{negocio.descripcionCorta}</p>
          </div>
          <nav aria-label="Pie" className="flex flex-col text-base">
            {enlaces.map((e) => (
              <Link key={e.href} href={e.href} className="inline-flex min-h-11 items-center text-texto no-underline hover:underline">
                {e.texto}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col text-base text-texto-suave">
            <BotonLlamada telefono={contacto.telefono} className={ENLACE}>
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
            <a href={`mailto:${contacto.email}`} className={`${ENLACE} [overflow-wrap:anywhere]`}>
              {contacto.email}
            </a>
            <span className="py-2">
              {contacto.direccion.calle} · {contacto.direccion.cp} {contacto.direccion.ciudad}
            </span>
            {redesLista.map((r) => (
              <a key={r.href} href={r.href} className={ENLACE}>
                {r.texto}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-5 border-t border-borde pt-4 text-sm text-texto-suave">
          <span className="py-2">
            © {anio} {negocio.nombre}
          </span>
          {enlacesLegales.map((e) => (
            <Link key={e.href} href={e.href} className="inline-flex min-h-11 items-center text-texto-suave underline underline-offset-4">
              {e.texto}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
