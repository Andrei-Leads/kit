import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { ArcoTesela } from "@/components/secciones/ArcoTesela";
import { datosCta } from "@/lib/cta";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";

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

/** 404 de «Tu casa»: un arco vacío tintado, «Esta habitación no existe», los enlaces y la pareja. */
export default function NotFound() {
  return (
    <section
      aria-labelledby="titulo-404"
      className="contenedor flex flex-col items-center gap-[18px] pt-[clamp(2.5rem,5vw,5rem)] pb-[clamp(4.5rem,3rem+6vw,8rem)] text-center"
    >
      <ArcoTesela className="mb-3 w-[200px] [--radius-foto:20px]" />
      <h1 id="titulo-404" className="remate m-0 text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] leading-[1.08] text-balance">
        No encontramos esta página
      </h1>
      <p className="m-0 text-xl text-texto-suave">Esta habitación no existe.</p>
      <nav aria-label="Enlaces útiles" className="mb-4">
        <ul className="m-0 flex list-none flex-wrap justify-center gap-x-6 gap-y-1 p-0">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="inline-flex min-h-11 items-center font-semibold underline">
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Pareja cta={datosCta(config.contacto, MENSAJE_NO_ENCONTRADA)} textoWhatsapp="Escríbenos por WhatsApp" />
    </section>
  );
}
