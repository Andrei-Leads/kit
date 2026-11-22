import type { Metadata } from "next";
import { metadatosPagina, PoliticaPrivacidad } from "@andrei-leads/core";

import { LecturaLegal } from "@/components/secciones/LecturaLegal";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/privacidad", titulo: "Política de privacidad", indexable: false });

// El <h1> lo pone core: aquí solo va la columna de lectura con las migas.
export default function Page() {
  return (
    <LecturaLegal ruta="/privacidad" texto="Privacidad">
      <PoliticaPrivacidad config={config} />
    </LecturaLegal>
  );
}
