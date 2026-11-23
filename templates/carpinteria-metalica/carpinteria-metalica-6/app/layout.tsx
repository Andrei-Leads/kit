import type { Metadata } from "next";
import { Merriweather_Sans } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";
import "./globals.css";

import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { menu, menuCompleto } from "@/lib/navegacion";

// next/font la descarga en el build y la sirve desde la propia web (sin peticiones a Google), con
// ajuste de métricas del respaldo (sin CLS). Merriweather Sans variable: una sola familia, títulos a
// 800 y texto a 400 (encargo §9).
const merriweather = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--font-merriweather-sans",
  display: "swap",
});

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const mensaje = mensajeInicio(contacto);
  const completo = menuCompleto(config);
  return (
    <html lang="es" style={estiloMarca(config)} className={merriweather.variable}>
      <body className="flex min-h-dvh flex-col">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-50 -translate-y-[200%] rounded-boton bg-superficie px-5 py-3 font-bold text-texto focus-visible:translate-y-0"
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
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={completo} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
      </body>
    </html>
  );
}
