import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";
import { Marco } from "@/components/Marco";

type Props = { ruta: string; texto: string; children: ReactNode };

/**
 * Legales (encargo §7): columna de 68 caracteres sobre papel, sin retícula detrás del texto (por
 * legibilidad); la retícula solo asoma en los márgenes. El <h1> lo pone core: aquí solo van las migas.
 */
export function LecturaLegal({ ruta, texto, children }: Props) {
  return (
    <Marco>
      <div className="reticula px-[clamp(12px,5vw,64px)]">
        <div className="lectura-legal min-h-[70vh] max-w-[calc(68ch+64px)] border-x border-texto bg-fondo px-[clamp(8px,3vw,32px)] pt-4 pb-12">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: ruta, texto },
            ]}
            className="mb-4"
          />
          {children}
        </div>
      </div>
    </Marco>
  );
}
