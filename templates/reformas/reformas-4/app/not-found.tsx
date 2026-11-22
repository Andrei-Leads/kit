import type { Metadata } from "next";
import Link from "next/link";

import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import config from "@/site.config";

// Next añade noindex a toda respuesta 404. Aquí se anulan el robots y el canonical «/» del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

const marcas = [
  { n: "01", href: "/", texto: "Inicio" },
  { n: "02", href: "/servicios", texto: "Servicios" },
  { n: "03", href: "/contacto", texto: "Contacto" },
];

/** 404 (encargo §7): cinta «Error 404», h1, «Entrada no registrada en el diario», cronología de 3 marcas que son los enlaces y la pareja. */
export default function NotFound() {
  return (
    <Marco config={config}>
      <section className="reticula min-h-[72vh] px-(--pad) py-[clamp(40px,2rem+4vw,120px)]">
        <div className="grid max-w-[880px] justify-items-start gap-5">
          <span className="cinta">Error 404</span>
          <h1 className="mono max-w-[16ch] text-h1 leading-[1.08] font-medium tracking-[-0.03em]">No encontramos esta página</h1>
          <p className="mono text-sm text-texto-suave">Entrada no registrada en el diario</p>
          <nav aria-label="Páginas principales" className="mt-6 mb-4 w-full">
            <ol className="grid grid-cols-3">
              {marcas.map((m) => (
                <li key={m.href} className="relative border-t border-cota pt-3.5">
                  <span aria-hidden="true" className="rombo absolute -top-[5px] left-0" />
                  <Link href={m.href} className="mono grid min-h-11 gap-0.5 text-xs no-underline">
                    <span className="font-semibold text-primario-claro">{m.n}</span>
                    <span className="justify-self-start border-b border-cota text-texto">{m.texto}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <Pareja contacto={config.contacto} mensaje={MENSAJE_NO_ENCONTRADA} />
        </div>
      </section>
    </Marco>
  );
}
