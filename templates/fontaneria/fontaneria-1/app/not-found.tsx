import type { Metadata } from "next";

import config from "@/site.config";
import { FilaIndice, ListaIndice } from "@/components/FilaIndice";
import { FilaLlamada } from "@/components/FilaLlamada";
import { ParCta } from "@/components/ParCta";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import { lineaHorario, textoLlamar } from "@/lib/textos";

// Next ya pone noindex en todo 404; así no hereda el robots ni el canonical «/» del layout.
export const metadata: Metadata = { title: "Página no encontrada", robots: null, alternates: { canonical: null } };


/** 404: h1, una frase, tres enlaces pintados como filas del índice, `llamada-fila` y la pareja. */
export default function NotFound() {
  const { contacto } = config;
  return (
    <section className="contenedor pt-[clamp(32px,5vw,72px)] pb-[clamp(48px,7vw,96px)]">
      <p className="rotulo text-primario-luz">Error 404</p>
      <h1 className="condensada mt-2.5 max-w-[16ch] text-[clamp(2.5rem,1.6rem+4vw,6rem)] leading-[0.95]">No encontramos esta página</h1>
      <p className="mt-3.5 mb-7 text-texto-suave">Puede que el enlace esté mal escrito.</p>
      <nav aria-label="Páginas principales" className="max-w-[820px]">
        <ListaIndice>
          <FilaIndice href="/" numero="01" titulo="Inicio" tam="pequena" />
          <FilaIndice href="/servicios" numero="02" titulo="Servicios" tam="pequena" />
          <FilaIndice href="/contacto" numero="03" titulo="Contacto" tam="pequena" />
          <FilaLlamada telefono={contacto.telefono} tam="pequena" />
        </ListaIndice>
      </nav>
      <ParCta
        className="mt-6 max-w-[680px]"
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensaje={MENSAJE_NO_ENCONTRADA}
        textoLlamar={textoLlamar(contacto)}
        textoWhatsapp="Escribir por WhatsApp"
        confianza={lineaHorario(contacto)}
      />
    </section>
  );
}
