import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";
import { estiloHtml } from "@/lib/marca";
import { mensajeInicio } from "@/lib/mensajes";
import { menu } from "@/lib/navegacion";
import { llamarCorto } from "@/lib/textos";

// next/font la descarga al compilar y la sirve desde la propia web (sin peticiones a Google).
// Variable en wght: sin lista de pesos.
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const items = menu(config);
  const mensaje = mensajeInicio(contacto);
  return (
    <html lang="es" style={estiloHtml(config)} className={nunito.variable}>
      {/* En móvil, la barra fija (72 px + área segura) deja su sitio al final de la página. */}
      <body className="flex min-h-dvh flex-col pb-[calc(72px+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="sr-only z-50 rounded-boton bg-texto px-5 py-3 font-extrabold text-fondo focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        <Cabecera negocio={negocio} contacto={contacto} items={items} mensaje={mensaje} />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} items={items} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoLlamar={llamarCorto(contacto)} />
      </body>
    </html>
  );
}
