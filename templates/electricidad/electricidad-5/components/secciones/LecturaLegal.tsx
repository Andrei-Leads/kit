import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/** Envoltorio de las legales: migas y columna de 68ch dentro de una tarjeta superficie. El <h1> y el texto los pone core. */
export function LecturaLegal({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="contenedor pt-4 pb-[clamp(3.5rem,2.5rem+4vw,6.5rem)]">
      <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "#", texto: titulo }]} />
      <div className="lectura-legal mt-3 rounded-tarjeta bg-superficie p-6 md:p-12">{children}</div>
    </div>
  );
}
