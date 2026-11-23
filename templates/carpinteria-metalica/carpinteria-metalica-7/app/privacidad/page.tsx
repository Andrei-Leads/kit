import type { Metadata } from "next";
import { PoliticaPrivacidad, metadatosPagina } from "@andrei-leads/core";

import { LecturaLegal } from "@/components/secciones/LecturaLegal";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/privacidad", titulo: "Política de privacidad", indexable: false });

// El <h1> lo pone core: aquí solo van las migas y el bloque de lectura.
export default function Page() {
  return (
    <LecturaLegal titulo="Política de privacidad" ruta="/privacidad">
      <PoliticaPrivacidad config={config} />
    </LecturaLegal>
  );
}
