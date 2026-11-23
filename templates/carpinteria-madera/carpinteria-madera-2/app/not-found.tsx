import type { Metadata } from "next";
import Link from "next/link";

import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import config from "@/site.config";

// Next añade noindex a toda respuesta 404. Aquí se anulan el robots y el canonical «/» del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

/** 404 (encargo §7): campo pleno a casi toda la altura, h1, «Este hueco está vacío.», enlaces en píldoras y la pareja. */
export default function NotFound() {
  return (
    <Marco>
      <section className="campo-pleno flex min-h-[88svh] items-center px-[clamp(20px,4vw,40px)] pt-[120px] pb-20">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[18px]">
          {/* El diseño la pone en JetBrains Mono: va en la fuente de texto para no cargar una tercera fuente. */}
          <p className="text-sm font-semibold tracking-[0.08em] uppercase">Error 404</p>
          <h1 className="max-w-[14ch] font-titulo text-display leading-[1.04] font-bold tracking-[-0.03em]">No encontramos esta página</h1>
          <p className="text-[clamp(1.1rem,1rem+0.5vw,1.4rem)]">Este hueco está vacío.</p>
          <nav aria-label="Enlaces útiles">
            <ul className="flex flex-wrap gap-2.5">
              {[
                { href: "/", texto: "Inicio" },
                { href: "/servicios", texto: "Servicios" },
                { href: "/contacto", texto: "Contacto" },
              ].map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="inline-flex min-h-12 items-center rounded-full bg-(--color-velo-pleno) px-5 font-semibold no-underline">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Pareja contacto={config.contacto} mensaje={MENSAJE_NO_ENCONTRADA} tono="pleno" className="mt-3" />
        </div>
      </section>
    </Marco>
  );
}
