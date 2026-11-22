import type { Metadata } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";
import { ViewTransition } from "react";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";
import "./globals.css";

import config from "@/site.config";
import { ParejaCta } from "@/components/ParejaCta";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { ParejaFlotante } from "@/components/secciones/ParejaFlotante";
import { Pie } from "@/components/secciones/Pie";
import { mensajeInicio, TEXTO_WA_CORTO } from "@/lib/mensajes";
import { menu } from "@/lib/navegacion";
import { confianzaHorario } from "@/lib/textos";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Hanken Grotesk (titulares, cifras y lema, en 300, con cursiva): la única que se precarga.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-hanken",
  display: "swap",
  adjustFontFallback: true,
});
// Inter (texto y botones), variable con eje óptico.
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const mensaje = mensajeInicio(contacto);
  const enlaces = menu(config);
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje };
  return (
    <html lang="es" style={estiloMarca(config)} className={`${hanken.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-50 -translate-y-[200%] bg-superficie px-5 py-3 font-medium text-texto focus-visible:translate-y-0"
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
          pieMenu={<ParejaCta cta={cta} textoWhatsapp={TEXTO_WA_CORTO} tono="oscuro" tamano={56} apilar confianza={confianzaHorario(contacto.horario)} className="max-w-[620px]" />}
        />
        <main id="contenido" tabIndex={-1} className="focus:outline-none">
          <ViewTransition default="pagina">{children}</ViewTransition>
        </main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={enlaces} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
        <ParejaFlotante telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
      </body>
    </html>
  );
}
