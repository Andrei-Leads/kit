import type { Metadata } from "next";
import { PoliticaPrivacidad, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { LecturaLegal } from "@/components/secciones/LecturaLegal";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/privacidad", titulo: "Política de privacidad", indexable: false });

// El <h1> lo pone core: aquí solo van las migas y la tarjeta de lectura.
export default function Page() {
  return (
    <LecturaLegal titulo="Política de privacidad">
      <PoliticaPrivacidad config={config} />
    </LecturaLegal>
  );
}
