import type { Metadata } from "next";
import { JetBrains_Mono, Public_Sans } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { mensajeTaller } from "@/lib/mensajes";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// JetBrains Mono es el LCP en móvil (el h1 del hero): variable y precargada (encargo §8, «Fuentes»).
// Public Sans, variable y sin precarga: el texto largo.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
});
const sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = crearMetadatos(config);

/**
 * Cada página pinta su Marco (cabecera, índice lateral y pie), porque la página actual y las secciones
 * del índice se marcan en el servidor. Aquí va lo común: datos estructurados, analítica y la barra
 * móvil [WhatsApp | Llamar] (el <body> reserva su altura por debajo de 1024 px).
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const { contacto } = config;
  return (
    <html lang="es" style={estiloMarca(config)} className={`${mono.variable} ${sans.variable}`}>
      <body className="min-h-dvh pb-[calc(56px+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        {children}
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensajeTaller(contacto)} />
      </body>
    </html>
  );
}
