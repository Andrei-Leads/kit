import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Big_Shoulders, Instrument_Sans } from "next/font/google";
import { Analitica, contraste, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { navegacion } from "@/lib/piezas";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Big Shoulders variable con el eje óptico: a 72 es la antigua «Big Shoulders Display» del diseño
// (titulares y números); Instrument Sans para el texto (encargo §9).
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  display: "swap",
  // next/font no tiene métricas de Big Shoulders para ajustar el respaldo (avisaba en cada build):
  // respaldo condensado del sistema sin ajuste. Los titulares no empujan contenido crítico.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = crearMetadatos(config);

/** Fondo blanco roto (--color-fondo): si el primario del cliente no llega a 3:1 sobre él, los números pasan a negro subrayado (entrega §08). */
const FONDO = "#fafafa";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes, marca } = config;
  const enlaces = navegacion(config);
  const mensaje = mensajeInicio(contacto);
  const estilo: CSSProperties = { ...estiloMarca(config) };
  if (marca.colorPrimario && contraste(marca.colorPrimario, FONDO) < 3) {
    Object.assign(estilo, { "--color-numero": "var(--color-texto)", "--linea-numero": "underline" });
  }
  return (
    <html lang="es" style={estilo} className={`${bigShoulders.variable} ${instrumentSans.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[calc(56px+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="ft fixed top-2 left-2 z-50 -translate-y-[200%] bg-negro px-4 py-3 text-lg text-sobre-negro focus-visible:translate-y-0"
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
