import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/** Legales: columna de 68 caracteres sobre superficie con radio de 24 px. El <h1> y el texto los pone core. */
export function LecturaLegal({ titulo, ruta, children }: { titulo: string; ruta: string; children: ReactNode }) {
  return (
    <div className="contenedor pt-[clamp(1.25rem,4vw,4rem)] pb-[clamp(4.5rem,3rem+6vw,8rem)]">
      <div className="lectura-legal mx-auto max-w-[68ch] rounded-tarjeta bg-superficie p-[clamp(24px,5vw,56px)]">
        <Migas migas={[{ href: "/", texto: "Inicio" }, { href: ruta, texto: titulo }]} className="mb-3" />
        {children}
      </div>
    </div>
  );
}
