import type { Metadata } from "next";
import Link from "next/link";

import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import config from "@/site.config";

// Next añade noindex a toda respuesta 404. Aquí se anulan el robots y el canonical «/» del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

/** 404 (encargo §7): fondo óxido con «404» en contorno gigante (decorativo), h1, frase, enlaces y pareja. */
export default function NotFound() {
  return (
    <Marco>
      <section className="overflow-hidden pt-[clamp(96px,9vw,150px)] pb-[clamp(48px,6vw,96px)]">
        <div className="contenedor">
          <p
            aria-hidden="true"
            className="font-titulo text-[clamp(10rem,4rem+30vw,26rem)] leading-[0.8] font-extrabold text-transparent [-webkit-text-stroke:2px_var(--color-sobre-primario)]"
          >
            404
          </p>
          <h1 className="mt-[18px] font-titulo text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] leading-[0.95] font-extrabold text-balance uppercase">
            No encontramos esta página
          </h1>
          <p className="mt-2.5 max-w-[44ch] text-pretty">Puede que la dirección esté mal escrita o que la página ya no exista. Desde aquí puedes seguir:</p>
          <ul className="mt-3.5 flex flex-wrap gap-x-6 gap-y-1">
            {[
              { href: "/", texto: "Inicio" },
              { href: "/servicios", texto: "Servicios" },
              { href: "/contacto", texto: "Contacto" },
            ].map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="enlace text-xl">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
          <Pareja contacto={config.contacto} mensaje={MENSAJE_NO_ENCONTRADA} textoWhatsapp="Escríbenos por WhatsApp" sinIcono className="mt-5" />
        </div>
      </section>
    </Marco>
  );
}
