import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/** Envoltorio de las legales: migas y columna de 70 caracteres. El `<h1>` y el texto los pone core (títulos en condensada en globals.css). */
export function LecturaLegal({ titulo, ruta, children }: { titulo: string; ruta: string; children: ReactNode }) {
  return (
    <div className="contenedor pt-1">
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
