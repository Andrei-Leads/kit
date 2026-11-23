import type { Metadata } from "next";
import { Figtree, Jost } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { menu } from "@/lib/navegacion";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Jost (títulos, cifras y botones; con cursiva para «en {ciudad}» del h1) y Figtree (texto).
const jost = Jost({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-jost", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = crearMetadatos(config);

/**
 * Cabecera (sticky, transparente → sólida), pie y barra móvil, comunes a todas las páginas. En
 * móvil, el `<body>` reserva la altura de la bandeja (52 px + 2 × 10 px + área segura).
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const mensaje = mensajeInicio(contacto);
  const enlaces = menu(config);
  return (
    <html lang="es" style={estiloMarca(config)} className={`${jost.variable} ${figtree.variable}`}>
      <body className="min-h-dvh pb-[calc(84px+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a href="#contenido" className="fixed top-3 left-3 z-50 -translate-y-[200%] rounded-boton bg-superficie px-5 py-3 font-semibold focus-visible:translate-y-0">
          Saltar al contenido
        </a>
        <Cabecera
          nombre={negocio.nombre}
          logo={negocio.logo}
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensaje}
          enlaces={enlaces}
        />
        <main id="contenido" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={enlaces} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
      </body>
    </html>
  );
}
