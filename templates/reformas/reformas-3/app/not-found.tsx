import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { RejillaObras, numerar } from "@/components/secciones/RejillaObras";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";

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

/** 404: «No encontramos esta página», «Esta obra no existe. Estas sí:» con las 4 primeras obras, la pareja y los enlaces grandes. */
export default function NotFound() {
  const { contacto, trabajos } = config;
  const hay = trabajos.length > 0;
  return (
    <>
      <CabeceraPagina titulo="No encontramos esta página" entrada={<p>{hay ? "Esta obra no existe. Estas sí:" : "Esta obra no existe."}</p>}>
        <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={MENSAJE_NO_ENCONTRADA} />
      </CabeceraPagina>
      {hay && <RejillaObras obras={numerar(trabajos).slice(0, 4)} servicios={config.servicios} className="pt-7" />}
      <nav aria-label="Páginas principales" className="contenedor pt-(--seccion) pb-(--seccion)">
        <ul className="m-0 max-w-[720px] list-none border-t-2 border-borde p-0">
          {enlaces.map((e) => (
            <li key={e.href} className="border-b-2 border-borde">
              <Link href={e.href} className="condensada flex items-baseline justify-between py-3 text-[32px] leading-[0.95] text-texto no-underline hover:text-primario">
                {e.texto}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
