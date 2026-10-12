import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import config from "@/site.config";

// Archivo variable con eje de anchura (wdth): el diseño usa font-stretch 66–75 %.
// next/font la descarga en el build y la sirve desde la propia web.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.seo.url),
  title: config.seo.titulo,
  description: config.seo.descripcion,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: config.negocio.nombre,
    title: config.seo.titulo,
    description: config.seo.descripcion,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      style={{ "--color-primario": config.marca.colorPrimario } as React.CSSProperties}
      className={`${archivo.variable} antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
