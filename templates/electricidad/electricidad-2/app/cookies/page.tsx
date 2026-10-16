import type { Metadata } from "next";
import { PoliticaCookies, metadatosPagina } from "@andrei-leads/core";
import config from "@/site.config";
import { LecturaLegal } from "@/components/LecturaLegal";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/cookies", titulo: "Política de cookies", indexable: false });

// El <h1> lo pone core: aquí solo van las migas y la columna de lectura.
export default function Page() {
  return (
    <LecturaLegal migas={[{ href: "/", texto: "Inicio" }, { texto: "Política de cookies" }]}>
      <PoliticaCookies config={config} />
    </LecturaLegal>
  );
}
