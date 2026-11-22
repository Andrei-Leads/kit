import type { Metadata } from "next";
import { AvisoLegal, metadatosPagina } from "@andrei-leads/core";

import { LecturaLegal } from "@/components/secciones/LecturaLegal";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/aviso-legal", titulo: "Aviso legal", indexable: false });

// El <h1> lo pone core: aquí solo va la columna de lectura con las migas.
export default function Page() {
  return (
    <LecturaLegal ruta="/aviso-legal" texto="Aviso legal">
      <AvisoLegal config={config} />
    </LecturaLegal>
  );
}
