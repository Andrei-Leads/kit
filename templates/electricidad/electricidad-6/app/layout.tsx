import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { MenuPopover } from "@/components/base/MenuPopover";
import { LlamadaPlaca } from "@/components/Botones";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { mensajeBase } from "@/lib/mensajes";
import { menu } from "@/lib/navegacion";
import { textoLlamarCorto } from "@/lib/textos";

// Archivo variable con eje de anchura (encargo §9): títulos y número a wdth 62 y peso 800, texto a
// wdth 100 y peso 400. Un archivo para todo, servido desde la propia web; `swap` con las métricas de
// ajuste de next/font para que el número (LCP) no salte.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const items = menu(config);
  const { negocio, contacto, acreditaciones, redes } = config;
  const mensaje = mensajeBase(contacto);
  return (
    <html lang="es" style={estiloMarca(config)} className={archivo.variable}>
      {/* La barra combinada es fija por debajo de 1024 px: el body reserva su alto (52 + 16 px + área segura). */}
      <body className="flex min-h-dvh flex-col bg-fondo text-texto pb-[calc(4.25rem+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="sr-only z-50 bg-primario px-4 py-3 font-bold text-sobre-primario focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:outline-3 focus:outline-offset-2 focus:outline-foco"
        >
          Saltar al contenido
        </a>
        <Cabecera negocio={negocio} contacto={contacto} items={items} mensaje={mensaje} />
        <main id="contenido" tabIndex={-1} className="flex flex-1 flex-col focus:outline-none">{children}</main>
        <Pie negocio={negocio} contacto={contacto} acreditaciones={acreditaciones} redes={redes} items={items} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoLlamar={textoLlamarCorto(contacto)} />
        <MenuPopover enlaces={items} llamada={<LlamadaPlaca contacto={contacto} conNumero className="min-h-14 w-full text-[1.0625rem]" />} />
      </body>
    </html>
  );
}
