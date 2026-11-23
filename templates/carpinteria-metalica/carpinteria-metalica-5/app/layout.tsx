import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca, formatearHorario } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { menu, menuPie } from "@/lib/navegacion";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Newsreader (títulos, cifras y el h1 del hero, variable con cursiva; sin el eje óptico, −150 KB, Ysst 23/11/2026) y Schibsted
// Grotesk (texto y botones). Variables en wght: sin lista de pesos.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted", display: "swap", preload: false });

export const metadata: Metadata = crearMetadatos(config);

/**
 * Cabecera, pie y barra móvil en todas las páginas. En móvil, el <body> reserva la altura de
 * la barra (64 px + área segura).
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const mensaje = mensajeInicio(contacto);
  return (
    <html lang="es" style={estiloMarca(config)} className={`${newsreader.variable} ${schibsted.variable}`}>
      <body className="min-h-dvh pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a href="#contenido" className="fixed top-3 left-3 z-50 -translate-y-[200%] bg-superficie px-5 py-3 font-medium text-texto focus-visible:translate-y-0">
          Saltar al contenido
        </a>
        <Cabecera
          nombre={negocio.nombre}
          logo={negocio.logo}
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensaje}
          enlaces={menu(config)}
          horario={formatearHorario(contacto.horario)}
        />
        <main id="contenido" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={menuPie(config)} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
      </body>
    </html>
  );
}
