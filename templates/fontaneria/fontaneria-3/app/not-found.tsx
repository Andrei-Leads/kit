import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { Pareja } from "@/components/Pareja";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import { datosCta } from "@/lib/textos";

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

/** 404 de «La furgoneta»: arena, piedra primario-suave detrás, h1, frase, tres enlaces en Fraunces y la pareja. */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-[clamp(3rem,2rem+5vw,8rem)] pb-[clamp(4rem,3rem+4vw,7.5rem)]">
      <div
        aria-hidden="true"
        className="absolute top-0 -right-[6%] z-0 aspect-square w-[min(70%,640px)] rounded-[42%_58%_47%_53%/55%_45%_55%_45%] bg-primario-suave"
      />
      <div className="contenedor relative z-[1]">
        <h1 className="m-0 max-w-[12ch] font-titulo text-display font-medium tracking-[-0.025em] text-balance">No encontramos esta página</h1>
        <p className="mt-5 mb-0 max-w-[30em] text-entrada">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
        <nav aria-label="Páginas principales">
          <ul className="m-0 mt-[clamp(1.5rem,1rem+2vw,3rem)] flex list-none flex-col gap-1 p-0">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="inline-flex min-h-11 items-center font-titulo text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] leading-[1.15] no-underline hover:underline">
                  {e.texto} →
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Pareja
          cta={datosCta(config, MENSAJE_NO_ENCONTRADA)}
          textoWhatsapp="Escribir por WhatsApp"
          linea={null}
          className="mt-[clamp(2rem,1.5rem+2vw,3rem)] max-w-[600px]"
        />
      </div>
    </section>
  );
}
