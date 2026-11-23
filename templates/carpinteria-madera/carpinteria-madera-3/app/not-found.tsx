import type { Metadata } from "next";
import Link from "next/link";

import { Despiece } from "@/components/Despiece";
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

const ENLACES = [
  { href: "/", texto: "Inicio" },
  { href: "/servicios", texto: "Servicios" },
  { href: "/contacto", texto: "Contacto" },
];

/** 404 (encargo §7): el despiece con la pieza C en discontinua y «?», «Error 404 · Pieza C», h1, enlaces y la pareja. */
export default function NotFound() {
  return (
    <Marco config={config} rotulo="Hoja perdida">
      <section aria-labelledby="h1-404" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-10 pt-10 pb-6">
        <div aria-hidden="true">
          <Despiece n={6} falta={2} />
        </div>
        <div className="flex flex-col gap-[18px]">
          <p className="font-titulo text-[13px] font-semibold tracking-[0.04em] text-lapiz">Error 404 · Pieza C</p>
          <h1 id="h1-404" className="titulo text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] leading-[1.05]">
            No encontramos esta página
          </h1>
          <p className="max-w-[44ch] text-texto-suave">Falta una pieza: la dirección no existe o la hemos movido de sitio.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {ENLACES.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="enlace-mono min-h-11">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
          <Pareja contacto={config.contacto} mensaje={MENSAJE_NO_ENCONTRADA} />
        </div>
      </section>
    </Marco>
  );
}
