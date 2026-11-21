import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { Pareja } from "@/components/secciones/Pareja";
import { lineaHorario } from "@/lib/formato";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import { pildoraEnlace } from "@/lib/estilos";

// Next añade <meta name="robots" content="noindex"> a toda respuesta 404. Aquí se anulan el robots y
// el canonical «/» que heredaría del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

/** 404 de «Precio cerrado» (encargo §7): tarjeta centrada de radio 32 px sobre --color-alterna. */
export default function NotFound() {
  const { contacto } = config;
  return (
    <section className="flex flex-1 justify-center bg-alterna px-4 py-[clamp(40px,6vw,96px)]">
      <div className="flex w-full max-w-160 flex-col items-center gap-4.5 rounded-bloque bg-fondo p-[clamp(28px,5vw,56px)] text-center shadow-tarjeta">
        <h1 className="m-0 text-[clamp(2rem,1.6rem+2vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">No encontramos esta página</h1>
        <p className="m-0 text-texto-suave">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
        <nav aria-label="Páginas principales">
          <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">
            <li>
              <Link href="/" className={pildoraEnlace}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/servicios" className={pildoraEnlace}>
                Servicios
              </Link>
            </li>
            <li>
              <Link href="/contacto" className={pildoraEnlace}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
        <Pareja
          contacto={contacto}
          mensaje={MENSAJE_NO_ENCONTRADA}
          linea={lineaHorario(contacto)}
          className="w-full pt-2 text-left"
        />
      </div>
    </section>
  );
}
