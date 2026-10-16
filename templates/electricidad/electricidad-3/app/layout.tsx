import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados } from "@andrei-leads/core";
import "./globals.css";
import config from "@/site.config";
import { menu } from "@/lib/navegacion";
import { mensajeGeneral } from "@/lib/mensajes";
import { Animaciones } from "@/components/Animaciones";
import { BarraMovil } from "@/components/secciones/BarraMovil";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";

// next/font la descarga en el build y la sirve desde la propia web (sin peticiones a Google).
// Fira Sans no es variable: solo los pesos que usa el diseño (400 cuerpo, 600 botones, 700 h2 y precios, 800 h1 y teléfono).
const fira = Fira_Sans({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-fira-sans",
  display: "swap",
});

export const metadata: Metadata = crearMetadatos(config);

/**
 * Pone la clase `js` en <html> antes del primer pintado. Las animaciones de aparición
 * (globals.css) y todo lo que solo existe con JavaScript cuelgan de `.js`: sin JS todo se ve.
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
      className={fira.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_JS }} />
      </head>
      <body className="font-sans">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <Animaciones />
        {/*
          Envoltorio de página: columna a pantalla completa (el pie queda al final) con `overflow-x: clip`.
          Las manchas de luz salen del viewport a propósito (right:-60px…) y sin esto darían scroll horizontal.
          `clip` no crea contenedor de scroll, así que la cabecera y el índice (sticky) siguen funcionando.
        */}
        <div className="flex min-h-dvh flex-col overflow-x-clip">
          <Cabecera
            nombre={config.negocio.nombre}
            logo={config.negocio.logo}
            contacto={config.contacto}
            items={items}
          />
          <main className="flex-1">{children}</main>
          <Pie negocio={config.negocio} contacto={config.contacto} redes={config.redes} items={items} />
        </div>
        <BarraMovil
          telefono={config.contacto.telefono}
          whatsapp={config.contacto.whatsapp}
          mensaje={mensajeGeneral(config.contacto)}
        />
      </body>
    </html>
  );
}
