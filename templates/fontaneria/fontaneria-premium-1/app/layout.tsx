import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados, estiloMarca } from "@andrei-leads/core";
import "./globals.css";

import config from "@/site.config";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Cabecera, ParejaFlotante } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { menu, menuCompleto } from "@/lib/navegacion";
import { datosCta } from "@/lib/textos";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Inter Tight (titulares, 200–400) con preload; Inter (texto) sin él (encargo §8).
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });

export const metadata: Metadata = crearMetadatos(config);

/**
 * Pone la clase `js` en <html> antes del primer pintado: sin ella, la cabecera
 * es fija y sólida en tinta (encargo §5.2); con ella, puede ser transparente
 * sobre el hero del inicio.
 */
const SCRIPT_JS = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { negocio, contacto, redes } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const completo = menuCompleto(config);
  return (
    <html
      lang="es"
      // El script de abajo añade `js` antes de hidratar; CabeceraScroll pone data-scroll y data-sobre.
      suppressHydrationWarning
      style={estiloMarca(config)}
      className={`${interTight.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_JS }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-[60] -translate-y-[200%] rounded-boton bg-white px-5 py-3 font-medium text-tinta focus-visible:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Cabecera nombre={negocio.nombre} logo={negocio.logo} cta={cta} enlaces={menu(config)} enlacesMenu={completo} />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} enlaces={completo} />
        <ParejaFlotante cta={cta} />
        <BarraMovil telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={cta.mensaje} />
      </body>
    </html>
  );
}
