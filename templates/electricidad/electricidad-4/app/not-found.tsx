import type { Metadata } from "next";
import Link from "next/link";

import { Pareja } from "@/components/Botones";
import { Palanca } from "@/components/Iconos";
import { Marco } from "@/components/Marco";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import config from "@/site.config";

// Next añade noindex a toda respuesta 404. Aquí se anulan el robots y el canonical «/» del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

/**
 * 404 (encargo §7): un cuadro con un solo módulo bajado y la cinta «Página no encontrada»
 * (decorativo), h1, una frase, enlaces a inicio, servicios y contacto, pulsador y WhatsApp.
 */
export default function NotFound() {
  const carril = "absolute -inset-x-px top-1/2 -mt-[9px] h-[18px] bg-carril";
  return (
    <Marco>
      <section className="contenedor flex flex-wrap items-center gap-[clamp(28px,4vw,56px)] py-[clamp(28px,5vw,64px)]">
        <div aria-hidden="true" className="flex-none border-2 border-texto bg-superficie p-1.5">
          <div className="flex border border-carril p-3.5 pl-[15px]">
            <span className="relative flex h-[184px] w-[72px] items-center justify-center border border-borde">
              <span className={carril} />
              <Palanca className="relative h-[72px] w-11" />
            </span>
            <span className="-ml-px flex min-h-[184px] w-40 flex-col border border-borde">
              <span className="m-[3px] flex min-h-20 flex-col gap-0.5 border border-primario bg-etiqueta p-[5px]">
                <span className="text-xs font-semibold">404</span>
                <span className="text-xs leading-[1.2] font-medium tracking-[0.02em] uppercase">Página no encontrada</span>
              </span>
              <span className="relative flex flex-1 items-center justify-center">
                <span className={carril} />
                <Palanca bajada className="relative h-[72px] w-11" />
              </span>
            </span>
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
          <h1 className="text-display leading-[1.02] font-semibold">No encontramos esta página</h1>
          <p className="max-w-[44ch] text-lg text-texto-suave">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {[
              { href: "/", texto: "Inicio" },
              { href: "/servicios", texto: "Servicios" },
              { href: "/contacto", texto: "Contacto" },
            ].map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="enlace inline-flex min-h-11 items-center text-[17px]">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
          <Pareja contacto={config.contacto} mensaje={MENSAJE_NO_ENCONTRADA} textoWhatsapp="Escríbenos por WhatsApp" className="max-w-[640px]" />
        </div>
      </section>
    </Marco>
  );
}
