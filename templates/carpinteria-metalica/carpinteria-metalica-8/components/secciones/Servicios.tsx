import Link from "next/link";
import { etiquetaOrigen, precioDesde, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";

type Props = {
  servicios: readonly Servicio[];
  /** En el inicio, con antetítulo y h2; en /servicios, solo la rejilla. */
  conCabecera?: boolean;
};

/**
 * Servicios en arcos (encargo §6.5): foto con radio del 50 % arriba; sin foto, un arco de
 * `primario-suave` con la inicial en un guijarro de trazo. En móvil, 2 columnas sin descripción.
 * «DESDE» solo si `precioDesde` empieza por «desde».
 */
export function Servicios({ servicios, conCabecera }: Props) {
  // Sin cabecera propia (/servicios), las tarjetas cuelgan del h1 de la página: h2.
  const Titulo = conCabecera ? "h3" : "h2";
  return (
    <section
      id={conCabecera ? "servicios" : undefined}
      aria-labelledby={conCabecera ? "titulo-servicios" : undefined}
      aria-label={conCabecera ? undefined : "Lista de servicios"}
      className={conCabecera ? "contenedor seccion" : "contenedor pb-[clamp(56px,7vw,96px)]"}
    >
      {conCabecera && (
        <div className="mb-[clamp(28px,4vw,48px)] flex flex-col gap-3">
          <p className="antetitulo">Servicios</p>
          <h2 id="titulo-servicios" className="h2">
            Lo que hacemos en el taller
          </h2>
        </div>
      )}
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-[clamp(14px,2vw,24px)] gap-y-[clamp(28px,3vw,40px)] lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {servicios.map((s) => {
          const foto = s.imagenes[0];
          const etiqueta = foto && etiquetaOrigen(foto);
          const precio = s.precioDesde && precioDesde(s.precioDesde);
          return (
            <li key={s.slug}>
              <Link href={`/servicios/${s.slug}`} className="elevable flex h-full flex-col gap-3 text-texto no-underline">
                {foto ? (
                  <Foto imagen={foto} decorativa sinEtiqueta proporcion="4/5" sizes="(min-width: 1024px) 280px, 45vw" className="rounded-arco bg-primario-suave" />
                ) : (
                  <span aria-hidden="true" className="flex aspect-[4/5] items-center justify-center rounded-arco bg-primario-suave">
                    <span className="flex aspect-square w-[38%] items-center justify-center rounded-guijarro-1 border-2 border-primario font-titulo text-[clamp(28px,4vw,44px)] font-medium text-primario-tinta">
                      {s.titulo.charAt(0)}
                    </span>
                  </span>
                )}
                {etiqueta && <span className="pie-foto -mt-1 text-xs leading-[1.2]">{etiqueta}</span>}
                <Titulo className="font-titulo text-lg leading-[1.15] font-medium text-balance lg:text-[22px]">{s.titulo}</Titulo>
                <p className="hidden text-base leading-[1.55] text-texto-suave text-pretty lg:block">{s.descripcion}</p>
                {precio && (
                  <p className="text-[15px]">
                    {precio.desde && <span className="me-1 text-xs font-semibold tracking-[0.08em] text-texto-suave uppercase">Desde</span>}
                    <strong className="font-semibold">{precio.importe}</strong>
                  </p>
                )}
                <span className="mt-auto text-[15px] font-semibold text-primario-tinta">Ver servicio&nbsp;→</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
