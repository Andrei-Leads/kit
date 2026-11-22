import type { Metadata } from "next";
import { PoliticaCookies, metadatosPagina } from "@andrei-leads/core";

import { LecturaLegal } from "@/components/secciones/LecturaLegal";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/cookies", titulo: "Política de cookies", indexable: false });

export default function Page() {
  return (
    <LecturaLegal ruta="/cookies" texto="Política de cookies">
      <PoliticaCookies config={config} />
    </LecturaLegal>
  );
}
