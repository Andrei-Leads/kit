import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
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

/** 404 (entrega §07): «N.º 404» enorme en acento, `h1`, una frase, enlaces grandes y la pareja. */
export default function NotFound() {
  const { contacto } = config;
  return (
    <section className="contenedor flex flex-col gap-[18px] pt-[clamp(2rem,1.5rem+3vw,5rem)]">
      <span aria-hidden="true" className="ft numero text-[clamp(5rem,2.5rem+10vw,14rem)] leading-[0.8] decoration-8 underline-offset-[10px]">
        N.º 404
      </span>
      <h1 className="ft m-0 text-[clamp(2.25rem,1.4rem+3.6vw,5rem)] leading-[0.92] text-balance">No encontramos esta página</h1>
      <p className="m-0 text-lg">Esta pieza no está en el catálogo.</p>
      <nav aria-label="Enlaces" className="flex flex-wrap gap-x-6 border-y-2 border-borde">
        {enlaces.map((e) => (
          <Link key={e.href} href={e.href} className="ft flex min-h-12 items-center text-xl text-texto underline-offset-4 [@media(hover:hover)]:hover:underline">
            {e.texto}
          </Link>
        ))}
      </nav>
      <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={MENSAJE_NO_ENCONTRADA} textoWhatsapp="Escribir por WhatsApp" />
    </section>
  );
}
