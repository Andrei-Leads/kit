import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/**
 * Envoltorio de las legales (encargo §7): sobre `superficie` (oscuro) con texto claro, en una
 * columna de 68 caracteres y la sans a 17 px. El `h1` lo pone core (en `--font-titulo`, desde
 * `.lectura-legal h1`); aquí solo van las migas.
 */
export function LecturaLegal({ ruta, texto, children }: { ruta: string; texto: string; children: ReactNode }) {
  return (
    <section className="mt-[clamp(24px,4vw,48px)] border-y border-borde bg-superficie px-(--pad) py-[clamp(48px,7vw,96px)]">
      <div className="lectura-legal mx-auto max-w-[68ch] text-[17px] leading-[1.7]">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: ruta, texto },
          ]}
          className="mb-6"
        />
        {children}
      </div>
    </section>
  );
}
