import type { ReactNode } from "react";

import { MigasPagina } from "@/components/secciones/MigasPagina";

/** Envoltorio de las legales: migas y columna de 66 caracteres. El <h1> y el texto los pone core. */
export function LecturaLegal({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <>
      <MigasPagina migas={[{ href: "/", texto: "Inicio" }, { texto: titulo }]} />
      <div className="lectura-legal contenedor pt-[clamp(1.5rem,1rem+2vw,3rem)] pb-[clamp(4rem,3rem+4vw,7.5rem)]">{children}</div>
    </>
  );
}
