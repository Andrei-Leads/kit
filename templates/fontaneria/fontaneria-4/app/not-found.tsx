import type { Metadata } from "next";
import Link from "next/link";

import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { CabeceraParte } from "@/components/secciones/CabeceraParte";
import { lineaConfianza } from "@/lib/formato";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import { datosMarco } from "@/lib/navegacion";
import config from "@/site.config";

// Next añade noindex a toda respuesta 404. Aquí se anulan el robots y el canonical «/» del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

const enlaces = [
  { n: "01", href: "/", texto: "Inicio" },
  { n: "02", href: "/servicios", texto: "Servicios" },
  { n: "03", href: "/contacto", texto: "Contacto" },
];

/** 404 (encargo §7): parte con sello «Dirección no encontrada», h1, frase, los dos botones y tres enlaces como casillas. */
export default function NotFound() {
  return (
    <Marco {...datosMarco(config)}>
      <CabeceraParte
        tipo="Parte de trabajo"
        titulo="No encontramos esta página"
        sello="Dirección no encontrada"
        entradilla="La dirección no existe o ha cambiado. Desde aquí puedes volver o abrir un aviso."
      >
        <Pareja contacto={config.contacto} mensaje={MENSAJE_NO_ENCONTRADA} textoWhatsapp="Escribir por WhatsApp" confianza={lineaConfianza(config)} className="mt-5" />
        <nav aria-label="Páginas principales" className="casillas mt-6">
          {enlaces.map((e) => (
            <Link key={e.href} href={e.href} className="casilla flex min-h-14 flex-[1_1_140px] flex-col justify-center px-3 py-2 no-underline">
              <span className="rotulo-sm">{e.n}</span>
              <span className="font-titulo text-sm font-semibold">{e.texto} →</span>
            </Link>
          ))}
        </nav>
      </CabeceraParte>
    </Marco>
  );
}
