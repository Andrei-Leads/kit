import type { Metadata } from "next";
import { Figtree, Sora } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Pie } from "@/components/Pie";
import { mensajeInicio } from "@/lib/mensajes";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Las dos son variables en wght: sin lista de pesos. El LCP del inicio en móvil es el h1 (Sora),
// que next/font precarga con display: swap y métricas de respaldo ajustadas.
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = crearMetadatos(config);

/**
 * Cada página pinta su cápsula (con la página actual marcada en el servidor) y su <main>. Aquí van
 * el pie y la barra móvil, comunes a todas. Por debajo de 1024 px, el <body> reserva la altura de
 * la barra (56 px + 2 × 8 px + 1 px de borde + área segura).
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const { contacto } = config;
  return (
    <html lang="es" style={estiloMarca(config)} className={`${sora.variable} ${figtree.variable}`}>
      <body className="min-h-dvh pb-[calc(73px+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        {children}
        <Pie />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensajeInicio(contacto)} />
      </body>
    </html>
  );
}
