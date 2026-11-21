import type { Metadata } from "next";
import { AvisoLegal, metadatosPagina } from "@andrei-leads/core";

import { LecturaLegal } from "@/components/LecturaLegal";
import { datosMarco } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/aviso-legal", titulo: "Aviso legal", indexable: false });

// El <h1> lo pone core: aquí solo van las migas y la hoja.
export default function Page() {
  return (
    <LecturaLegal marco={datosMarco(config)} ruta="/aviso-legal" titulo="Aviso legal">
      <AvisoLegal config={config} />
    </LecturaLegal>
  );
}
