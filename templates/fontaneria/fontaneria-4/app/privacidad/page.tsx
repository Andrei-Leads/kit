import type { Metadata } from "next";
import { PoliticaPrivacidad, metadatosPagina } from "@andrei-leads/core";

import { LecturaLegal } from "@/components/LecturaLegal";
import { datosMarco } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/privacidad", titulo: "Política de privacidad", indexable: false });

// El <h1> lo pone core: aquí solo van las migas y la hoja.
export default function Page() {
  return (
    <LecturaLegal marco={datosMarco(config)} ruta="/privacidad" titulo="Política de privacidad">
      <PoliticaPrivacidad config={config} />
    </LecturaLegal>
  );
}
