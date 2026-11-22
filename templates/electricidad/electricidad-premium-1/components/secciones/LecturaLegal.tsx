import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/** Legales (encargo §7): tramo claro, columna de 68ch a 18 px, migas. El <h1> y el texto los pone core. */
export function LecturaLegal({ titulo, ruta, children }: { titulo: string; ruta: string; children: ReactNode }) {
  return (
    <div className="tramo-claro seccion">
      <div className="contenedor">
        <div className="lectura-legal max-w-[68ch]">
          <Migas migas={[{ href: "/", texto: "Inicio" }, { href: ruta, texto: titulo }]} className="mb-6" />
          {children}
        </div>
      </div>
    </div>
  );
}
