import type { SiteConfig } from "@andrei-leads/core";

import { Card } from "@/components/ui/card";
import { contenedorSeccion, TituloSeccion } from "@/components/TituloSeccion";
import { estrellas, resumenResenas } from "@/lib/formato";
import { cn } from "@/lib/utils";

export function Resenas({ resenas }: { resenas: SiteConfig["resenas"] }) {
  if (resenas.length === 0) return null;
  const resumen = resumenResenas(resenas);

  return (
    <section
      id="opiniones"
      aria-labelledby="titulo-opiniones"
      className="border-t-2 border-tinta bg-primario-tinte"
    >
      <div className={cn(contenedorSeccion, "flex flex-col gap-[clamp(24px,3vw,40px)]")}>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <TituloSeccion id="titulo-opiniones">Lo que dicen de nosotros</TituloSeccion>
          <p className="m-0 flex items-center gap-3.5">
            <span className="sr-only">Nota media:</span>
            <span className="text-[clamp(56px,6vw,88px)] leading-[0.85] font-extrabold font-stretch-66%">
              {resumen.nota}
            </span>
            <span className="flex flex-col gap-0.5">
              <span aria-hidden="true" className="text-xl leading-none tracking-[2px]">
                {resumen.estrellas}
              </span>
              <span className="text-sm font-semibold">
                <span className="sr-only">sobre 5, </span>
                {resumen.total}
              </span>
            </span>
          </p>
        </div>

        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-3 p-0">
          {resenas.map((r, i) => (
            <li key={`${r.autor}-${i}`} className="flex">
              <Card className="w-full">
                <figure className="m-0 flex flex-1 flex-col gap-3.5 p-[clamp(18px,2vw,28px)]">
                  <span
                    role="img"
                    aria-label={`${r.puntuacion} de 5 estrellas`}
                    className="text-lg leading-none tracking-[2px]"
                  >
                    {estrellas(r.puntuacion)}
                  </span>
                  <blockquote className="m-0 text-[clamp(17px,1.5vw,20px)] leading-normal text-pretty">
                    «{r.texto}»
                  </blockquote>
                  <figcaption className="mt-auto border-t border-linea pt-3 text-sm font-bold tracking-[0.04em] uppercase">
                    {r.autor}
                  </figcaption>
                </figure>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
