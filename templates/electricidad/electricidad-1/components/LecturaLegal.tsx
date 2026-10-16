import type { ReactNode } from "react";

import { Migas } from "@/components/Migas";

type Props = {
  /** Migas de la página (la última es la actual). */
  migas: { href?: string; texto: string }[];
  children: ReactNode;
};

/**
 * Envoltorio de lectura de las páginas legales. Las migas van en una banda con regla inferior
 * y el texto de core (no se puede tocar core) en una columna de 66ch alineada a la izquierda:
 * el <article> de core trae mx-auto, max-w-3xl y px-6, y aquí se neutraliza; los selectores de
 * descendiente ajustan cuerpo (17 px / 1,6), h1 (mono 700) y h2 (mono 20 px con regla superior).
 * El <h1> lo pone core: este componente no añade ningún título.
 */
export function LecturaLegal({ migas, children }: Props) {
  return (
    <>
      <div className="border-b border-regla">
        <div className="contenedor py-1">
          <Migas items={migas} />
        </div>
      </div>
      <div className="contenedor pb-[clamp(32px,5vw,64px)]">
        <div className="text-[17px] [&_article]:mx-0 [&_article]:max-w-[66ch] [&_article]:px-0 [&_article]:py-8 [&_article]:leading-[1.6] md:[&_article]:py-12 [&_h1]:font-mono [&_h1]:text-[30px] [&_h1]:leading-[1.12] [&_h1]:font-bold [&_h1]:tracking-[-0.025em] [&_h1]:text-balance md:[&_h1]:text-[38px] [&_h2]:mt-6 [&_h2]:border-t [&_h2]:border-regla [&_h2]:pt-5 [&_h2]:font-mono [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_li]:text-tinta-cuerpo [&_p]:text-tinta-cuerpo [&_p]:text-pretty">
          {children}
        </div>
      </div>
    </>
  );
}
