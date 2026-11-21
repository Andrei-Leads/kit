import type { Metadata } from "next";
import { estiloMarca } from "@andrei-leads/core";

import config from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  title: "Banco de pruebas del kit",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" style={estiloMarca(config)}>
      <body className="pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">{children}</body>
    </html>
  );
}
