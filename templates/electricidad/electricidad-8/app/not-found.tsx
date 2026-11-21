import type { Metadata } from "next";
import Link from "next/link";

import { ParCta } from "@/components/Botones";
import { Flecha } from "@/components/Iconos";
import { Marco } from "@/components/Marco";
import { H1 } from "@/components/Rotulo";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import { cn } from "@/lib/utils";
import config from "@/site.config";

// Next añade noindex a toda respuesta 404. Aquí se anulan el robots y el canonical «/» del layout.
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

/** 404 (encargo §7): una lámina vacía con su marco y una cota sin texto (decorativas), h1, frase, enlaces y la pareja de botones. */
export default function NotFound() {
  return (
    <Marco>
      <div className="contenedor grid items-start gap-10 py-12 md:grid-cols-12 lg:py-20">
        <div aria-hidden="true" className="hidden md:col-span-4 md:block">
          <div className="border border-linea-plano bg-fondo p-3">
            <div className="aspect-[4/5] border border-linea-plano bg-superficie" />
          </div>
          <span data-dibujar="" className="cota mt-4 w-full text-texto" />
        </div>
        <div className="md:col-span-8 md:col-start-6">
          <h1 className={cn(H1, "max-w-[14ch]")}>No encontramos esta página</h1>
          <p className="mt-4 max-w-[48ch] text-texto-suave">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
          <nav aria-label="Páginas principales" className="mt-6">
            <ul className="border-t border-texto">
              {enlaces.map((e) => (
                <li key={e.href} className="border-b border-linea-plano">
                  <Link
                    href={e.href}
                    className="flex min-h-12 items-center gap-2 font-titulo text-[1.3125rem] hover:underline focus-visible:outline-2 focus-visible:outline-foco"
                  >
                    {e.texto} <Flecha />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ParCta contacto={config.contacto} mensaje={MENSAJE_NO_ENCONTRADA} textoWhatsapp="Escríbenos por WhatsApp" className="mt-8" />
        </div>
      </div>
    </Marco>
  );
}
