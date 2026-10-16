import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados } from "@andrei-leads/core";
import "./globals.css";
import config from "@/site.config";
import { menu } from "@/lib/navegacion";
import { mensajeGeneral } from "@/lib/mensajes";
import { Animaciones } from "@/components/Animaciones";
import { BarraMovil } from "@/components/secciones/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
const mono = JetBrains_Mono({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

export const metadata: Metadata = crearMetadatos(config);

/**
 * Pone la clase `js` en <html> antes del primer pintado. Las animaciones de aparición
 * (globals.css) solo ocultan su estado inicial bajo `.js`: sin JavaScript todo se ve.
 */
const SCRIPT_JS = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const items = menu(config);
  return (
    <html
      lang="es"
      // El script de arriba añade `js` antes de hidratar: la clase difiere a propósito del HTML del servidor.
      suppressHydrationWarning
      style={{ "--color-primario": config.marca.colorPrimario } as React.CSSProperties}
      className={`${mono.variable} ${hanken.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_JS }} />
      </head>
      {/* Columna a pantalla completa: la barra móvil (sticky, último hijo) queda siempre al final. */}
      <body className="flex min-h-dvh flex-col font-sans">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <Animaciones />
        <Cabecera
          nombre={config.negocio.nombre}
          logo={config.negocio.logo}
          contacto={config.contacto}
          items={items}
        />
        <main className="flex-1">{children}</main>
        <Pie
          negocio={config.negocio}
          contacto={config.contacto}
          acreditaciones={config.acreditaciones}
          redes={config.redes}
          items={items}
        />
        <BarraMovil
          telefono={config.contacto.telefono}
          whatsapp={config.contacto.whatsapp}
          mensaje={mensajeGeneral(config.contacto)}
        />
      </body>
    </html>
  );
}
