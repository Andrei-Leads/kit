import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";

import "./globals.css";
import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";
import { textoLlamarCorto } from "@/lib/formato";
import { mensajeBase } from "@/lib/mensajes";
import { menu } from "@/lib/navegacion";

// Commissioner variable (una sola familia, 800 en títulos y precios, 400 en texto). next/font la
// descarga en el build y la sirve desde la propia web, con preload (cifras grandes sin salto).
const commissioner = Commissioner({
  subsets: ["latin"],
  variable: "--font-commissioner",
  display: "swap",
});

export const metadata: Metadata = crearMetadatos(config);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const items = menu(config);
  const { negocio, contacto, redes } = config;
  const mensaje = mensajeBase(contacto);
  return (
    <html lang="es" style={estiloMarca(config)} className={commissioner.variable}>
      {/* La barra móvil es fija: el body reserva su alto (56 px + 16 px + área segura) por debajo de 960 px. */}
      <body className="flex min-h-dvh flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <Cabecera nombre={negocio.nombre} logo={negocio.logo} contacto={contacto} items={items} mensaje={mensaje} />
        <main className="flex flex-1 flex-col">{children}</main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} items={items} />
        <BarraMovil
          variante="dos"
          primero="llamar"
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensaje}
          textoLlamar={textoLlamarCorto(contacto)}
        />
      </body>
    </html>
  );
}
