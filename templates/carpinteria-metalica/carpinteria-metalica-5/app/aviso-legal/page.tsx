import type { Metadata } from "next";
import { AvisoLegal, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { LecturaLegal } from "@/components/secciones/LecturaLegal";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/aviso-legal", titulo: "Aviso legal", indexable: false });

export default function Page() {
  return (
    <LecturaLegal ruta="/aviso-legal" texto="Aviso legal">
      <AvisoLegal config={config} />
    </LecturaLegal>
  );
}
