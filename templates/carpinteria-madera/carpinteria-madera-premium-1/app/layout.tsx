import type { Metadata } from "next";
import { Inter_Tight, Newsreader } from "next/font/google";
import { ViewTransition } from "react";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";
import "./globals.css";

import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { CabeceraInteligente } from "@/components/CabeceraInteligente";
import { Cabecera } from "@/components/secciones/Cabecera";
import { ParejaFlotante } from "@/components/secciones/ParejaFlotante";
import { Pie } from "@/components/secciones/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { menu, menuCompleto } from "@/lib/navegacion";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Newsreader variable con su eje óptico (titulares a 300) y precarga; Inter Tight sin precarga (encargo §8.6).
const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal"],
  variable: "--font-newsreader",
  display: "swap",
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const mensaje = mensajeInicio(contacto);
  const completo = menuCompleto(config);
  return (
    <html lang="es" style={estiloMarca(config)} className={`${newsreader.variable} ${interTight.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-[60] -translate-y-[200%] rounded-boton bg-fondo px-5 py-3 font-medium text-texto focus-visible:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Cabecera
          nombre={negocio.nombre}
          logo={negocio.logo}
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensaje}
          enlaces={menu(config)}
          enlacesMenu={completo}
        />
        <CabeceraInteligente />
        {/* Fundido entre páginas (recurso 6): React lo dispara en cada navegación; sin soporte, navegación normal. */}
        <ViewTransition>
          <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
        </ViewTransition>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={completo} />
        <ParejaFlotante telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
      </body>
    </html>
  );
}
