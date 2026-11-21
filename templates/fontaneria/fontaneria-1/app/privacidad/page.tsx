import type { Metadata } from "next";
import { PoliticaPrivacidad, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/base/Migas";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/privacidad", titulo: "Política de privacidad", indexable: false });

// El <h1> lo pone core: aquí solo van las migas y la columna de lectura (estilos en globals.css).
export default function Page() {
  return (
    <section className="lectura-legal contenedor pt-[clamp(24px,4vw,56px)] pb-[clamp(48px,7vw,96px)]">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/privacidad", texto: "Política de privacidad" },
        ]}
      />
      <PoliticaPrivacidad config={config} />
    </section>
  );
}
