import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/** Legales (encargo §7): papel, columna de 68 caracteres en Inter Tight, migas. El <h1> y el texto los pone core. */
export function LecturaLegal({ titulo, ruta, children }: { titulo: string; ruta: string; children: ReactNode }) {
  return (
    <div data-tono="claro" className="contenedor pt-[clamp(1.5rem,4vw,4rem)] pb-(--espacio-seccion)">
      <div className="lectura-legal max-w-(--medida-legal)">
        <Migas migas={[{ href: "/", texto: "Inicio" }, { href: ruta, texto: titulo }]} className="mb-8" />
        {children}
      </div>
    </div>
  );
}
