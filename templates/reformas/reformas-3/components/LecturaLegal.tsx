import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/** Envoltorio de las legales: migas y columna de 68 caracteres. El `<h1>` y el texto los pone core (títulos en condensada, filetes en globals.css). */
export function LecturaLegal({ titulo, ruta, children }: { titulo: string; ruta: string; children: ReactNode }) {
  return (
    <div className="contenedor pt-4 pb-(--seccion)">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: ruta, texto: titulo },
        ]}
      />
      <div className="lectura-legal">{children}</div>
    </div>
  );
}
