import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

/**
 * Envoltorio de las legales (encargo §7): columna de 68 caracteres dentro de una tarjeta blanca de
 * radio 24 px sobre --color-alterna, con migas arriba. El texto y el <h1> los pone core (no se toca
 * core): aquí se neutralizan el ancho y los márgenes de su <article> y se ajustan h1 y h2 con
 * selectores de descendiente. Ningún título añadido.
 */
export function LecturaLegal({ migas, children }: { migas: Ancla[]; children: ReactNode }) {
  return (
    <section className="flex-1 bg-alterna px-3 pt-[clamp(24px,4vw,56px)] pb-[clamp(48px,6vw,88px)] lg:px-5">
      <div className="mx-auto flex max-w-[calc(68ch+96px)] flex-col gap-4 rounded-tarjeta bg-fondo p-[clamp(24px,4vw,48px)]">
        <Migas migas={migas} />
        <div className="[&_article]:m-0 [&_article]:max-w-[68ch] [&_article]:p-0 [&_article]:leading-[1.6] [&_h1]:text-pagina [&_h1]:font-extrabold [&_h2]:mt-3 [&_h2]:text-xl [&_h2]:font-extrabold [&_li]:text-pretty [&_p]:text-pretty">
          {children}
        </div>
      </div>
    </section>
  );
}
