import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { PersianaBajada } from "@/components/secciones/Dibujos";
import { MENSAJE_NO_ENCONTRADA, TEXTO_WA_404 } from "@/lib/mensajes";

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
 * 404 de «Fachada nueva» (encargo §7): la ventana con la persiana bajada, «No encontramos esta
 * página», una frase, los enlaces en pastilla y los dos botones (WhatsApp con el mensaje de 404).
 */
export default function NotFound() {
  const { contacto } = config;
  return (
    <section className="contenedor flex flex-col items-center pt-[clamp(32px,5vw,56px)] pb-[clamp(56px,8vw,96px)] text-center">
      <PersianaBajada className="h-auto w-[88px] text-texto lg:w-[112px]" />
      <h1 className="titulo-display mt-5 max-w-[16ch]">No encontramos esta página</h1>
      <p className="mt-4 text-texto-suave">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
      <nav aria-label="Enlaces útiles" className="mt-5">
        <ul className="flex flex-wrap justify-center gap-2">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="inline-flex min-h-11 items-center rounded-pastilla bg-alterna px-4 font-bold no-underline hover:bg-primario-suave">
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Pareja
        cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: MENSAJE_NO_ENCONTRADA }}
        textoWhatsapp={TEXTO_WA_404}
        className="mt-6 w-full max-w-[600px]"
      />
    </section>
  );
}
