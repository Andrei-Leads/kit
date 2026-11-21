import Link from "next/link";
import { direccionLinea, enlacesLegales, formatearHorario, listaRedes, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { paginasMenu } from "@/lib/navegacion";

type Props = Pick<SiteConfig, "negocio" | "contacto" | "redes" | "trabajos" | "galeria">;

/**
 * Pie (encargo §6): filete doble arriba, nombre y nombre legal, NIF, dirección, páginas, horario de
 * `formatearHorario` (y «Urgencias 24 h» con urgencias24h), legales de core y redes, en mono de 0,8125 rem.
 */
export async function Pie({ negocio, contacto, redes, trabajos, galeria }: Props) {
  const anio = await anioActual();
  const redesLista = listaRedes(redes);
  const enlace = "inline-flex min-h-11 items-center underline underline-offset-4";
  return (
    <footer className="border-t-[3px] border-double border-texto bg-fondo px-(--pad) pt-8 pb-7 font-titulo text-[0.8125rem] leading-[1.65]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7">
        <div>
          <div className="font-bold uppercase">{negocio.nombre}</div>
          <div>{negocio.nombreLegal}</div>
          <div>NIF {negocio.nif}</div>
          <div className="text-texto-suave">{direccionLinea(contacto.direccion)}</div>
        </div>
        <nav aria-label="Pie">
          <div className="mb-1 text-[0.6875rem] tracking-[0.06em] text-texto-suave uppercase">Páginas</div>
          <ul>
            {paginasMenu({ trabajos, galeria }).map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={enlace}>
                  {p.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <div className="mb-1 text-[0.6875rem] tracking-[0.06em] text-texto-suave uppercase">Horario</div>
          {formatearHorario(contacto.horario).map((h) => (
            <div key={h.dias} className="mb-1.5">
              <div>{h.dias}</div>
              <div className="text-texto-suave">{h.horas}</div>
            </div>
          ))}
          {contacto.urgencias24h && <div className="font-bold text-primario">Urgencias 24 h</div>}
        </div>
        <div>
          <div className="mb-1 text-[0.6875rem] tracking-[0.06em] text-texto-suave uppercase">Legal</div>
          <ul>
            {enlacesLegales.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={enlace}>
                  {l.texto}
                </Link>
              </li>
            ))}
          </ul>
          {redesLista.length > 0 && (
            <>
              <div className="mt-3 mb-1 text-[0.6875rem] tracking-[0.06em] text-texto-suave uppercase">Redes</div>
              <ul>
                {redesLista.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className={enlace}>
                      {r.texto}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="mt-7 border-t border-borde pt-3 text-xs text-texto-suave">
        © {anio} {negocio.nombreLegal}
      </div>
    </footer>
  );
}
