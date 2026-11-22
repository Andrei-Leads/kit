import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";
import "./globals.css";

import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { menu } from "@/lib/navegacion";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google),
// con ajuste de métricas del respaldo (sin CLS). Newsreader variable con eje óptico y cursiva
// (títulos); Inter variable (texto).
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const mensaje = mensajeInicio(contacto);
  const enlaces = menu(config);
  return (
    <html lang="es" style={estiloMarca(config)} className={`${newsreader.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-50 -translate-y-[200%] bg-superficie px-5 py-3 font-semibold text-texto focus-visible:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Cabecera nombre={negocio.nombre} logo={negocio.logo} telefono={contacto.telefono} enlaces={enlaces} />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={enlaces} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
      </body>
    </html>
  );
}
