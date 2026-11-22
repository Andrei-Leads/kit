import type { Metadata } from "next";
import Link from "next/link";

import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import { lineaHorario } from "@/lib/textos";
import config from "@/site.config";

// Next añade noindex a toda respuesta 404. Aquí se anulan el robots y el canonical «/» del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

/** 404 (encargo §7): fondo terracota, h1, la frase, la pareja y enlaces en píldoras. */
export default function NotFound() {
  return (
    <Marco>
      <section
        data-sobre-primario=""
        className="flex min-h-svh items-center bg-(--color-fondo-hero) px-[clamp(16px,4vw,40px)] pt-[clamp(96px,3rem+8vw,160px)] pb-16 text-sobre-primario"
      >
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-5">
          <p className="text-[13px] font-semibold tracking-[0.08em] uppercase">Error 404</p>
          <h1 className="max-w-[14ch] font-titulo text-display leading-[1.04] font-semibold tracking-[-0.02em] text-balance">No encontramos esta página</h1>
          <p className="text-[clamp(1.0625rem,0.95rem+0.5vw,1.375rem)]">Pero podemos empezar tu reforma desde aquí.</p>
          <Pareja
            contacto={config.contacto}
            mensaje={MENSAJE_NO_ENCONTRADA}
            tono="sobre"
            nota={lineaHorario(config.contacto)}
            className="mt-1 max-w-[600px]"
          />
          <ul className="mt-2 flex flex-wrap gap-2">
            {[
              { href: "/", texto: "Inicio" },
              { href: "/servicios", texto: "Servicios" },
              { href: "/contacto", texto: "Contacto" },
            ].map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="flex min-h-11 items-center rounded-full border-[1.5px] border-sobre-primario px-[18px] font-semibold no-underline">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Marco>
  );
}
