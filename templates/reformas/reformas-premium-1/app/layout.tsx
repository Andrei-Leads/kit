import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";
import "./globals.css";

import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { ParejaFlotante } from "@/components/secciones/ParejaFlotante";
import { Pie } from "@/components/secciones/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { menu } from "@/lib/navegacion";
import { datosCta } from "@/lib/textos";

// next/font descarga las fuentes en el build y las sirve desde la propia web (sin peticiones a Google).
// Instrument Sans variable (wght y wdth) para todo el texto.
const sans = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-instrument-sans",
  display: "swap",
});

// Instrument Serif no existe en variable: única excepción a la regla de fuentes variables
// (encargo §9). Solo la cursiva 400, para la palabra destacada, números, citas e iniciales.
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const datos = datosCta(contacto, mensajeInicio(contacto));
  const enlaces = menu(config);
  return (
    <html lang="es" style={estiloMarca(config)} className={`${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="cta cta--48 cta-secundario-oscuro fixed top-2 left-2 z-[60] -translate-y-[200%] focus-visible:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Cabecera nombre={negocio.nombre} logo={negocio.logo} enlaces={enlaces} datos={datos} />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {/* Fundido corto entre páginas (recurso 6); la foto de la obra lleva su propio nombre. */}
          <ViewTransition>{children}</ViewTransition>
        </main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={enlaces} />
        <ParejaFlotante datos={datos} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={datos.mensaje} />
      </body>
    </html>
  );
}
