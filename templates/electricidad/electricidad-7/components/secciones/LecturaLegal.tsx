import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

/**
 * Legales: columna de 68ch sobre --color-superficie (radio 24 px), sin burbujas. El <h1> y el
 * texto los pone core; aquí solo van las migas y el estilo por selectores descendientes.
 */
export function LecturaLegal({ migas, children }: { migas: readonly Ancla[]; children: ReactNode }) {
  return (
    <div className="contenedor pt-5 pb-[clamp(48px,2.5rem+3vw,96px)]">
      <Migas migas={migas} className="mx-auto max-w-(--container-lectura)" />
      <div
        className={[
          "mx-auto mt-2 max-w-(--container-lectura) rounded-tarjeta bg-superficie p-[clamp(24px,4vw,56px)] leading-relaxed",
          "[&_article]:mx-0 [&_article]:max-w-none [&_article]:p-0",
          "[&_h1]:mt-0 [&_h1]:mb-4 [&_h1]:text-[clamp(2rem,1.7rem+1.4vw,2.75rem)] [&_h1]:leading-[1.1] [&_h1]:font-black",
          "[&_h2]:mt-7 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-black",
          "[&_p]:my-3 [&_li]:my-1 [&_a]:underline",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
