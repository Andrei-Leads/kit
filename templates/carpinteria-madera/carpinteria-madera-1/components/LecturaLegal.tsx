import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/**
 * Envoltorio de las legales (encargo §7): migas en cursiva y columna de 68 caracteres. El texto y
 * el `<h1>` los pone core (en serif, por los estilos de `.lectura-legal`); aquí no hay otro título.
 */
export function LecturaLegal({ ruta, texto, children }: { ruta: string; texto: string; children: ReactNode }) {
  return (
    <div className="marco pt-4 pb-[clamp(64px,8vw,120px)]">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: ruta, texto },
        ]}
        className="mb-[clamp(40px,5vw,80px)]"
      />
      <div className="lectura-legal max-w-[68ch]">{children}</div>
    </div>
  );
}
