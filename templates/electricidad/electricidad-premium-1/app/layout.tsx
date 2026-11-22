import { ViewTransition } from "react";
import type { Metadata } from "next";
import { Inter_Tight, Schibsted_Grotesk } from "next/font/google";
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

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Las dos variables, sin lista de pesos; solo se precarga Schibsted (titulares, encargo §8).
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap", preload: false });

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const enlaces = menu(config);
  return (
    <html lang="es" style={estiloMarca(config)} className={`${schibsted.variable} ${interTight.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-[60] -translate-y-[200%] rounded-boton bg-superficie px-5 py-3 font-medium text-texto focus-visible:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Cabecera nombre={negocio.nombre} logo={negocio.logo} cta={cta} email={contacto.email} enlaces={enlaces} />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {/* Transición entre páginas (recurso 6): fundido de --dur-pagina; nada depende de ella. */}
          <ViewTransition>{children}</ViewTransition>
        </main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={enlaces} />
        <ParejaFlotante cta={cta} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={cta.mensaje} />
      </body>
    </html>
  );
}
