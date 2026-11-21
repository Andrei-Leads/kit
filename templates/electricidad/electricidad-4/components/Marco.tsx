import type { ReactNode } from "react";

import { Cabecera } from "@/components/Cabecera";
import type { IdPagina } from "@/lib/navegacion";

/**
 * «Saltar al contenido» + cabecera (con la página actual marcada) + `<main>`. El pie y la barra
 * móvil van en el layout.
 */
export function Marco({ actual, children }: { actual?: IdPagina; children: ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-50 bg-superficie px-4 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Saltar al contenido
      </a>
      <Cabecera actual={actual} />
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
    </>
  );
}
