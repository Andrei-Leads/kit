import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";
import { Marco } from "@/components/Marco";

/**
 * Hoja de las páginas legales (encargo §7): migas y el texto de core en una columna de 66ch en la
 * sans de texto a 18 px (`.hoja-legal` en globals.css). El <h1> lo pone core: aquí no hay título.
 */
export function LecturaLegal({ ruta, titulo, children }: { ruta: string; titulo: string; children: ReactNode }) {
  return (
    <Marco>
      <div className="contenedor pt-4 pb-16 lg:pb-24">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: ruta, texto: titulo },
          ]}
          className="mb-4"
        />
        <div className="hoja-legal border-t border-texto pt-8">{children}</div>
      </div>
    </Marco>
  );
}
