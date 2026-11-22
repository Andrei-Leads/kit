import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/** Legales (encargo §7): columna de 68 caracteres sobre `--color-fondo`. El `<h1>` y el texto los pone core; aquí solo las migas. */
export function LecturaLegal({ titulo, ruta, children }: { titulo: string; ruta: string; children: ReactNode }) {
  return (
    <section data-tono="claro" className="contenedor pt-[clamp(24px,4vw,56px)] pb-[clamp(80px,3rem+6vw,160px)]">
      <div className="lectura-legal mx-auto max-w-[68ch]">
        <Migas migas={[{ href: "/", texto: "Inicio" }, { href: ruta, texto: titulo }]} className="mb-[clamp(28px,4vw,56px)]" />
        {children}
      </div>
    </section>
  );
}
