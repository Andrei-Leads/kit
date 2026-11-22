import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { navegacion } from "@/lib/obras";

// next/font la descarga en el build y la sirve desde la propia web (sin peticiones a Google).
// Archivo variable: una sola familia con los ejes wght y wdth (títulos a 62 %, texto a 100 %).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const enlaces = navegacion(config);
  const mensaje = mensajeInicio(contacto);
  return (
    <html lang="es" style={estiloMarca(config)} className={archivo.variable}>
      <body className="flex min-h-dvh flex-col pb-[calc(56px+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="etiqueta fixed top-2 left-2 z-50 -translate-y-[200%] bg-negro px-4 py-3 text-sm text-sobre-negro focus-visible:translate-y-0"
        >
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
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={enlaces} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
      </body>
    </html>
  );
}
