import type { ReactNode } from "react";
import { mediaVisible } from "@andrei-leads/core";

import { Estrellas } from "@/components/Estrellas";
import { Verificado } from "@/components/Iconos";
import type { TarjetaConAncho } from "@/lib/bento";
import { elevar, h2Seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

const MOVIL = { 1: "col-span-1", 2: "col-span-2" } as const;
const ESCRITORIO = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4" } as const;

type Props = {
  tarjetas: TarjetaConAncho[];
  /** Pareja de cierre (solo en el inicio). */
  children?: ReactNode;
};

/**
 * Bento de confianza (encargo §5 y §6.3): rejilla regular de 2 columnas en móvil y 4 en escritorio,
 * tarjetas blancas sobre --color-alterna. Cada tarjeta existe solo con su dato y la última se ensancha
 * para cerrar la fila (`lib/bento.ts`). Sin ningún dato, no existe.
 */
export function BentoConfianza({ tarjetas, children }: Props) {
  if (tarjetas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-bento" className="contenedor flex flex-col gap-[clamp(24px,3vw,40px)] bg-alterna py-[clamp(48px,6vw,96px)]">
      <h2 id="titulo-bento" className={h2Seccion}>
        Por qué fiarte de nosotros
      </h2>
      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 lg:grid-cols-4">
        {tarjetas.map((t, i) => (
          <li
            key={i}
            data-aparecer="escala"
            className={cn(
              "flex min-h-37 min-w-0 flex-col justify-between gap-3.5 rounded-tarjeta bg-fondo p-[clamp(18px,2.4vw,28px)]",
              elevar,
              MOVIL[t.movil],
              ESCRITORIO[t.escritorio],
            )}
          >
            <Contenido t={t} />
          </li>
        ))}
      </ul>
      {children}
    </section>
  );
}

function Contenido({ t }: { t: TarjetaConAncho }) {
  switch (t.tipo) {
    case "valoracion":
      return (
        <>
          <Estrellas valor={t.media} className="text-[1.375rem] tracking-[2px]" />
          <p className="m-0 flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5">
            <span className="text-[clamp(3.25rem,2.6rem+3vw,5rem)] leading-[.9] font-extrabold tracking-[-0.045em] tabular-nums">
              {mediaVisible(t.media)}
            </span>
            <span className="leading-[1.3] font-semibold">{t.texto}</span>
          </p>
        </>
      );
    case "cifra":
      return (
        <>
          <span className="text-[.9375rem] font-medium text-texto-suave">{t.antes}</span>
          <p className="m-0 flex flex-col gap-0.5">
            <span className="text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-none font-extrabold tracking-[-0.03em] tabular-nums">{t.cifra}</span>
            {t.sub && <span className="text-[.9375rem] text-texto-suave">{t.sub}</span>}
          </p>
        </>
      );
    case "texto":
      return (
        <>
          <span className="text-[.9375rem] font-medium text-texto-suave">{t.antes}</span>
          <p className="m-0 flex flex-col gap-1">
            <span className="text-lg leading-tight font-bold text-balance">{t.texto}</span>
            {t.sub && <span className="text-[.9375rem] text-texto-suave tabular-nums">{t.sub}</span>}
          </p>
        </>
      );
    case "garantia":
      return (
        <>
          <Verificado tamano={32} />
          <span className="text-[1.0625rem] leading-[1.3] font-bold text-balance">{t.texto}</span>
        </>
      );
  }
}
