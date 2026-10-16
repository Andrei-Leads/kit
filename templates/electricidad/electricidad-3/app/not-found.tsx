import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LlamadaLuz, WhatsApp } from "@/components/BotonesContacto";
import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { h1Interior, h2, tarjeta } from "@/lib/estilos";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

// Next añade <meta name="robots" content="noindex"> a toda respuesta 404. Aquí se
// anulan el robots y el canonical «/» que heredaría del layout (con seo.indexar: true,
// el del layout diría «index, follow»).
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

const enlaces = [
  { href: "/", texto: "Volver al inicio" },
  { href: "/servicios", texto: "Ver los servicios" },
  { href: "/contacto", texto: "Contacto" },
];

/** 404 de «Sin sorpresas»: h1 en 800 sobre noche, llamada-luz y tarjeta de superficie con los enlaces. */
export default function NotFound() {
  const { telefono, whatsapp } = config.contacto;
  return (
    <>
      <header className="contenedor relative z-10 pt-8 lg:pt-14">
        <p className="m-0 text-[15px] font-semibold text-texto-suave">Error 404</p>
        <h1 className={`${h1Interior} mt-1`}>No encontramos esta página</h1>
        <p className="mt-3 mb-0 max-w-[56ch] text-lg text-texto-suave text-pretty">
          Puede que el enlace esté mal o que la página ya no exista. Si tienes una avería, llama y te decimos qué
          hacer.
        </p>
      </header>

      <div className="contenedor pt-6 pb-11 lg:pt-10 lg:pb-16">
        <div className="grid max-w-[640px] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-x-10">
          <div className="flex flex-col gap-3.5">
            <LlamadaLuz telefono={telefono} className="lg:w-full" />
            {whatsapp && (
              <WhatsApp numero={whatsapp} mensaje={MENSAJE_NO_ENCONTRADA}>
                Escribir por WhatsApp
              </WhatsApp>
            )}
          </div>
          <nav aria-labelledby="titulo-paginas-404" className={cn(tarjeta, "p-5 lg:p-6")}>
            <h2 id="titulo-paginas-404" className={cn(h2, "mb-2 text-xl lg:text-xl")}>
              Sigue por aquí
            </h2>
            <ul className="m-0 flex list-none flex-col p-0">
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className={buttonVariants({ variant: "enlaceFlecha" })}>
                    {e.texto}
                    <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
