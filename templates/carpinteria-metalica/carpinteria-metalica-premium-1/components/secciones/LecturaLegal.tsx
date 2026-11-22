import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";

/**
 * Envoltorio de las legales (encargo §7): claro, columna de 68 caracteres, Inter a 17 px.
 * El `h1` lo pone core (estilado en `--font-titulo` 300 desde `.lectura-legal h1`); aquí
 * solo van las migas. Los CTAs, en cabecera, barra y pareja flotante.
 */
export function LecturaLegal({ ruta, texto, children }: { ruta: string; texto: string; children: ReactNode }) {
  return (
    <section data-tono="claro" className="bg-fondo">
      <div className="lectura-legal mx-auto box-content max-w-[68ch] px-[var(--pad)] pt-[88px] pb-[var(--seccion)] lg:pt-36">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: ruta, texto },
          ]}
          className="mb-7"
        />
        {children}
      </div>
    </section>
  );
}
