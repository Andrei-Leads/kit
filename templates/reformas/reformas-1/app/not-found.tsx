import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
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

/**
 * 404 de «Antes y después» (tablero 404): «No encontramos esta *página*», «Esta página está por
 * reformar», los enlaces y los dos botones. A la derecha, una foto estática del «antes» de la
 * primera obra que lo tenga (sin deslizador); sin ella, nada.
 */
export default function NotFound() {
  const { contacto, trabajos } = config;
  const antes = trabajos.find((t) => t.antes)?.antes;
  return (
    <section className="contenedor grid items-center gap-[clamp(28px,5vw,88px)] pt-[clamp(32px,5vw,72px)] pb-[clamp(48px,7vw,104px)] lg:grid-cols-[7fr_5fr]">
      <div>
        <h1 className="titulo-display">
          No encontramos esta <em className="text-primario-texto">página</em>
        </h1>
        <p className="mt-[clamp(20px,3vw,32px)] font-titulo text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.2] italic">
          Esta página está por reformar.
        </p>
        <nav aria-label="Enlaces útiles" className="mt-7">
          <ul className="flex flex-wrap gap-x-6">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="enlace inline-flex min-h-11 items-center">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Pareja
          cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: MENSAJE_NO_ENCONTRADA }}
          numeroEnLlamar
          className="mt-4 max-w-[520px]"
        />
      </div>
      {antes && (
        <div className="max-w-[560px]">
          <Foto imagen={antes} sizes="(min-width: 1024px) 480px, 100vw" />
        </div>
      )}
    </section>
  );
}
