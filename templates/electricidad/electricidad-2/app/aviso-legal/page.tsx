import type { Metadata } from "next";
import { AvisoLegal, metadatosPagina } from "@andrei-leads/core";
import config from "@/site.config";
import { LecturaLegal } from "@/components/LecturaLegal";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/aviso-legal", titulo: "Aviso legal", indexable: false });

// El <h1> lo pone core: aquí solo van las migas y la columna de lectura.
export default function Page() {
  return (
    <LecturaLegal migas={[{ href: "/", texto: "Inicio" }, { texto: "Aviso legal" }]}>
      <AvisoLegal config={config} />
    </LecturaLegal>
  );
}
