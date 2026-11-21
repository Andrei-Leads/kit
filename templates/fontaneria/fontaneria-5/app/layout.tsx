import type { Metadata } from "next";
import { Albert_Sans, Outfit } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Capsula } from "@/components/secciones/Capsula";
import { Pie } from "@/components/secciones/Pie";
import { menu } from "@/lib/navegacion";
import { mensajeInicio } from "@/lib/mensajes";
import { textoLlamarCorto } from "@/lib/formato";

// next/font las descarga al compilar y las sirve desde la propia web (sin peticiones a Google).
// Variables: sin lista de pesos.
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const albert = Albert_Sans({ subsets: ["latin"], variable: "--font-albert-sans", display: "swap" });

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const items = menu(config);
  const mensaje = mensajeInicio(contacto);
  return (
    <html lang="es" style={estiloMarca(config)} className={`${outfit.variable} ${albert.variable}`}>
      {/* En móvil, la barra fija (56 px + área segura) deja su sitio al final de la página. */}
      <body className="flex min-h-dvh flex-col pb-[calc(56px+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <Capsula negocio={negocio} contacto={contacto} items={items} mensaje={mensaje} />
        <main className="flex-1">{children}</main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} items={items} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoLlamar={textoLlamarCorto(contacto)} />
      </body>
    </html>
  );
}
