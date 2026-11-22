import type { ReactNode } from "react";

import { MarcaPagina } from "@/components/MarcaPagina";
import { Migas } from "@/components/base/Migas";

/** Envoltorio de las legales (encargo §7): migas y columna de 68 caracteres. El `h1` lo pone core. */
export function LecturaLegal({ ruta, texto, children }: { ruta: string; texto: string; children: ReactNode }) {
  return (
    <div data-tono="claro" className="bg-fondo pt-5 pb-[var(--espacio-seccion)] lg:pt-14">
      <MarcaPagina inicioClaro />
      <div className="contenedor">
        <Migas
          migas={[
            { href: "/", texto: "Inicio" },
            { href: ruta, texto },
          ]}
          className="mb-10 lg:mb-14"
        />
        <div className="lectura-legal max-w-[68ch]">{children}</div>
      </div>
    </div>
  );
}
