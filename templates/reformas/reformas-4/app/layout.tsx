import type { Metadata } from "next";
import { Instrument_Sans, Martian_Mono } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { mensajeDiario } from "@/lib/mensajes";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Martian Mono es el LCP (el h1 del hero): variable con `wdth` (se usa a 87) y precargada.
// Instrument Sans, variable y sin precarga: solo el texto largo (encargo §8, «Presupuesto»).
const mono = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-martian",
  display: "swap",
  preload: true,
});
const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = crearMetadatos(config);

/**
 * Cada página pinta su Marco (índice lateral o cabecera móvil, y el pie), porque la página actual y las
 * secciones del índice se marcan en el servidor. Aquí va lo común: datos estructurados, analítica y la
 * barra móvil [WhatsApp][Llamar].
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const { contacto } = config;
  return (
    <html lang="es" style={estiloMarca(config)} className={`${mono.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        {children}
        <BarraMovil variante="dos" primero="whatsapp" telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensajeDiario(contacto)} />
      </body>
    </html>
  );
}
