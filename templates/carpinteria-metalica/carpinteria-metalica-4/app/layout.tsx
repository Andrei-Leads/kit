import type { Metadata } from "next";
import { Instrument_Sans, Martian_Mono } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { mensajeInicio } from "@/lib/mensajes";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Variables, sin lista de pesos. El LCP del inicio es el h1 en Martian Mono: es la única que se
// precarga (encargo §8); con `wdth` para estrecharla a 87 % en el h1 móvil. adjustFontFallback
// (por defecto) evita el salto al cambiar de la fuente de respaldo.
const martian = Martian_Mono({ subsets: ["latin"], axes: ["wdth"], variable: "--font-martian", display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap", preload: false });

export const metadata: Metadata = crearMetadatos(config);

/**
 * Cada página pinta su `Marco` (cabecera e índice lateral con la página actual marcada en el
 * servidor, y el pie con su lámina). Aquí va la barra móvil, común a todas. En móvil, el <body>
 * reserva su altura (52 px + 2 × 8 px + 2 px de filete + área segura).
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const { contacto } = config;
  return (
    <html lang="es" style={estiloMarca(config)} className={`${martian.variable} ${instrument.variable}`}>
      <body className="min-h-dvh pb-[calc(70px+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        {children}
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensajeInicio(contacto)} />
      </body>
    </html>
  );
}
