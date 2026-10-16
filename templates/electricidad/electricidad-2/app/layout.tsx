import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados } from "@andrei-leads/core";
import "./globals.css";
import config from "@/site.config";
import { horarioVisible } from "@/lib/formato";
import { menu } from "@/lib/navegacion";
import { mensajeGeneral } from "@/lib/mensajes";
import { Animaciones } from "@/components/Animaciones";
import { BarraMovil } from "@/components/secciones/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";

// next/font las descarga en el build y las sirve desde la propia web (sin peticiones a Google).
// Source Serif 4 con el eje óptico `opsz` y cursiva: sin él, las comillas « grandes se solapan con la
// primera línea y el nombre de la cabecera salta a 2 líneas (revisión del diseño, menor 1). Sin
// `weight`: es variable (600 en títulos, 400 en citas y cifras).
const serif = Source_Serif_4({
  axes: ["opsz"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: "swap",
});
const sans = Source_Sans_3({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  display: "swap",
});

export const metadata: Metadata = crearMetadatos(config);

/**
 * Pone la clase `js` en <html> antes del primer pintado. Las animaciones de aparición y el cierre de
 * las preguntas (globals.css, accordion) solo ocultan su estado inicial bajo `.js`: sin JavaScript todo se ve.
 */
const SCRIPT_JS = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const items = menu(config);
  const { negocio, contacto, redes } = config;
  return (
    <html
      lang="es"
      // El script de arriba añade `js` antes de hidratar: la clase difiere a propósito del HTML del servidor.
      suppressHydrationWarning
      style={{ "--color-primario": config.marca.colorPrimario } as React.CSSProperties}
      className={`${serif.variable} ${sans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_JS }} />
      </head>
      {/* Columna a pantalla completa: la barra móvil (sticky, último hijo) queda siempre al final. */}
      <body className="flex min-h-dvh flex-col font-sans">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <Animaciones />
        <Cabecera nombre={negocio.nombre} logo={negocio.logo} contacto={contacto} items={items} />
        <main className="flex-1">{children}</main>
        <Pie negocio={negocio} contacto={contacto} redes={redes} items={items} />
        <BarraMovil
          items={items}
          telefono={contacto.telefono}
          whatsapp={contacto.whatsapp}
          mensaje={mensajeGeneral(contacto)}
          email={contacto.email}
          horario={horarioVisible(contacto)}
        />
      </body>
    </html>
  );
}
