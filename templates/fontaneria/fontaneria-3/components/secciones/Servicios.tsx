import Link from "next/link";
import { precioDesde, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

/** «Desde 60 €»: la palabra «Desde» solo si el precio empieza por «desde»; si no, el texto tal cual. */
export function Precio({ texto, className }: { texto: string; className?: string }) {
  const p = precioDesde(texto);
  return (
    <p className={cn("m-0 font-bold", className)}>
      {p.desde && <span className="mr-1 text-[0.75em] tracking-[0.06em] uppercase">Desde</span>}
      {p.importe}
    </p>
  );
}

/** Foto 4:5 en arco o, sin foto, el arco en primario-suave con la inicial en cursiva. */
function Arco({ servicio, sizes, preload }: { servicio: Servicio; sizes: string; preload?: boolean }) {
  const imagen = servicio.imagenes[0];
  if (imagen) return <Foto imagen={imagen} sizes={sizes} proporcion="4/5" preload={preload} decorativa className="piedra-hover" />;
  return (
    <div aria-hidden="true" className="piedra-hover grid aspect-[4/5] place-items-center rounded-foto bg-primario-suave font-titulo text-[4rem] text-primario-texto italic">
      {servicio.titulo.charAt(0)}
    </div>
  );
}

type Props = {
  servicios: readonly Servicio[];
  titulo?: string;
  /** El título existe para la jerarquía pero no se ve (p. ej. bajo el h1 «Servicios»). */
  tituloOculto?: boolean;
  /** "inicio": 1 → piedra ancha; 8 o más → lista a dos columnas. "tarjetas": siempre tarjetas. */
  variante?: "inicio" | "tarjetas";
  /** Precarga la foto del primer servicio: solo donde es la primera foto visible de la página (/servicios). */
  precargar?: boolean;
};

/**
 * Servicios: tarjetas con foto 4:5 en arco y título en Fraunces. Con 1 servicio,
 * una piedra ancha con su descripción; con 8 o más, lista a dos columnas sin
 * fotos y con flecha.
 */
export function Servicios({ servicios, titulo = "Qué arreglamos", tituloOculto, variante = "inicio", precargar }: Props) {
  if (servicios.length === 0) return null;
  const uno = variante === "inicio" && servicios.length === 1;
  const lista = variante === "inicio" && servicios.length >= 8;
  return (
    <section aria-labelledby="titulo-servicios" className="seccion">
      <div className="contenedor">
        <h2 id="titulo-servicios" className={cn("titulo-seccion mb-[clamp(1.5rem,1rem+2vw,3rem)]", tituloOculto && "sr-only")}>
          {titulo}
        </h2>

        {uno && (
          <Link
            href={`/servicios/${servicios[0].slug}`}
            className="flex flex-wrap items-center gap-[clamp(1.25rem,1rem+2vw,3rem)] rounded-tarjeta bg-superficie p-[clamp(1.25rem,1rem+2vw,3rem)] no-underline"
          >
            <div className="flex-[0_0_min(100%,300px)]">
              <Arco servicio={servicios[0]} sizes="300px" preload={precargar} />
            </div>
            <div className="flex-[1_1_18rem]">
              <h3 className="m-0 font-titulo text-[clamp(1.75rem,1.3rem+2vw,3rem)] leading-[1.05] font-medium">{servicios[0].titulo}</h3>
              <p className="mt-4 mb-0 max-w-[34em]">{servicios[0].descripcion}</p>
              {servicios[0].precioDesde && <Precio texto={servicios[0].precioDesde} className="mt-3" />}
              <p className="mt-5 mb-0 font-bold">Ver el servicio →</p>
            </div>
          </Link>
        )}

        {lista && (
          <ul className="m-0 grid list-none grid-cols-1 gap-x-[clamp(2rem,1rem+4vw,5rem)] p-0 md:grid-cols-2">
            {servicios.map((s) => (
              <li key={s.slug} className="onda-fina">
                <Link href={`/servicios/${s.slug}`} className="flex min-h-11 items-center justify-between gap-4 py-[1.125rem] no-underline">
                  <span>
                    <span className="block font-titulo text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-[1.15]">{s.titulo}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-[1.45] text-texto-suave">{s.descripcion}</span>
                  </span>
                  <span aria-hidden="true" className="text-2xl text-primario-texto">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!uno && !lista && (
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-x-[clamp(0.875rem,0.6rem+1vw,1.5rem)] gap-y-[clamp(1.5rem,1rem+2vw,2.75rem)] p-0 md:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
            {servicios.map((s, i) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className="flex flex-col gap-2.5 no-underline">
                  <Arco servicio={s} sizes="(min-width: 768px) 25vw, 50vw" preload={precargar && i === 0} />
                  <h3 className="m-0 mt-1 font-titulo text-[clamp(1.1875rem,1rem+0.8vw,1.625rem)] leading-[1.12] font-medium text-balance">{s.titulo}</h3>
                  <p className="m-0 text-[0.9375rem] leading-normal text-texto-suave">{s.descripcion}</p>
                  {s.precioDesde && <Precio texto={s.precioDesde} className="text-[0.9375rem]" />}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
