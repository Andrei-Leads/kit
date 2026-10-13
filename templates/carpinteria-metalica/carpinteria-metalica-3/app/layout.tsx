import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import config from "@/site.config";
import { menu } from "@/lib/navegacion";
import { mensajeGeneral } from "@/lib/mensajes";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";
import { BarraMovil } from "@/components/secciones/BarraMovil";

// next/font la descarga en el build y la sirve desde la propia web.
const barlow = Barlow({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.seo.url),
  title: {
    default: config.seo.titulo,
    template: "%s · " + config.negocio.nombre,
  },
  description: config.seo.descripcion,
  // Negocio ficticio y aún sin SEO técnico: no se indexa.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: config.negocio.nombre,
    title: config.seo.titulo,
    description: config.seo.descripcion,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const items = menu(config);
  return (
    <html
      lang="es"
      style={{ "--color-primario": config.marca.colorPrimario } as React.CSSProperties}
      className={`${barlow.variable} antialiased`}
    >
      <body className="min-h-full font-sans">
        <Cabecera
          nombre={config.negocio.nombre}
          logo={config.negocio.logo}
          telefono={config.contacto.telefono}
          items={items}
        />
        <main className="pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-0">{children}</main>
        <Pie
          negocio={config.negocio}
          contacto={config.contacto}
          redes={config.redes}
          items={items}
        />
        <BarraMovil telefono={config.contacto.telefono} whatsapp={config.contacto.whatsapp} mensaje={mensajeGeneral(config.contacto)} />
      </body>
    </html>
  );
}
