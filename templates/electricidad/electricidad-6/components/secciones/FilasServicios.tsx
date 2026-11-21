import Link from "next/link";
import { precioDesde, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Flecha } from "@/components/Iconos";

type Props = {
  servicios: readonly Servicio[];
  nivel?: "h2" | "h3";
};

function Precio({ texto }: { texto: string }) {
  const p = precioDesde(texto);
  return (
    <span className="whitespace-nowrap">
      {p.desde && <span className="me-1 text-xs font-bold tracking-wider text-texto-suave uppercase">desde</span>}
      {p.desde && " "}
      <span className="condensada text-xl leading-none">{p.importe}</span>
    </span>
  );
}

/**
 * Lista compacta de filas de 64 px (encargo §6.4), no tarjetas: miniatura 1:1 en paralelogramo (sin
 * foto: rombo primario con el número en sobre-primario), título condensado a 22 px, descripción en 1
 * línea (2 en móvil), «desde» a la derecha y «›». La fila entera enlaza al servicio.
 */
export function FilasServicios({ servicios, nivel = "h3" }: Props) {
  const Titulo = nivel;
  return (
    <ul className="m-0 list-none border-t border-borde/40 p-0">
      {servicios.map((s, i) => {
        const foto = s.imagenes[0];
        return (
          <li key={s.slug} className="fila-aparece border-b border-borde/40">
            <Link href={`/servicios/${s.slug}`} className="fila foco group flex min-h-16 items-center gap-4 py-2.5 text-texto no-underline hover:bg-superficie/60">
              {foto ? (
                <Foto imagen={foto} decorativa miniatura proporcion="1/1" sizes="64px" className="w-16 flex-none" />
              ) : (
                <span aria-hidden="true" className="flex size-16 flex-none items-center justify-center">
                  <span className="flex size-11 rotate-45 items-center justify-center bg-primario">
                    <span className="condensada -rotate-45 text-xl text-sobre-primario">{i + 1}</span>
                  </span>
                </span>
              )}
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <Titulo className="condensada m-0 text-[1.375rem] leading-[1.05]">{s.titulo}</Titulo>
                <span className="line-clamp-2 text-[0.9375rem] text-texto-suave sm:line-clamp-1">{s.descripcion}</span>
                {s.precioDesde && (
                  <span className="sm:hidden">
                    <Precio texto={s.precioDesde} />
                  </span>
                )}
              </span>
              {s.precioDesde && (
                <span className="hidden sm:block">
                  <Precio texto={s.precioDesde} />
                </span>
              )}
              <Flecha className="flecha size-5 flex-none" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
