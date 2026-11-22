import Link from "next/link";
import { direccionLinea, enlacesLegales, formatearHorario, listaRedes, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { Destacada } from "@/components/Titulo";
import { anioActual } from "@/lib/anio";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  enlaces: readonly Ancla[];
};

const ENLACE = "flex min-h-11 items-center underline-offset-4 hover:underline lg:min-h-8";

/** Pie (encargo §6.12): el lema a tamaño display, nombre, enlaces, horario, redes y legales. */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const horario = formatearHorario(contacto.horario);
  const listaDeRedes = listaRedes(redes);
  return (
    <footer data-tono="claro" className="relative z-[6] bg-fondo pt-[clamp(4rem,3rem+4vw,7rem)] pb-[calc(104px+env(safe-area-inset-bottom))] lg:pb-12">
      <div className="contenedor">
        <p className="titulo text-display leading-[1.02]">
          Hecho <Destacada>a medida.</Destacada> Hecho aquí.
        </p>
        <div className="mt-[clamp(48px,6vw,96px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-8 border-t border-borde pt-7 text-sm leading-[1.7]">
          <div>
            <p className="titulo text-xl leading-[1.2]">{negocio.nombre}</p>
            <p className="mt-2 text-texto-suave">{direccionLinea(contacto.direccion)}</p>
          </div>
          <nav aria-label="Pie" className="flex flex-col">
            {enlaces.map((e) => (
              <Link key={e.href} href={e.href} className={ENLACE}>
                {e.texto}
              </Link>
            ))}
          </nav>
          {horario.length > 0 && (
            <div>
              <p className="etiqueta text-texto-suave">Horario</p>
              {horario.map((h) => (
                <p key={h.dias}>
                  {h.dias} · {h.horas}
                </p>
              ))}
            </div>
          )}
          <div className="flex flex-col">
            {listaDeRedes.map((r) => (
              <a key={r.href} href={r.href} className={ENLACE} rel="noopener">
                {r.texto}
              </a>
            ))}
            {enlacesLegales.map((e) => (
              <Link key={e.href} href={e.href} className={ENLACE}>
                {e.texto}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-10 text-xs text-texto-suave">
          © {anio} {negocio.nombreLegal}
        </p>
      </div>
    </footer>
  );
}
