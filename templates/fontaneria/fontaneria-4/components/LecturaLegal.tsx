import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";
import { Marco } from "@/components/Marco";
import type { DatosMarco } from "@/lib/navegacion";

/**
 * Hoja de las páginas legales (encargo §7): papel con la retícula al 15 %, migas en mono, casilla
 * «LEGAL» y el texto de core en una columna de 70 caracteres con los h2 en mono (`.legal-parte` en
 * globals.css). El <h1> lo pone core: aquí no se añade ningún título.
 */
export function LecturaLegal({ marco, ruta, titulo, children }: { marco: DatosMarco; ruta: string; titulo: string; children: ReactNode }) {
  return (
    <Marco {...marco}>
      <div className="reticula-15 px-(--pad) py-(--sec)">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: ruta, texto: titulo },
          ]}
          className="mb-4"
        />
        <div className="mb-6 inline-flex border border-texto bg-superficie px-2.5 py-2 font-titulo text-[0.6875rem] font-bold tracking-[0.06em] text-primario uppercase">
          Legal
        </div>
        <div className="legal-parte">{children}</div>
      </div>
    </Marco>
  );
}
