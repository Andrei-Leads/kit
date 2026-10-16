import type { Metadata } from "next";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { ChevronRight, MessageCircle } from "lucide-react";

import { ContenidoLlamada } from "@/components/ContenidoLlamada";
import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { etiqueta13, seccion } from "@/lib/estilos";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";

// Next añade <meta name="robots" content="noindex"> a toda respuesta 404. Aquí se
// anulan el robots y el canonical «/» que heredaría del layout (con seo.indexar: true,
// el del layout diría «index, follow»).
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/servicios", texto: "Averías que reparamos" },
  { href: "/contacto", texto: "Contacto" },
];

/** 404 de «Reparaciones»: filas-enlace como las de averías y la llamada grande. */
export default function NotFound() {
  const { telefono, whatsapp } = config.contacto;
  return (
    <section className={`contenedor flex flex-col gap-6 ${seccion}`}>
      <div className="flex flex-col gap-2">
        <p className={`m-0 text-acero ${etiqueta13}`}>Error 404</p>
        <h1 className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.015em] text-balance md:text-[56px]">
          No encontramos esta página
        </h1>
        <p className="m-0 max-w-[60ch] text-tinta-suave">
          Puede que el enlace esté mal o que la página ya no exista. Si tienes una avería, llámanos y te lo
          solucionamos.
        </p>
      </div>
      <div className="grid items-start gap-7 md:grid-cols-2 md:gap-14">
        <div className="flex flex-col gap-2.5">
          <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaHero" })}>
            <ContenidoLlamada telefono={telefono} tamanoNumero="31" />
          </BotonLlamada>
          {whatsapp && (
            <BotonWhatsApp
              numero={whatsapp}
              mensaje={MENSAJE_NO_ENCONTRADA}
              className={buttonVariants({ variant: "whatsappSecundario" })}
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              <span>Escribir por WhatsApp</span>
            </BotonWhatsApp>
          )}
        </div>
        <nav aria-label="Páginas principales">
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className={buttonVariants({ variant: "filaAveria" })}>
                  <span className="flex-1 text-lg font-bold">{e.texto}</span>
                  <ChevronRight aria-hidden="true" className="size-5 flex-none" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
