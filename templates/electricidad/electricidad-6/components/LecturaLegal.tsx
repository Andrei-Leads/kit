import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

/**
 * Envoltorio de las legales (encargo §7): columna de 68ch sobre --color-superficie, cuerpo a 17 px en
 * --color-texto, migas arriba. El texto y el <h1> los pone core: aquí solo se ajustan su <article>,
 * h1 y h2 con selectores de descendiente. Ningún título añadido.
 */
export function LecturaLegal({ migas, children }: { migas: Ancla[]; children: ReactNode }) {
  return (
    <section className="flex-1 bg-fondo py-6 lg:py-12">
      <div className="contenedor">
        <div className="mx-auto max-w-[calc(68ch+6rem)] bg-superficie px-4 pt-2 pb-10 sm:px-12">
          <Migas migas={migas} />
          <div className="text-[1.0625rem] text-texto [&_a]:underline [&_article]:m-0 [&_article]:max-w-[68ch] [&_article]:p-0 [&_article]:leading-[1.6] [&_h1]:mt-4 [&_h1]:mb-6 [&_h1]:font-[family-name:var(--font-titulo)] [&_h1]:text-h1 [&_h1]:font-extrabold [&_h1]:uppercase [&_h1]:[font-stretch:62%] [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:font-[family-name:var(--font-titulo)] [&_h2]:text-[1.75rem] [&_h2]:leading-none [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:[font-stretch:62%] [&_li]:text-pretty [&_p]:my-3 [&_p]:text-pretty">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
