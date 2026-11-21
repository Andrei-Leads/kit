import type { Metadata } from "next";
import { Martian_Mono, Public_Sans } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Pie } from "@/components/secciones/Pie";
import { textoLlamar } from "@/lib/formato";
import { mensajeAviso } from "@/lib/mensajes";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Martian Mono es el LCP (el teléfono del hero): variable con el eje `wdth` (75 en el teléfono) y
// precargada. Public Sans, variable y sin precarga (encargo §8, «Presupuesto»).
const mono = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-martian",
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
 * Cada página pinta su propio Marco (cabecera móvil e índice lateral), porque la página actual y los
 * campos del parte se marcan en el servidor. Aquí van el pie y la barra móvil, comunes a todas.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes, trabajos, galeria } = config;
  return (
    <html lang="es" style={estiloMarca(config)} className={`${mono.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        {children}
        <Pie negocio={negocio} contacto={contacto} redes={redes} trabajos={trabajos} galeria={galeria} />
        <BarraMovil
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensajeAviso(contacto)}
          textoLlamar={textoLlamar(contacto)}
        />
      </body>
    </html>
  );
}
