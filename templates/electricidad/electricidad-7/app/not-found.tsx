import type { Metadata } from "next";
import Link from "next/link";

import config from "@/site.config";
import { ParCta, RESPUESTA } from "@/components/Botones";
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

/** 404 como conversación: el h1 es una burbuja entrante, la frase otra, y respuestas rápidas a las páginas principales. */
export default function NoEncontrada() {
  const { contacto } = config;
  return (
    <section className="contenedor py-[clamp(40px,2rem+4vw,120px)]">
      <div className="mx-auto flex max-w-[640px] flex-col gap-3.5">
        <h1 className="m-0 max-w-[92%] self-start rounded-[30px_30px_30px_8px] border border-linea bg-superficie px-6 py-[18px] text-[clamp(2rem,1.6rem+2vw,3rem)] leading-[1.08] font-black tracking-[-0.015em]">
          No encontramos esta página
        </h1>
        <p className="m-0 max-w-[85%] self-start border border-linea bg-superficie px-[18px] py-3 leading-normal burbuja-entra">
          Puede que el enlace esté mal o que la página ya no exista. ¿Adónde quieres ir?
        </p>
        <nav aria-label="Páginas principales" className="flex flex-wrap justify-end gap-2">
          {ENLACES.map((e) => (
            <Link key={e.href} href={e.href} className={RESPUESTA}>
              {e.texto}
            </Link>
          ))}
        </nav>
        <ParCta contacto={contacto} mensaje={MENSAJE_NO_ENCONTRADA} textoWhatsapp="Escríbenos por WhatsApp" className="mt-4" />
      </div>
    </section>
  );
}
