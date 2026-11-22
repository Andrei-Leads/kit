import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/** Legales (tablero Legal): migas y columna de 68 caracteres en la sans; títulos de core en serif. */
export function LecturaLegal({ titulo, ruta, children }: { titulo: string; ruta: string; children: ReactNode }) {
  return (
    <div className="contenedor pt-[clamp(8px,2vw,24px)] pb-[clamp(48px,7vw,104px)]">
      <Migas migas={[{ href: "/", texto: "Inicio" }, { href: ruta, texto: titulo }]} className="mb-5" />
      <div className="lectura-legal max-w-[68ch] text-base leading-[1.65]">{children}</div>
    </div>
  );
}
