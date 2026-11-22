import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";
import { Marco } from "@/components/Marco";

/**
 * Legales (encargo §7): cabecera de óxido con las migas y el texto de core sobre el bloque claro
 * de lectura (`.lectura`: #f5efe9 con texto #1b1714) en una columna de 68 caracteres. El <h1> lo
 * pone core dentro del bloque claro: aquí no se añade ningún título.
 */
export function LecturaLegal({ titulo, ruta, children }: { titulo: string; ruta: string; children: ReactNode }) {
  return (
    <Marco>
      <div className="contenedor pt-[clamp(96px,9vw,150px)] pb-[clamp(20px,3vw,40px)]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: ruta, texto: titulo },
          ]}
        />
      </div>
      <section aria-label={titulo} className="lectura py-[clamp(36px,5vw,72px)]">
        <div className="mx-auto max-w-[68ch] px-[clamp(16px,3.2vw,40px)] [&_article]:max-w-none [&_article]:px-0 [&_article]:py-0">{children}</div>
      </section>
    </Marco>
  );
}
