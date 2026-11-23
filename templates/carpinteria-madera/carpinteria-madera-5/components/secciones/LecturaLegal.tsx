import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/**
 * Envoltorio de las legales (encargo §7): migas y columna de lectura de 68 caracteres. El texto
 * y el `<h1>` los pone core; aquí no hay un segundo título.
 */
export function LecturaLegal({ ruta, texto, children }: { ruta: string; texto: string; children: ReactNode }) {
  return (
    <div className="contenedor pt-10 pb-[clamp(56px,8vw,104px)]">
      <div className="lectura-legal mx-auto max-w-[68ch]">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: ruta, texto },
        ]}
        className="mb-3"
      />
        {children}
      </div>
    </div>
  );
}
