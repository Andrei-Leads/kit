import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados } from "@andrei-leads/core";
import "./globals.css";

import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { MenuPantalla } from "@/components/secciones/MenuPantalla";
import { Pie } from "@/components/secciones/Pie";
import { estiloTemplate } from "@/lib/marca";
import { mensajeInicio } from "@/lib/mensajes";
import { menu } from "@/lib/navegacion";
import { textoLlamada } from "@/lib/textos";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Fraunces variable con los ejes opsz y SOFT (un archivo) y cursiva para la ciudad y las citas;
// solo ella se precarga (es el LCP sin foto). Figtree, variable y sin precarga.
const fraunces = Fraunces({
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const enlaces = menu(config);
  const mensaje = mensajeInicio(contacto);
  return (
    <html lang="es" style={estiloTemplate(config)} className={`${fraunces.variable} ${figtree.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <Cabecera
          nombre={negocio.nombre}
          logo={negocio.logo}
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensaje}
          urgencias24h={contacto.urgencias24h}
        />
        <MenuPantalla
          enlaces={enlaces}
          nombre={negocio.nombre}
          logo={negocio.logo}
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensaje}
          textoLlamada={textoLlamada(negocio.nombre, contacto.urgencias24h)}
        />
        <main className="flex-1">{children}</main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={enlaces} />
        <BarraMovil
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensaje}
          textoLlamada={contacto.urgencias24h ? "Llamar 24 h" : "Llamar"}
        />
      </body>
    </html>
  );
}
