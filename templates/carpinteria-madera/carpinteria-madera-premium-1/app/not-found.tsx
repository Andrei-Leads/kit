import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { ParejaCta } from "@/components/Botones";
import { Veta } from "@/components/Veta";
import { MENSAJE_NO_ENCONTRADA, TEXTO_WA_ESCRIBIR } from "@/lib/mensajes";
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

/** 404 de «Oficio» (encargo §7): tinta con veta, «No encontramos esta página», los enlaces y la pareja. */
export default function NotFound() {
  return (
    <section
      data-tono="oscuro"
      data-hero="tinta"
      aria-labelledby="titulo-404"
      className="sobre-oscuro relative overflow-hidden bg-tinta pt-[calc(var(--alto-cabecera)+clamp(3rem,8vw,7rem))] pb-(--espacio-seccion) text-fondo"
    >
      <Veta />
      <div className="contenedor relative">
        <h1 id="titulo-404" className="titulo max-w-[14ch] text-display">
          No encontramos esta página
        </h1>
        <p className="mt-6 text-h3 text-papel-suave">A esta pieza le falta una tabla.</p>
        <nav aria-label="Enlaces útiles" className="mt-8">
          <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-1 p-0">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="enlace-flecha">
                  <span>{e.texto}</span>
                  <span aria-hidden="true" className="flecha">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ParejaCta cta={datosCta(config.contacto, MENSAJE_NO_ENCONTRADA)} tono="oscuro" textoWhatsapp={TEXTO_WA_ESCRIBIR} className="mt-10" />
      </div>
    </section>
  );
}
