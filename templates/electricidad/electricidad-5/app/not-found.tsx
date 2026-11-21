import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { IconoFlecha } from "@/components/Iconos";
import { MENSAJE_NO_ENCONTRADA, TEXTO_WHATSAPP_404 } from "@/lib/mensajes";
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

/** 404 de «Casa al día»: banda pleno con h1, frase, pareja y tres tarjetas-enlace. */
export default function NotFound() {
  return (
    <section aria-labelledby="titulo-404" className="sobre-pleno bg-pleno pt-4 pb-[clamp(3rem,2rem+4vw,5.5rem)] text-sobre-primario">
      <div className="contenedor">
        <h1 id="titulo-404" className="m-0 max-w-[14ch] font-titulo text-display leading-[1] font-[750] tracking-[-0.035em] text-balance">
          No encontramos esta página
        </h1>
        <p className="mt-4 mb-0 max-w-[36ch] text-[1.0625rem] lg:text-xl">Puede que el enlace haya cambiado. Te dejamos por dónde seguir, o llámanos.</p>
        <Pareja cta={datosCta(config, MENSAJE_NO_ENCONTRADA)} tono="pleno" textoWhatsapp={TEXTO_WHATSAPP_404} className="mt-6" />
        <nav aria-label="Páginas principales" className="mt-8">
          <ul className="m-0 grid list-none gap-(--hueco-bento) p-0 md:grid-cols-3">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="tarjeta-enlace sobre-claro flex min-h-28 items-center justify-between gap-4 rounded-tarjeta bg-superficie px-6 text-texto no-underline"
                >
                  <span className="font-titulo text-2xl font-bold tracking-[-0.02em]">{e.texto}</span>
                  <span aria-hidden="true" className="grid size-10 flex-none place-items-center rounded-full bg-primario text-sobre-primario">
                    <IconoFlecha className="size-[18px]" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
