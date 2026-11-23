import Link from "next/link";
import { BotonLlamada, direccionLinea, enlacesLegales, listaRedes, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import type { EnlaceMenu } from "@/lib/navegacion";
import { anioActual } from "@/lib/anio";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  enlaces: readonly EnlaceMenu[];
};

const ENLACE = "inline-flex min-h-11 items-center text-texto underline underline-offset-4 hover:text-primario-texto";

/** Pie (entrega): sobre `alterna`; nombre y dirección, navegación, contacto y redes; abajo, © y legales. */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  return (
    <footer className="marco border-t border-filete bg-alterna pt-[clamp(56px,7vw,96px)] pb-[calc(88px+env(safe-area-inset-bottom))] lg:pb-8">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-12 gap-y-8">
        <div className="flex flex-col gap-2.5">
          <p className="font-titulo text-[28px] leading-[1.1] tracking-[-0.01em] text-balance">{negocio.nombre}</p>
          <p className="text-[15px] text-texto-suave">{direccionLinea(contacto.direccion)}</p>
        </div>
        <nav aria-label="Pie" className="flex flex-col text-[15px]">
          {enlaces.map((e) => (
            <Link key={e.href} href={e.href} className={ENLACE}>
              {e.texto}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col text-[15px]">
          <BotonLlamada telefono={contacto.telefono} className={ENLACE}>
            {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
          <a href={`mailto:${contacto.email}`} className={`${ENLACE} [overflow-wrap:anywhere]`}>
            {contacto.email}
          </a>
          {listaRedes(redes).map((r) => (
            <a key={r.href} href={r.href} className={ENLACE}>
              {r.texto}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 border-t border-filete pt-5 text-sm text-texto-suave">
        <span className="py-2">
          © {anio} {negocio.nombreLegal}
        </span>
        {enlacesLegales.map((e) => (
          <Link key={e.href} href={e.href} className="inline-flex min-h-11 items-center text-texto-suave underline underline-offset-4 hover:text-texto">
            {e.texto}
          </Link>
        ))}
      </div>
    </footer>
  );
}
