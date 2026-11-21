import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { SimbolosCuadro } from "@/components/Iconos";
import { Pie } from "@/components/Pie";
import { textoLlamar } from "@/lib/formato";
import { mensajeCuadro } from "@/lib/mensajes";

// next/font la descarga en el build y la sirve desde la propia web (sin peticiones a Google).
// Jost, variable (una familia para títulos y texto) y precargada: el LCP del inicio es el h1.
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = crearMetadatos(config);

/**
 * Cada página pinta su cabecera (con la página actual marcada en el servidor) y su <main>.
 * Aquí van los símbolos SVG del cuadro, el pie y la barra móvil, comunes a todas.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const { contacto } = config;
  return (
    <html lang="es" style={estiloMarca(config)} className={jost.variable}>
      <body className="min-h-dvh pb-[calc(60px+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <SimbolosCuadro />
        {children}
        <Pie />
        <BarraMovil
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensajeCuadro(contacto)}
          textoLlamar={textoLlamar(contacto)}
        />
      </body>
    </html>
  );
}
