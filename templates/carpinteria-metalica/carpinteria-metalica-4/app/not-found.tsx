import type { Metadata } from "next";
import Link from "next/link";

import { Pareja } from "@/components/Botones";
import { CotaDato } from "@/components/Cota";
import { Marco } from "@/components/Marco";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import config from "@/site.config";

// Next añade noindex a toda respuesta 404. Aquí se anulan el robots y el canonical «/» del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

/** 404 (encargo §7): una lámina en blanco con la retícula y una cota vacía «Sin medida», el h1, la frase, los enlaces y la pareja. */
export default function NotFound() {
  return (
    <Marco lamina="—">
      <section className="reticula gutter flex min-h-[70vh] flex-1 flex-col justify-center gap-5 py-12">
        <CotaDato texto="Sin medida" className="max-w-[420px]" />
        <h1 className="h1-plano max-w-[16ch]">No encontramos esta página</h1>
        <p className="max-w-[52ch] self-start bg-fondo text-[17px] text-texto-suave">Esta lámina está en blanco. Vuelve al índice o escríbenos y te ayudamos.</p>
        <nav aria-label="Enlaces">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { href: "/", texto: "Inicio" },
              { href: "/servicios", texto: "Servicios" },
              { href: "/contacto", texto: "Contacto" },
            ].map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="enlace">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Pareja contacto={config.contacto} mensaje={MENSAJE_NO_ENCONTRADA} textoWhatsapp="Escribir por WhatsApp" className="max-w-[720px] [&_.boton-trazo]:bg-fondo" />
      </section>
    </Marco>
  );
}
