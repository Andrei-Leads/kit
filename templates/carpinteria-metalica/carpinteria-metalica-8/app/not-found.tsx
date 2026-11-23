import type { Metadata } from "next";
import Link from "next/link";

import { Pareja } from "@/components/Botones";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

/** 404 (encargo §7): un guijarro vacío con «Esta pieza no está en el taller», el h1, enlaces y la pareja. */
export default function NotFound() {
  return (
    <section aria-labelledby="titulo-404" className="contenedor pt-[clamp(40px,7vw,96px)] pb-[clamp(72px,9vw,128px)]">
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-[22px] text-center">
        <p className="flex aspect-[1.1] w-[min(70vw,260px)] -rotate-[4deg] items-center justify-center rounded-guijarro-1 border-[2.5px] border-dashed border-acento p-6 font-titulo text-xl leading-[1.3] text-texto-suave italic motion-reduce:rotate-0">
          Esta pieza no está en el taller
        </p>
        <h1 id="titulo-404" className="font-titulo text-[clamp(2.25rem,1.6rem+3vw,4rem)] leading-[1.02] font-medium tracking-[-0.02em] text-balance">
          No encontramos esta página
        </h1>
        <p className="max-w-[40ch] text-texto-suave">Puede que la dirección esté mal escrita o que la página ya no exista. Te dejamos por dónde seguir.</p>
        <nav aria-label="Enlaces" className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-semibold">
          <Link href="/" className="inline-flex min-h-11 items-center underline underline-offset-4">
            Inicio
          </Link>
          <Link href="/servicios" className="inline-flex min-h-11 items-center underline underline-offset-4">
            Servicios
          </Link>
          <Link href="/contacto" className="inline-flex min-h-11 items-center underline underline-offset-4">
            Contacto
          </Link>
        </nav>
        <Pareja contacto={config.contacto} mensaje={MENSAJE_NO_ENCONTRADA} textoWhatsapp="Escríbenos por WhatsApp" grande className="justify-center max-lg:w-full" />
      </div>
    </section>
  );
}
