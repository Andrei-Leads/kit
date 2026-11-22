import type { Metadata } from "next";

import config from "@/site.config";
import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { Luz } from "@/components/Luz";
import { ParejaCta } from "@/components/ParejaCta";
import { MENSAJE_NO_ENCONTRADA, RESPUESTA, TEXTO_WA_CORTO } from "@/lib/mensajes";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

/** 404 (encargo §7): claro, `Luz` sin travesaños, la frase, la pareja y enlaces a /, /servicios y /contacto. */
export default function NotFound() {
  const c = config.contacto;
  const cta = { telefono: c.telefono, whatsapp: c.whatsapp, mensaje: MENSAJE_NO_ENCONTRADA };
  return (
    <section data-tono="claro" aria-labelledby="titulo-404" className="bg-fondo">
      <div className="contenedor rejilla items-center gap-y-10 pt-[88px] pb-[var(--seccion)] lg:pt-36">
        <div className="w-full max-w-[280px] lg:col-[1/5]">
          <Luz cristales={1} />
        </div>
        <div className="lg:col-[6/13]">
          <h1 id="titulo-404" className="titulo-h1">
            No encontramos esta página
          </h1>
          <p className="m-0 mt-4 text-cuerpo text-texto-suave">Aquí no hay ventana, pero sí salida.</p>
          <ParejaCta cta={cta} textoWhatsapp={TEXTO_WA_CORTO} tamano={56} apilar confianza={{ texto: RESPUESTA }} className="mt-7 max-w-[620px]" />
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
            <EnlaceFlecha href="/">Inicio</EnlaceFlecha>
            <EnlaceFlecha href="/servicios">Servicios</EnlaceFlecha>
            <EnlaceFlecha href="/contacto">Contacto</EnlaceFlecha>
          </div>
        </div>
      </div>
    </section>
  );
}
