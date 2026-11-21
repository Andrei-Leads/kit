import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";
import { Marco } from "@/components/Marco";

/**
 * Legales (encargo §7): columna de lectura de 68 caracteres sobre superficie blanca, con migas.
 * El <h1> lo pone core: aquí no se añade ningún título.
 */
export function LecturaLegal({ ruta, titulo, children }: { ruta: string; titulo: string; children: ReactNode }) {
  return (
    <Marco>
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: ruta, texto: titulo },
        ]}
        className="contenedor pt-2"
      />
      <div className="contenedor pt-3 pb-[clamp(40px,6vw,72px)]">
        <div className="lectura-legal max-w-[calc(68ch+64px)] border border-carril bg-superficie p-[clamp(20px,4vw,32px)]">{children}</div>
      </div>
    </Marco>
  );
}
