import type { ReactNode } from "react";

import { Migas } from "@/components/Migas";

type Props = {
  /** Migas de la página (la última es la actual). */
  migas: { href?: string; texto: string }[];
  children: ReactNode;
};

/**
 * Envoltorio de lectura de las páginas legales (Specs §2: «Layout del template, ancho ≈ 68ch, cuerpo
 * en Source Sans 3»). Las migas van arriba y el texto de core (no se puede tocar core) en una columna
 * de 68ch alineada a la izquierda: el <article> de core trae mx-auto, max-w-3xl y px-6, y aquí se
 * neutraliza; los selectores de descendiente ajustan cuerpo (17 px / 1,6), h1 (serif 600) y h2 (serif
 * 600, 24 px). El <h1> lo pone core: este componente no añade ningún título.
 */
export function LecturaLegal({ migas, children }: Props) {
  return (
    <>
      <div className="contenedor pt-1">
        <Migas items={migas} />
      </div>
      <div className="contenedor pb-16 lg:pb-24">
        <div className="text-[17px] text-tinta [&_article]:mx-0 [&_article]:max-w-(--container-lectura) [&_article]:px-0 [&_article]:pt-4 [&_article]:pb-0 [&_article]:leading-[1.6] [&_h1]:font-serif [&_h1]:text-[38px] [&_h1]:leading-[1.06] [&_h1]:font-semibold [&_h1]:tracking-[-0.01em] [&_h1]:text-balance lg:[&_h1]:text-[52px] [&_h2]:mt-3 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:leading-[1.2] [&_h2]:font-semibold [&_li]:text-tinta-suave [&_p]:text-tinta-suave [&_p]:text-pretty">
          {children}
        </div>
      </div>
    </>
  );
}
