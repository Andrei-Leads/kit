import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/**
 * Envoltorio de las legales (encargo §7): columna de 68 caracteres sobre `superficie`. El `h1` lo
 * pone core (estilado desde `.lectura-legal h1`); aquí solo van las migas.
 */
export function LecturaLegal({ ruta, texto, children }: { ruta: string; texto: string; children: ReactNode }) {
  return (
    <div className="px-[clamp(12px,4vw,56px)] pt-[clamp(28px,4vw,48px)] pb-[clamp(56px,7vw,96px)]">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: ruta, texto },
        ]}
        className="mx-auto mb-6 max-w-[calc(68ch+96px)] px-2"
      />
      <div className="lectura-legal mx-auto max-w-[calc(68ch+96px)] rounded-tarjeta bg-superficie p-[clamp(24px,5vw,48px)]">{children}</div>
    </div>
  );
}
