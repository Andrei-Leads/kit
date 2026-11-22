import type { Metadata } from "next";
import { PoliticaPrivacidad, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { LecturaLegal } from "@/components/secciones/LecturaLegal";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/privacidad", titulo: "Política de privacidad", indexable: false });

export default function Page() {
  return (
    <LecturaLegal ruta="/privacidad" texto="Política de privacidad">
      <PoliticaPrivacidad config={config} />
    </LecturaLegal>
  );
}
