import type { Metadata } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Pie } from "@/components/Pie";
import { textoLlamar } from "@/lib/formato";
import { mensajeEdificio } from "@/lib/mensajes";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Newsreader es la del h1 (LCP en móvil): variable y precargada, sin el eje óptico `opsz`
// (≈74 KB menos de fuente precargada; Ysst, 22/11/2026).
// Public Sans, variable y sin precarga (encargo §8, «Presupuesto»).
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
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
 * Cada página pinta su Marco (franja + barra de menú con la página actual marcada en el servidor).
 * Aquí van el pie y la barra móvil, comunes a todas. El <body> deja sitio a la barra en móvil.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const { contacto } = config;
  return (
    <html lang="es" style={estiloMarca(config)} className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-dvh pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        {children}
        <Pie config={config} />
        <BarraMovil
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensajeEdificio(contacto)}
          textoLlamar={textoLlamar(contacto)}
        />
      </body>
    </html>
  );
}
