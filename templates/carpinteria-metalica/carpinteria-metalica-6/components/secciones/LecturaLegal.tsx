import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/** Legales (encargo §7): migas y columna de 70 caracteres sobre blanco; el `<h1>` y el texto los pone core. */
export function LecturaLegal({ titulo, ruta, children }: { titulo: string; ruta: string; children: ReactNode }) {
  return (
    <div className="bg-superficie">
      <div className="contenedor pt-2 pb-[clamp(48px,7vw,96px)]">
        <Migas migas={[{ href: "/", texto: "Inicio" }, { href: ruta, texto: titulo }]} className="mb-3" />
        <div className="lectura-legal mx-auto max-w-[70ch] text-base leading-[1.65]">{children}</div>
      </div>
    </div>
  );
}
