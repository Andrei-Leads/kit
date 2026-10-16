import type { ReactNode } from "react";

import { Migas } from "@/components/Migas";

type Props = {
  /** Migas de la página (la última es la actual). */
  migas: { href?: string; texto: string }[];
  children: ReactNode;
};

/**
 * Envoltorio de lectura de las páginas legales (Specs §2, «Legales»): migas arriba y el texto de core
 * (no se puede tocar core) en una columna de 68ch, 17 px / 1,6, alineada a la izquierda. El <article>
 * de core trae mx-auto, max-w-3xl y px-6, y aquí se neutraliza; los selectores de descendiente ajustan
 * h1 (800), h2 (700) y los enlaces (subrayados en --color-texto: core no les pone color ni subrayado).
 * El texto hereda --color-texto (sin clases de color en core), así que se lee bien sobre noche.
 * El <h1> lo pone core: este componente no añade ningún título.
 */
export function LecturaLegal({ migas, children }: Props) {
  return (
    <div className="contenedor pb-[clamp(32px,5vw,64px)]">
      <div className="pt-2">
        <Migas items={migas} />
      </div>
      <div
        className={
          "text-[17px] " +
          "[&_article]:mx-0 [&_article]:max-w-lectura [&_article]:px-0 [&_article]:py-6 [&_article]:leading-[1.6] lg:[&_article]:py-10 " +
          "[&_h1]:text-[34px] [&_h1]:leading-[1.08] [&_h1]:font-extrabold [&_h1]:tracking-[-0.015em] [&_h1]:text-balance lg:[&_h1]:text-[44px] " +
          "[&_h2]:pt-6 [&_h2]:text-[22px] [&_h2]:leading-[1.2] [&_h2]:font-bold " +
          "[&_a]:text-texto [&_a]:underline [&_a]:underline-offset-4 [&_a]:[overflow-wrap:anywhere] " +
          "[&_p]:text-pretty"
        }
      >
        {children}
      </div>
    </div>
  );
}
