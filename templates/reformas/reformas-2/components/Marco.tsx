import type { ReactNode } from "react";

import { Capsula } from "@/components/Capsula";
import type { IdPagina } from "@/lib/navegacion";

/**
 * «Saltar al contenido» + cápsula (con la página actual marcada en el servidor) + `<main>`. El pie
 * y la barra móvil van en el layout.
 */
export function Marco({ actual, children }: { actual?: IdPagina; children: ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-full bg-superficie px-5 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <Capsula actual={actual} />
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
    </>
  );
}
