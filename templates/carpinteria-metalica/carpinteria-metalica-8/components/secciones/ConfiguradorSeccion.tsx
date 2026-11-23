import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, minusculaInicial, telefonoVisible, type Servicio, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Configurador } from "@/components/cliente/Configurador";
import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { pieConjunto } from "@/lib/textos";

type Props = {
  servicios: readonly Servicio[];
  nombre: string;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensaje: string;
};

/**
 * Sección del configurador (encargo §5 y §6.9). Se oculta sin WhatsApp. Las fotos de las tarjetas
 * se pintan aquí (servidor) y llegan a la isla como `ReactNode`; a la isla solo llegan el título y
 * el título en frase de cada servicio. Sin JS (`scripting: none`), la lista de servicios enlazados y
 * el WhatsApp con el mensaje general.
 */
export function ConfiguradorSeccion({ servicios, nombre, contacto, mensaje }: Props) {
  if (!contacto.whatsapp) return null;
  const conFoto = servicios.slice(0, 6);
  const pieFotos = pieConjunto(conFoto.flatMap((s) => s.imagenes.slice(0, 1)));
  const opciones = servicios.map((s, i) => {
    const foto = s.imagenes[0];
    return {
      titulo: s.titulo,
      enFrase: minusculaInicial(s.titulo),
      medio:
        i < 6 ? (
          foto ? (
            <Foto imagen={foto} decorativa sinEtiqueta proporcion="4/3" calidad={60} sizes="(min-width: 1024px) 200px, 45vw" className="w-full rounded-[18px] bg-primario-suave" />
          ) : (
            <span aria-hidden="true" className="flex aspect-[4/3] w-full items-center justify-center rounded-[18px] bg-primario-suave font-titulo text-[44px] font-medium text-primario-tinta">
              {s.titulo.charAt(0)}
            </span>
          )
        ) : undefined,
    };
  });

  return (
    <section id="configurador" aria-labelledby="titulo-configurador" className="px-[clamp(12px,3vw,40px)] pt-[clamp(24px,4vw,48px)] pb-[clamp(72px,9vw,128px)]">
      <div className="mx-auto max-w-[1080px] rounded-[clamp(32px,5vw,64px)_clamp(40px,6vw,80px)_clamp(32px,5vw,64px)_clamp(36px,5vw,72px)] bg-superficie px-[clamp(18px,5vw,64px)] py-[clamp(28px,5vw,64px)] shadow-suave">
        <div className="mb-7 flex flex-col gap-3">
          <p className="antetitulo">Pide presupuesto</p>
          <h2 id="titulo-configurador" className="h2">
            Cuéntanos qué necesitas en tres toques
          </h2>
          <p className="max-w-[48ch] text-texto-suave">Preparamos el mensaje por ti y lo envías por WhatsApp. No te pedimos datos.</p>
        </div>

        <Configurador
          servicios={opciones}
          nombre={nombre}
          whatsapp={contacto.whatsapp}
          pieFotos={pieFotos}
          llamada={
            <BotonLlamada telefono={contacto.telefono} className="boton boton-tierra">
              <IconoTelefono />
              Prefiero llamar ·&nbsp;{telefonoVisible(contacto.telefono)}
            </BotonLlamada>
          }
        />

        {/* Sin JavaScript: servicios enlazados y el WhatsApp con el mensaje general. */}
        <div className="[@media(scripting:enabled)]:hidden">
          <ul className="mb-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-2.5">
            {servicios.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className="flex min-h-[52px] items-center gap-3 rounded-boton border-[1.5px] border-borde px-3.5 py-2 font-medium no-underline">
                  <span aria-hidden="true" className="flex h-7 w-[30px] flex-none items-center justify-center rounded-guijarro-1 bg-primario-suave font-titulo text-[15px]">
                    {s.titulo.charAt(0)}
                  </span>
                  {s.titulo}
                </Link>
              </li>
            ))}
          </ul>
          <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="boton boton-grande boton-guijarro max-lg:w-full">
            <IconoWhatsApp tamano={21} />
            Escríbenos por WhatsApp
          </BotonWhatsApp>
        </div>
      </div>
    </section>
  );
}
