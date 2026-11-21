import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Pie } from "@/components/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { rutas } from "@/lib/navegacion";
import { textoLlamar } from "@/lib/textos";

// Una sola familia variable (ejes wght y wdth): condensada (wdth 62) para títulos y normal para el
// texto. next/font la descarga en el build y la sirve desde la propia web, con ajuste de métricas.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = crearMetadatos(config);

/**
 * `navegacion` es el slot paralelo app/@navegacion: la cabecera y la hoja del menú con la sección
 * actual marcada desde el servidor (components/Navegacion.tsx).
 */
export default function RootLayout({ children, navegacion }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const menu = rutas(config);
  const mensaje = mensajeInicio(contacto);
  const llamar = textoLlamar(contacto);
  return (
    <html lang="es" style={estiloMarca(config)} className={archivo.variable}>
      {/* Columna a pantalla completa: la barra móvil (sticky, último hijo) queda siempre al final. */}
      <body className="flex min-h-dvh flex-col bg-fondo text-texto">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        {navegacion}
        <main className="flex-1">{children}</main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} rutas={menu} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoLlamar={llamar} idMenu="menu" />
      </body>
    </html>
  );
}
