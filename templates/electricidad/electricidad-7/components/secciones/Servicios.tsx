import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { WhatsappSuave } from "@/components/Botones";
import { IconoCamara } from "@/components/Iconos";
import { Precio } from "@/components/secciones/Precio";
import { mensajeDeServicio } from "@/lib/mensajes";

type Props = {
  servicios: SiteConfig["servicios"];
  whatsapp?: string;
  titulo: string;
};

/**
 * Índice por síntomas: una tarjeta (radio 24 px) por servicio. Con foto, la foto vertical 3:4
 * como «foto recibida»; sin foto, un bocadillo grande con el título y la cámara en mostaza.
 * Pie: «Qué hacemos →» y «Mándanos una foto» con el mensaje del servicio.
 */
export function Servicios({ servicios, whatsapp, titulo }: Props) {
  return (
    <section aria-labelledby="h-servicios" className="contenedor py-[clamp(40px,2rem+3vw,96px)]">
      <h2 id="h-servicios" className="m-0 mb-6 text-h2 leading-[1.1] font-black tracking-[-0.01em]">
        {titulo}
      </h2>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-4 p-0">
        {servicios.map((s) => {
          const foto = s.imagenes[0];
          const href = `/servicios/${s.slug}`;
          const enlaceTitulo = (
            <Link href={href} className="no-underline hover:underline">
              {s.titulo}
            </Link>
          );
          return (
            <li key={s.slug} className="flex flex-col gap-3.5 rounded-tarjeta border border-linea bg-superficie px-3 pt-3 pb-3.5">
              {foto ? (
                <div className="flex items-start gap-3.5">
                  <Foto imagen={foto} proporcion="3/4" sizes="132px" className="w-[clamp(112px,26vw,132px)] flex-none" />
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-1">
                    <h3 className="m-0 text-[19px] leading-tight font-black">{enlaceTitulo}</h3>
                    <p className="m-0 text-[15.5px] leading-snug text-texto-suave">{s.descripcion}</p>
                    {s.precioDesde && <Precio texto={s.precioDesde} className="text-[15px] font-extrabold" />}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <div className="flex min-h-[120px] items-start justify-between gap-3.5 bg-burbuja-sale px-[18px] pt-[18px] pb-5 burbuja-entra">
                    <h3 className="m-0 text-[clamp(1.375rem,1.2rem+0.6vw,1.625rem)] leading-[1.15] font-black">{enlaceTitulo}</h3>
                    <IconoCamara tamano={30} className="flex-none text-acento" />
                  </div>
                  <p className="m-0 px-1 text-[15.5px] leading-snug text-texto-suave">{s.descripcion}</p>
                  {s.precioDesde && <Precio texto={s.precioDesde} className="px-1 text-[15px] font-extrabold" />}
                </div>
              )}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 px-0.5">
                <Link href={href} className="inline-flex min-h-11 items-center px-1 text-[15px] font-extrabold underline underline-offset-[3px]">
                  Qué hacemos<span className="sr-only">: {s.titulo}</span>
                  <span aria-hidden="true">&nbsp;→</span>
                </Link>
                {whatsapp && <WhatsappSuave numero={whatsapp} mensaje={mensajeDeServicio(s)} pequeno />}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
