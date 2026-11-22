import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { Destacada, Pareja } from "@/components/Botones";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import { datosCta } from "@/lib/textos";

// Next añade <meta name="robots" content="noindex"> a toda respuesta 404. Aquí se
// anulan el robots y el canonical «/» que heredaría del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/servicios", texto: "Servicios" },
  { href: "/contacto", texto: "Contacto" },
];

/** 404 de «Estancia» (encargo §7): tinta con la espiga, «No encontramos esta *página*», enlaces y la pareja. */
export default function NotFound() {
  const datos = datosCta(config.contacto, MENSAJE_NO_ENCONTRADA);
  return (
    <section data-hero="tipografica" data-tono="oscuro" className="espiga text-fondo">
      <div className="contenedor pt-[calc(var(--alto-cabecera)+clamp(56px,8vw,128px))] pb-[clamp(80px,3rem+6vw,160px)]">
        <p className="etiqueta text-texto-claro">Error 404</p>
        <h1 className="titulo-display mt-4 max-w-[14ch]">
          No encontramos esta <Destacada>página</Destacada>
        </h1>
        <p className="m-0 mt-6 text-entradilla text-texto-claro">Esta estancia todavía no existe.</p>
        <nav aria-label="Páginas principales" className="mt-8">
          <ul className="m-0 flex list-none flex-wrap gap-x-8 p-0">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="enlace">
                  <span>{e.texto}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Pareja datos={datos} fondo="oscuro" textoLlamar="Llamar" className="mt-10 flex-col sm:max-w-[620px] sm:flex-row" />
      </div>
    </section>
  );
}
