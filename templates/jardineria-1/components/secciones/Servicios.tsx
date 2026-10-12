import Image from "next/image";
import { BotonLlamada, type SiteConfig } from "@andrei-leads/core";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { contenedorSeccion, TituloSeccion } from "@/components/TituloSeccion";
import { numeroServicio } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  servicios: SiteConfig["servicios"];
  /** Para el CTA «Cuéntanos tu caso». */
  telefono: string;
};

/*
 * Móvil: lista con miniatura 1:1 de 88 px y filetes entre filas.
 * Escritorio (md+): tarjetas con imagen 16:10 en rejilla (3 columnas a 1280 px).
 * Sin imagen: bloque primario con el número del servicio, del mismo tamaño que la foto.
 */
export function Servicios({ servicios, telefono }: Props) {
  return (
    <section id="servicios" aria-labelledby="titulo-servicios" className="border-t-2 border-tinta">
      <div className={cn(contenedorSeccion, "flex flex-col gap-[clamp(24px,3vw,40px)]")}>
        <TituloSeccion id="titulo-servicios">Nuestros servicios</TituloSeccion>

        <ol className="m-0 flex list-none flex-col border-t-2 border-tinta p-0 md:grid md:grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] md:gap-4 md:border-t-0">
          {servicios.map((s, i) => (
            <li key={`${s.titulo}-${i}`} className="flex">
              <Card className="grid w-full grid-cols-[88px_minmax(0,1fr)] items-start gap-3.5 rounded-none border-0 border-b-2 bg-transparent py-4 md:flex md:gap-0 md:overflow-hidden md:rounded-md md:border-2 md:bg-tarjeta md:p-0">
                {s.imagenes[0] ? (
                  <div className="relative aspect-square w-[88px] overflow-hidden rounded-sm bg-linea md:aspect-[16/10] md:w-full md:rounded-none md:border-b-2 md:border-tinta">
                    <Image
                      src={s.imagenes[0].src}
                      alt={s.imagenes[0].alt}
                      fill
                      sizes="(min-width: 768px) 400px, 88px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex aspect-square w-[88px] items-end rounded-sm bg-primario px-2.5 py-2 text-sobre-primario shadow-[inset_0_-3px_0_rgb(0_0_0/0.2)] md:aspect-[16/10] md:w-full md:rounded-none md:border-b-2 md:border-tinta md:px-5 md:py-4 md:shadow-none"
                  >
                    <span className="text-[40px] leading-[0.8] font-extrabold font-stretch-66% md:text-[120px] md:leading-[0.75]">
                      {numeroServicio(i)}
                    </span>
                  </div>
                )}
                <div className="flex min-w-0 flex-col gap-1 md:gap-2 md:px-[22px] md:pt-5 md:pb-6">
                  <h3 className="m-0 text-[23px] leading-none font-extrabold text-balance uppercase font-stretch-72% md:text-[28px]">
                    {s.titulo}
                  </h3>
                  <p className="m-0 text-base leading-[1.45] text-pretty text-tinta-suave md:leading-normal">
                    {s.descripcion}
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-md border-2 border-dashed border-tinta p-[clamp(16px,2vw,24px)]">
          <p className="m-0 text-[clamp(18px,1.6vw,22px)] leading-[1.3] font-bold">
            ¿No ves lo que necesitas? Cuéntanos tu caso.
          </p>
          <BotonLlamada
            telefono={telefono}
            className={cn(buttonVariants({ variant: "primario", size: "md" }), "px-[22px]")}
          >
            Llamar ahora
          </BotonLlamada>
        </div>
      </div>
    </section>
  );
}
