import Link from "next/link";
import { direccionLinea, enlacesLegales, listaRedes } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { indice } from "@/lib/navegacion";
import config from "@/site.config";

type Props = {
  /** Número de lámina de la página actual. */
  lamina: string;
};

/**
 * Pie (encargo §6): cajetín completo del plano (nombre, `nombreLegal`, NIF, dirección y la lámina
 * de la página con el año), rutas, `enlacesLegales` de core y redes. El nombre va como texto, no
 * como título: el único h1 de cada página es el suyo.
 */
export async function Pie({ lamina }: Props) {
  const { negocio, contacto, redes } = config;
  const anio = await anioActual();
  const d = contacto.direccion;
  const redesLista = listaRedes(redes);
  const celda = "flex flex-col gap-1.5 border-b border-borde px-4 py-3.5 sm:border-r";
  return (
    <footer className="gutter flex flex-col gap-6 border-t border-texto pt-8 pb-10">
      <div className="ancho grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] border border-texto bg-superficie">
        <div className={celda}>
          <span className="etiqueta text-texto-suave">TALLER</span>
          <span className="font-titulo text-base leading-[1.3] font-semibold text-balance">{negocio.nombre}</span>
        </div>
        <div className={celda}>
          <span className="etiqueta text-texto-suave">TITULAR</span>
          <span className="text-[15px] leading-[1.4]">{negocio.nombreLegal}</span>
          <span className="etiqueta">NIF {negocio.nif}</span>
        </div>
        <div className={celda}>
          <span className="etiqueta text-texto-suave">DIRECCIÓN</span>
          <span className="text-[15px] leading-[1.4]">{direccionLinea(d, { provincia: true })}</span>
        </div>
        <div className="flex flex-col gap-1.5 border-b border-borde px-4 py-3.5">
          <span className="etiqueta text-texto-suave">LÁMINA</span>
          <span className="font-titulo text-[22px] leading-none font-semibold">{lamina}</span>
          <span className="etiqueta">© {anio}</span>
        </div>
      </div>
      <nav aria-label="Páginas">
        <ul className="flex flex-wrap gap-x-6 font-titulo text-sm">
          {[{ href: "/", texto: "Inicio" }, ...indice(config)].map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="inline-flex min-h-11 items-center underline underline-offset-[3px]">
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-wrap gap-x-5 text-sm text-texto-suave">
        {enlacesLegales.map((e) => (
          <Link key={e.href} href={e.href} className="inline-flex min-h-11 items-center underline underline-offset-[3px]">
            {e.texto}
          </Link>
        ))}
        {redesLista.map((r) => (
          <a key={r.href} href={r.href} rel="noopener" className="inline-flex min-h-11 items-center underline underline-offset-[3px]">
            {r.texto}
          </a>
        ))}
      </div>
    </footer>
  );
}
