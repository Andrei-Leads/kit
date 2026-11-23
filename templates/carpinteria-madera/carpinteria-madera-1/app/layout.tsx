import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";
import "./globals.css";

import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { menu, menuCompleto } from "@/lib/navegacion";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Newsreader variable con el eje `opsz` y su cursiva (encargo §9), precargada: es la del h1 (LCP
// sin foto). Instrument Sans variable sin precarga (encargo §8, presupuesto).
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap", preload: false });

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const mensaje = mensajeInicio(contacto);
  return (
    <html lang="es" style={estiloMarca(config)} className={`${newsreader.variable} ${instrument.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-50 -translate-y-[200%] bg-texto px-5 py-3 font-semibold text-superficie focus-visible:translate-y-0"
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
          enlacesMovil={menuCompleto(config)}
        />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={menuCompleto(config)} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
      </body>
    </html>
  );
}
