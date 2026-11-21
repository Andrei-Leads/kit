import type { Metadata } from "next";
import { iniciales, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { hayPrecios } from "@/lib/precios";
import { Foto } from "@/components/base/Foto";
import { BentoConfianza } from "@/components/secciones/BentoConfianza";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Marcas } from "@/components/secciones/Marcas";
import { anioActual } from "@/lib/anio";
import { tarjetasBento } from "@/lib/bento";
import { h1Pagina, h2Seccion, tarjeta } from "@/lib/estilos";
import { mensajeBase } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

/**
 * /empresa (encargo §7), corta: `historia` (o la descripción corta), la primera foto, el equipo en
 * tarjetas con foto circular de 96 px (o iniciales en primario suave), el bento de confianza y las marcas
 * como píldoras. Cada bloque vacío se oculta.
 */
export default async function Page() {
  const { empresa, negocio, contacto } = config;
  const foto = empresa.imagenes[0];
  const bento = tarjetasBento(config, await anioActual());
  return (
    <>
      <section className="contenedor flex flex-col gap-[clamp(40px,5vw,64px)] pt-[clamp(24px,3.5vw,48px)] pb-[clamp(48px,6vw,88px)]">
        <div className={cn("grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)]", foto && "lg:grid-cols-2")}>
          <div className="flex min-w-0 flex-col gap-4.5">
            <h1 className={h1Pagina}>Quiénes somos</h1>
            {(empresa.historia.length > 0 ? empresa.historia : [negocio.descripcionCorta]).map((p, i) => (
              <p key={i} className="m-0 max-w-[62ch]">
                {p}
              </p>
            ))}
          </div>
          {foto && <Foto imagen={foto} preload proporcion="3/2" sizes="(min-width: 1280px) 560px, (min-width: 960px) 46vw, 100vw" className="rounded-tarjeta" />}
        </div>
        {empresa.equipo.length > 0 && (
          <div className="flex flex-col gap-5">
            <h2 className={h2Seccion}>El equipo</h2>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-4 p-0">
              {empresa.equipo.map((p) => (
                <li key={p.nombre} className={cn(tarjeta, "flex items-center gap-4.5 p-6")}>
                  {p.foto ? (
                    <Foto imagen={p.foto} proporcion="1/1" sizes="96px" className="size-24 flex-none rounded-full" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex size-24 flex-none items-center justify-center rounded-full bg-primario-suave text-[1.75rem] font-extrabold text-primario"
                    >
                      {iniciales(p.nombre)}
                    </span>
                  )}
                  <p className="m-0 flex flex-col leading-[1.35]">
                    <span className="text-lg font-bold">{p.nombre}</span>
                    {p.cargo && <span className="text-texto-suave">{p.cargo}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <BentoConfianza tarjetas={bento} />
      <Marcas marcas={config.marcas} />
      {config.marcas.length === 0 && <div className="h-[clamp(24px,4vw,48px)]" />}
      <CtaFinal contacto={config.contacto} valoracion={config.valoracion} conPrecios={hayPrecios(config)} mensaje={mensajeBase(contacto)} />
    </>
  );
}
