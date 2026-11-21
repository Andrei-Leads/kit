import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { TelefonoGigante } from "@/components/Botones";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";

// Next añade <meta name="robots" content="noindex"> a toda respuesta 404. Aquí se anulan el robots y
// el canonical «/» que heredaría del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

const ENLACE = "chip text-texto";

/** 404 de «Apagón» (encargo §7): cinta arriba, h1 en condensada, una frase, enlaces y el telefono-gigante. */
export default function NotFound() {
  const { contacto } = config;
  return (
    <section className="flex-1 bg-fondo [background-image:var(--haz)]">
      <div aria-hidden="true" className="cinta" />
      <div className="contenedor flex flex-col gap-6 py-10 lg:py-16">
        <h1 className="titulo-h1 m-0">No encontramos esta página</h1>
        <p className="m-0 max-w-[50ch] text-lg text-texto-suave">Puede que el enlace esté mal escrito o que la página ya no exista. Si tienes una avería, llámanos.</p>
        <nav aria-label="Páginas principales">
          <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-2 p-0 ps-1.5">
            {[
              { href: "/", texto: "Inicio" },
              { href: "/servicios", texto: "Servicios" },
              { href: "/contacto", texto: "Contacto" },
            ].map((e) => (
              <li key={e.href}>
                <Link href={e.href} className={ENLACE}>
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <TelefonoGigante contacto={contacto} mensaje={MENSAJE_NO_ENCONTRADA} textoWhatsapp="Escríbenos por WhatsApp" className="mt-2" />
      </div>
    </section>
  );
}
