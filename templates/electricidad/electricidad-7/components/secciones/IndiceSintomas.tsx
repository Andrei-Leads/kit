import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";

/**
 * Sin WhatsApp, la tarjeta del chat se sustituye por un índice por síntomas estático:
 * burbujas-enlace con cada `titulo` a su `/servicios/[slug]`.
 */
export function IndiceSintomas({ servicios }: { servicios: readonly Pick<SiteConfig["servicios"][number], "titulo" | "slug">[] }) {
  return (
    <nav aria-labelledby="h-sintomas" className="rounded-tarjeta border border-linea-fuerte bg-superficie px-[18px] pt-5 pb-[22px] shadow-chat">
      <h2 id="h-sintomas" className="m-0 mb-3.5 text-[22px] font-extrabold">
        Elige lo que te pasa
      </h2>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {servicios.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/servicios/${s.slug}`}
              className="pulsable flex min-h-11 max-w-[280px] items-center gap-2 border-[1.5px] border-borde-respuesta bg-fondo px-4 py-2.5 text-base leading-tight font-bold no-underline burbuja-entra hover:bg-burbuja-sale"
            >
              {s.titulo} <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
