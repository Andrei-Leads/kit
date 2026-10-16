import type { Metadata } from "next";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { h1Interior } from "@/lib/estilos";
import { telefonoVisible } from "@/lib/formato";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import { textos } from "@/lib/textos";
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
  { href: "/servicios", texto: textos.verTodosServicios },
  { href: "/contacto", texto: textos.contacto },
];

/** 404 de «Del barrio»: h1 en serif sobre piedra, entrada de 20 px, llamada-acento grande y enlaces con subrayado primario. */
export default function NotFound() {
  const { telefono, whatsapp } = config.contacto;
  return (
    <>
      <header className="contenedor pt-8 pb-8 lg:pt-14 lg:pb-12">
        <p className="m-0 text-lg text-tinta-suave">Error 404</p>
        <h1 className={`${h1Interior} mt-1`}>No encontramos esta página</h1>
        <p className="mt-4 mb-0 max-w-[56ch] text-xl leading-normal text-pretty">
          Puede que el enlace esté mal o que la página ya no exista. Si nos cuentas qué buscabas, te ayudamos.
        </p>
      </header>
      <div className="contenedor flex flex-col gap-8 pb-16 lg:flex-row lg:items-start lg:gap-16 lg:pb-24">
        <div className="flex w-full max-w-[520px] flex-col gap-2.5">
          <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaAcentoGrande" })}>
            <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-6 flex-none" />
            <span className="text-lg font-semibold">{textos.llamanos}</span>
            <span className="text-[26px] font-bold whitespace-nowrap">{telefonoVisible(telefono)}</span>
          </BotonLlamada>
          {whatsapp && (
            <BotonWhatsApp
              numero={whatsapp}
              mensaje={MENSAJE_NO_ENCONTRADA}
              className={cn(buttonVariants({ variant: "whatsappLinea" }), "min-h-14 text-lg")}
            >
              <MessageCircle aria-hidden="true" strokeWidth={1.75} strokeLinejoin="round" className="size-5 flex-none" />
              <span>{textos.escribenosWhatsapp}</span>
            </BotonWhatsApp>
          )}
        </div>
        <nav aria-label="Páginas principales">
          <ul className="m-0 flex list-none flex-col p-0">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className={buttonVariants({ variant: "enlace" })}>
                  {e.texto}
                  <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
