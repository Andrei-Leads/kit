import type { Metadata } from "next";
import Link from "next/link";

import { Pareja } from "@/components/Botones";
import { Filete } from "@/components/TituloSeccion";
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

/** 404 (encargo §7): fondo hueso, h1 en serif gigante, un filete, la frase, enlaces y la pareja. */
export default function NotFound() {
  const { contacto } = config;
  return (
    <section className="marco grid gap-6 py-[clamp(64px,10vw,160px)]">
      <h1 className="titulo-display max-w-[12ch]">
        No encontramos <em>esta página</em>
      </h1>
      <Filete />
      <p className="text-texto-suave">Puede que el enlace esté mal escrito.</p>
      <nav aria-label="Páginas principales">
        <ul className="flex flex-wrap gap-x-7 gap-y-2 text-base">
          {ENLACES.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="enlace inline-flex min-h-11 items-center">
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Pareja cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: MENSAJE_NO_ENCONTRADA }} textoWhatsapp="Escríbenos" />
    </section>
  );
}
