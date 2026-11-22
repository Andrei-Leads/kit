import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import { Analitica, contraste, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";
import "./globals.css";

import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { menu, menuMovil } from "@/lib/navegacion";

// next/font la descarga en el build y la sirve desde la propia web (sin peticiones a Google), con
// ajuste de métricas del respaldo (sin CLS). Commissioner variable: una sola familia para títulos
// y texto (encargo §9), sin lista de pesos.
const commissioner = Commissioner({ subsets: ["latin"], variable: "--font-commissioner", display: "swap" });

export const metadata: Metadata = crearMetadatos(config);

/** Nogal de --color-fondo: el arco vacío dibujado pasa a crema si el primario no llega a 3:1 sobre él (encargo §8). */
const FONDO = "#1c1410";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes, marca } = config;
  const mensaje = mensajeInicio(contacto);
  const estilo: CSSProperties = { ...estiloMarca(config) };
  if (marca.colorPrimario && contraste(marca.colorPrimario, FONDO) < 3) {
    (estilo as Record<string, string>)["--color-arco"] = "var(--color-texto)";
  }
  return (
    <html lang="es" style={estilo} className={commissioner.variable}>
      <body className="flex min-h-dvh flex-col">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-50 -translate-y-[200%] rounded-boton bg-texto px-5 py-3 font-semibold text-fondo focus-visible:translate-y-0"
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
          enlacesMovil={menuMovil(config)}
        />
        {/* El <main> reserva el alto de la cabecera fija; las páginas con el arco arriba suben bajo ella (`bajo-cabecera`). */}
        <main id="contenido" tabIndex={-1} className="flex-1 pt-(--alto-cabecera) focus:outline-none">
          {children}
        </main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={menu(config)} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />
      </body>
    </html>
  );
}
