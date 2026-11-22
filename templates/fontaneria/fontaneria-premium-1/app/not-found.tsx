import type { Metadata } from "next";

import config from "@/site.config";
import { EnlaceFlecha, Pareja } from "@/components/Botones";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import { datosCta } from "@/lib/textos";

// Next ya pone noindex en todo 404; así no hereda el robots ni el canonical «/» del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

/** 404 (encargo §7): tinta con la textura, h1, una frase, tres enlaces y la pareja-cta. */
export default function NotFound() {
  const cta = datosCta(config.contacto, MENSAJE_NO_ENCONTRADA);
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-404" className="sobre-tinta textura bg-tinta pt-16 pb-20 text-white lg:pt-32 lg:pb-32">
      <div className="contenedor flex flex-col gap-6">
        <p className="etiqueta">Error 404</p>
        <h1 id="titulo-404" className="titulo text-[44px] leading-[1.05] lg:text-display">
          No encontramos <em>esta página</em>
        </h1>
        <p className="m-0 max-w-[560px] text-lg text-sobre-tinta-suave">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
        <nav aria-label="Páginas principales" className="mt-2 flex flex-wrap gap-x-10 gap-y-4">
          <EnlaceFlecha href="/">Ir al inicio</EnlaceFlecha>
          <EnlaceFlecha href="/servicios">Ver los servicios</EnlaceFlecha>
          <EnlaceFlecha href="/contacto">Contacto</EnlaceFlecha>
        </nav>
        <Pareja cta={cta} tamano="cta" tono="oscuro" className="mt-6" />
      </div>
    </section>
  );
}
