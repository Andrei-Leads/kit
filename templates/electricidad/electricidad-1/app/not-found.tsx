import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LlamadaCampo, WhatsApp } from "@/components/BotonesContacto";
import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { etiquetaCampo, h1Interior } from "@/lib/estilos";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";

// Next añade <meta name="robots" content="noindex"> a toda respuesta 404. Aquí se
// anulan el robots y el canonical «/» que heredaría del layout (con seo.indexar: true,
// el del layout diría «index, follow»).
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

const enlaces = [
  { href: "/", texto: "Volver al inicio" },
  { href: "/servicios", texto: "Ver los servicios" },
  { href: "/contacto", texto: "Contacto" },
];

/** 404 de «Boletín»: cabecera de documento (campo «Error 404» + h1 en mono) y la llamada-campo. */
export default function NotFound() {
  const { telefono, whatsapp } = config.contacto;
  return (
    <>
      <header className="border-b border-regla">
        <div className="contenedor flex flex-col gap-3.5 pt-7 pb-7 md:pt-10 md:pb-11">
          <p className={`m-0 ${etiquetaCampo}`}>Error 404</p>
          <h1 className={h1Interior}>No encontramos esta página</h1>
        </div>
      </header>

      <div className="contenedor grid grid-cols-1 gap-10 pt-7 pb-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-x-14 md:pt-10 md:pb-[88px]">
        <div className="flex flex-col gap-3">
          <LlamadaCampo telefono={telefono} />
          {whatsapp && (
            <WhatsApp numero={whatsapp} mensaje={MENSAJE_NO_ENCONTRADA} variante="foto">
              Escribir por WhatsApp
            </WhatsApp>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <p className="m-0 max-w-[60ch] text-[18px] leading-[1.6] text-tinta-cuerpo text-pretty">
            Puede que el enlace esté mal o que la página ya no exista. Si tienes una avería, llámanos: te
            decimos qué hacer.
          </p>
          <nav aria-label="Páginas principales">
            <ul className="m-0 flex list-none flex-col p-0">
              {enlaces.map((e) => (
                <li key={e.href} className="border-b border-regla last:border-b-0">
                  <Link href={e.href} className={buttonVariants({ variant: "enlaceFlecha" })}>
                    {e.texto}
                    <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
