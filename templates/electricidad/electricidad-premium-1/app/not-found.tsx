import type { Metadata } from "next";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { EnlaceFlecha, Senal } from "@/components/Titular";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import { datosCta } from "@/lib/textos";

// Next añade <meta name="robots" content="noindex"> a toda respuesta 404. Aquí se
// anulan el robots y el canonical «/» que heredaría del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

/**
 * 404 de «Tensión» (encargo §7): trama DIN a pantalla completa con un módulo
 * resaltado con filete de señal (decorativo), h1, frase, enlaces a /,
 * /servicios y /contacto, y la pareja con MENSAJE_NO_ENCONTRADA.
 */
export default function NotFound() {
  return (
    <section aria-labelledby="titulo-404" className="trama-din relative min-h-[calc(100svh-var(--alto-cabecera))] py-[clamp(48px,8vw,96px)]">
      <span
        aria-hidden="true"
        className="absolute top-[calc(var(--modulo-din)*2.5)] left-[calc(var(--modulo-din)*7)] h-[calc(var(--modulo-din)*2.5)] w-[var(--modulo-din)] border border-acento"
      />
      <div className="contenedor relative">
        <div className="flex max-w-[680px] flex-col gap-6 border border-[var(--color-linea)] bg-fondo p-[clamp(24px,4vw,48px)]">
          <p className="etiqueta m-0 text-acento">Error 404</p>
          <h1 id="titulo-404" className="titulo-interior">
            No encontramos esta <Senal>página</Senal>
          </h1>
          <p className="m-0 text-texto-suave">Puede que el enlace haya cambiado. Desde aquí llegas a lo importante.</p>
          <nav aria-label="Enlaces útiles">
            <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-4 p-0">
              <li>
                <EnlaceFlecha href="/">Inicio</EnlaceFlecha>
              </li>
              <li>
                <EnlaceFlecha href="/servicios">Servicios</EnlaceFlecha>
              </li>
              <li>
                <EnlaceFlecha href="/contacto">Contacto</EnlaceFlecha>
              </li>
            </ul>
          </nav>
          <Pareja cta={datosCta(config.contacto, MENSAJE_NO_ENCONTRADA)} className="pt-2" />
        </div>
      </div>
    </section>
  );
}
