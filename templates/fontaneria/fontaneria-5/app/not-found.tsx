import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { LlamadaCierre, WhatsappContorno } from "@/components/Botones";
import { horarioLinea } from "@/lib/formato";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";

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

/** Tubería cortada: dos tramos en codo con sus manguitos separados y tapones primario. */
function TuboRoto() {
  return (
    <svg viewBox="0 0 420 220" width="420" height="220" aria-hidden="true" focusable="false" className="block h-auto w-full max-w-[460px]">
      <path d="M10 60 H170 V120" fill="none" stroke="var(--color-tinta)" strokeWidth="16" />
      <rect x="156" y="120" width="28" height="14" fill="var(--color-tinta)" />
      <path d="M250 150 V190 H410" fill="none" stroke="var(--color-tinta)" strokeWidth="16" />
      <rect x="236" y="136" width="28" height="14" fill="var(--color-tinta)" />
      <rect x="2" y="46" width="14" height="28" fill="var(--color-primario)" />
      <rect x="404" y="176" width="14" height="28" fill="var(--color-primario)" />
    </svg>
  );
}

export default function NoEncontrada() {
  const { contacto } = config;
  return (
    <section className="contenedor flex flex-wrap items-center gap-x-16 gap-y-8 pt-8 pb-12 lg:pt-16">
      <div className="min-w-0 flex-[1_1_520px]">
        <p className="m-0 font-mono text-[13px] leading-none font-semibold tracking-[0.08em]">ERROR 404</p>
        <h1 className="mt-2.5 mb-0 font-titulo text-h1 leading-[1.02] font-bold tracking-[-0.03em]">No encontramos esta página</h1>
        <p className="mt-3 mb-0 max-w-[46ch]">
          Puede que el enlace esté mal escrito o que la página ya no exista. Si tienes una avería, llámanos directamente.
        </p>
        <div className="mt-[22px] flex max-w-[720px] flex-wrap gap-x-3 gap-y-2.5">
          <LlamadaCierre contacto={contacto} alto="min-h-16" className="flex-[1_1_300px]" />
          {contacto.whatsapp && (
            <WhatsappContorno numero={contacto.whatsapp} mensaje={MENSAJE_NO_ENCONTRADA} alto="min-h-14" className="flex-[1_1_280px]">
              Escribir por WhatsApp
            </WhatsappContorno>
          )}
        </div>
        <p className="mt-3 mb-0 text-sm text-texto-suave">{horarioLinea(contacto)}</p>
        <nav aria-label="Páginas principales" className="mt-6 flex flex-wrap gap-2">
          {ENLACES.map((l) => (
            <Link key={l.href} href={l.href} className="block text-texto no-underline">
              <span className="corte-10 block bg-tinta p-0.5">
                <span className="corte-9 flex min-h-11 items-center bg-superficie pr-[22px] pl-3.5 font-titulo text-base leading-none font-semibold hover:bg-primario-suave">
                  {l.texto}
                </span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="min-w-0 flex-[1_1_360px]">
        <TuboRoto />
      </div>
    </section>
  );
}
