import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { Pareja } from "@/components/Pareja";
import { MENSAJE_NO_ENCONTRADA, TEXTO_WA_404 } from "@/lib/mensajes";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

/** 404 (encargo §7): un filete de lado a lado (un perfil vacío), el `h1` en serif, una frase, enlaces y la pareja. */
export default function NotFound() {
  const c = config.contacto;
  const cta = { telefono: c.telefono, whatsapp: c.whatsapp, mensaje: MENSAJE_NO_ENCONTRADA };
  return (
    <section aria-labelledby="titulo-404" className="pt-[clamp(56px,9vw,128px)]">
      <div aria-hidden="true" className="h-px bg-anodizado" />
      <div className="contenedor pt-[clamp(40px,6vw,80px)]">
        <h1 id="titulo-404" className="titulo-display max-w-[14ch]">
          No encontramos esta <em>página</em>
        </h1>
        <p className="m-0 mt-6 max-w-[48ch] text-texto-suave">Puede que el enlace esté mal escrito o que la página ya no exista. Desde aquí puedes seguir:</p>
        <nav aria-label="Enlaces" className="mt-4 flex flex-wrap gap-x-7">
          <Link href="/" className="enlace text-base">
            Inicio
          </Link>
          <Link href="/servicios" className="enlace text-base">
            Soluciones
          </Link>
          <Link href="/contacto" className="enlace text-base">
            Contacto
          </Link>
        </nav>
        <Pareja cta={cta} textoWhatsapp={TEXTO_WA_404} alto={56} className="mt-8 max-w-[600px]" />
      </div>
    </section>
  );
}
