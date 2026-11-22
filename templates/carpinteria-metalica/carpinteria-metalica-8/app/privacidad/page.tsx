import type { Metadata } from "next";
import { PoliticaPrivacidad, metadatosPagina } from "@andrei-leads/core";

import { LecturaLegal } from "@/components/secciones/LecturaLegal";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/privacidad", titulo: "Política de privacidad", indexable: false });

export default function Page() {
  return (
    <LecturaLegal ruta="/privacidad" texto="Política de privacidad">
      <PoliticaPrivacidad config={config} />
    </LecturaLegal>
  );
}
