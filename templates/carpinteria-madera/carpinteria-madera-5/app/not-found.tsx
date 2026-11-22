import type { Metadata } from "next";
import Link from "next/link";

import { Pareja } from "@/components/Botones";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import config from "@/site.config";

// Next añade noindex a toda respuesta 404. Aquí se anulan el robots y el canonical «/» del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

const ENLACES = [
  { href: "/", texto: "Inicio" },
  { href: "/servicios", texto: "Servicios" },
  { href: "/contacto", texto: "Contacto" },
];

/** 404 (encargo §7): el arco vacío dibujado, h1, la frase, enlaces y la pareja de botones. */
export default function NotFound() {
  const { contacto } = config;
  return (
    <section className="contenedor pt-10 pb-[clamp(56px,8vw,104px)]">
      <div className="flex flex-wrap items-center gap-x-[clamp(40px,6vw,96px)] gap-y-8">
        <div aria-hidden="true" className="aspect-[4/5] w-[min(62%,300px)] flex-[0_1_300px] rounded-foto border border-arco" />
        <div className="min-w-0 flex-[1_1_340px]">
          <h1 className="titulo-display">No encontramos esta página</h1>
          <p className="mt-3.5 text-texto-suave">Esta página no tiene restauración posible.</p>
          <nav aria-label="Páginas principales" className="mt-3">
            <ul className="flex flex-wrap gap-x-5 gap-y-1 font-semibold">
              {ENLACES.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="enlace flex min-h-12 items-center">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Pareja
            cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: MENSAJE_NO_ENCONTRADA }}
            numeroEnLlamar
            className="mt-4 max-w-[620px]"
          />
        </div>
      </div>
    </section>
  );
}
