import Link from "next/link";
import { BotonLlamada, enlacesLegales, listaRedes, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "nombreLegal" | "descripcionCorta">;
  contacto: Pick<SiteConfig["contacto"], "telefono">;
  redes: SiteConfig["redes"];
  items: Ancla[];
};

/** Pie sobre --color-alterna: nombre, descripción, teléfono, páginas, legales (core) y redes. */
export async function Pie({ negocio, contacto, redes, items }: Props) {
  const anio = await anioActual();
  const enlace = "inline-flex min-h-11 items-center";
  return (
    <footer className="mt-auto bg-alterna pt-12 pb-7">
      <div className="contenedor flex flex-col gap-7">
        <div className="flex flex-wrap justify-between gap-x-12 gap-y-6">
          <div className="flex max-w-[420px] flex-[1_1_280px] flex-col gap-2">
            <p className="m-0 text-xl font-black">{negocio.nombre}</p>
            <p className="m-0 text-[15.5px] leading-normal text-texto-suave">{negocio.descripcionCorta}</p>
            <BotonLlamada telefono={contacto.telefono} className={`${enlace} w-fit text-lg font-black underline underline-offset-[3px]`}>
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
          </div>
          <nav aria-label="Páginas">
            <ul className="m-0 flex list-none flex-col p-0">
              {items.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className={`${enlace} text-[15.5px] font-bold no-underline hover:underline`}>
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-linea-fuerte pt-[18px] text-sm text-texto-suave">
          <p className="m-0">
            © {anio} {negocio.nombreLegal}
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-x-4 p-0">
            {enlacesLegales.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className={`${enlace} underline underline-offset-[3px]`}>
                  {e.texto}
                </Link>
              </li>
            ))}
            {listaRedes(redes).map((r) => (
              <li key={r.href}>
                <a href={r.href} target="_blank" rel="noopener noreferrer" className={enlace}>
                  {r.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
