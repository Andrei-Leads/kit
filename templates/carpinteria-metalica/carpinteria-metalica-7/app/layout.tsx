import type { Metadata } from "next";
import { Archivo, Big_Shoulders } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Pie } from "@/components/Pie";
import { mensajeInicio } from "@/lib/mensajes";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// «Big Shoulders Display» ya no está en Google Fonts como familia aparte: es «Big Shoulders» con
// el eje opsz (a tamaño grande, el corte Display). Las dos son variables: sin lista de pesos.
const bigShoulders = Big_Shoulders({ subsets: ["latin"], axes: ["opsz"], variable: "--font-big-shoulders", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = crearMetadatos(config);

/**
 * Cada página pinta su cápsula (con la página actual marcada en el servidor) y su <main>. Aquí van
 * el pie y la barra móvil, comunes a todas. En móvil, el <body> reserva la altura de la barra
 * (48 px + 2 × 8 px + área segura).
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const { contacto } = config;
  return (
    <html lang="es" style={estiloMarca(config)} className={`${bigShoulders.variable} ${archivo.variable}`}>
      <body className="min-h-dvh pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        {children}
        <Pie />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensajeInicio(contacto)} />
      </body>
    </html>
  );
}
