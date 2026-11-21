import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

/**
 * Columna de lectura de las legales. El <h1> y el texto los pone core: aquí solo van las migas y el
 * estilo por selectores descendientes (h1 en Outfit; h2 con una barra primario de 24×4 a la izquierda).
 * Se neutraliza el ancho, el margen y el relleno del <article> de core.
 */
export function LecturaLegal({ migas, children }: { migas: readonly Ancla[]; children: ReactNode }) {
  return (
    <div className="contenedor pt-8 pb-16 lg:pt-12 lg:pb-24">
      <Migas migas={migas} className="[&_a]:underline" />
      <div
        className={[
          "mt-4 max-w-(--container-lectura)",
          "[&_article]:mx-0 [&_article]:max-w-none [&_article]:px-0 [&_article]:py-0",
          "[&_h1]:font-titulo [&_h1]:text-h1 [&_h1]:leading-[1.02] [&_h1]:font-bold [&_h1]:tracking-[-0.03em]",
          "[&_h2]:relative [&_h2]:pl-9 [&_h2]:font-titulo [&_h2]:text-2xl [&_h2]:font-bold",
          "[&_h2]:before:absolute [&_h2]:before:top-[calc(0.5em+1rem)] [&_h2]:before:left-0 [&_h2]:before:h-1 [&_h2]:before:w-6 [&_h2]:before:bg-primario [&_h2]:before:content-['']",
          "[&_a]:text-primario [&_a]:underline",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
