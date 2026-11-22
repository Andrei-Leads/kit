import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";
import { Marco } from "@/components/Marco";

/**
 * Legales (encargo §7): fondo claro y columna de 70 caracteres, con la cápsula y la barra de
 * siempre. El <h1> lo pone core: aquí solo van las migas.
 */
export function LecturaLegal({ ruta, texto, children }: { ruta: string; texto: string; children: ReactNode }) {
  return (
    <Marco>
      <section className="px-[clamp(20px,4vw,40px)] pt-[clamp(100px,3rem+5vw,120px)] pb-[clamp(56px,8vw,104px)]">
        <div className="lectura-legal mx-auto flex max-w-[70ch] flex-col gap-4">
          <Migas
            migas={[
              { href: "/", texto: "Inicio" },
              { href: ruta, texto },
            ]}
            className="text-texto-suave"
          />
          {children}
        </div>
      </section>
    </Marco>
  );
}
