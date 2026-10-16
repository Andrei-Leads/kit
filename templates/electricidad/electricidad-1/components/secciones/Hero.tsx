import type { SiteConfig } from "@andrei-leads/core";

import { LlamadaCampo, WhatsApp } from "@/components/BotonesContacto";
import { Sello } from "@/components/Sello";
import { Badge } from "@/components/ui/badge";
import { etiquetaCampo, h1Inicio, numeroSeccion } from "@/lib/estilos";
import { campoAcreditacion, mediaVisible, totalResenas } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "sector" | "descripcionCorta">;
  contacto: Pick<
    SiteConfig["contacto"],
    "telefono" | "whatsapp" | "mensajeWhatsapp" | "urgencias24h" | "tiempoLlegada" | "direccion"
  >;
  valoracion?: SiteConfig["valoracion"];
  /** Solo la primera acreditación: lleva el sello y su dato en texto. */
  acreditacion?: SiteConfig["acreditaciones"][number];
};

/**
 * Hero tipográfico sobre papel blanco (Specs §2). Es el LCP de la web: ni el h1, ni la llamada-campo,
 * ni el teléfono, ni los chips, ni el sello llevan `data-anim` (se ven desde el primer pintado).
 *
 * Sin dato no hay hueco: chips solo con `urgencias24h` / `tiempoLlegada`, estrellas solo con
 * `valoracion`, sello y acreditación solo con `acreditaciones`, WhatsApp solo con `whatsapp`.
 * Sello: junto al h1 en móvil (72 px) y columna derecha en escritorio (104 px).
 */
export function Hero({ negocio, contacto, valoracion, acreditacion }: Props) {
  const chips: string[] = [];
  if (contacto.urgencias24h) chips.push("Urgencias 24 h");
  if (contacto.tiempoLlegada) chips.push(`Llegamos en ${contacto.tiempoLlegada}`);

  const campo = acreditacion ? campoAcreditacion(acreditacion) : null;

  return (
    <section aria-labelledby="titulo-inicio" className="contenedor pt-5 pb-9 md:pt-16 md:pb-20">
      <div className="flex items-start gap-12">
        <div className="flex min-w-0 flex-1 flex-col gap-3.5">
          <div className={numeroSeccion}>01 —</div>

          <div className="flex items-start gap-3">
            <h1 id="titulo-inicio" className={cn(h1Inicio, "min-w-0 flex-1")}>
              {negocio.sector} en {contacto.direccion.ciudad}
            </h1>
            {campo && <Sello className="md:hidden" />}
          </div>

          <p className="m-0 max-w-[54ch] text-base leading-normal text-tinta-suave text-pretty md:text-[19px]">
            {negocio.descripcionCorta}
          </p>

          {chips.length > 0 && (
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {chips.map((chip) => (
                <li key={chip}>
                  <Badge variant="estado">{chip}</Badge>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-1 flex flex-col gap-2.5 md:flex-row md:items-center">
            <LlamadaCampo telefono={contacto.telefono} />
            {contacto.whatsapp && (
              <WhatsApp numero={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} variante="foto">
                Envíanos una foto de la avería
              </WhatsApp>
            )}
          </div>

          {valoracion && valoracion.total > 0 && (
            <p className="m-0 flex flex-wrap items-center gap-2 text-[15px]">
              <span aria-hidden="true" className="text-primario">
                ★
              </span>
              <span className="font-mono font-bold">
                {mediaVisible(valoracion.media)}
                <span className="sr-only"> de 5</span>
              </span>
              <span className="text-tinta-suave">· {totalResenas(valoracion.total)}</span>
            </p>
          )}

          {campo && (
            <p className="m-0 border-t border-regla pt-3 text-sm text-tinta-suave text-pretty md:hidden">
              {campo.detalle ? (
                <>
                  {campo.detalle} · n.º <span className="font-mono text-tinta [overflow-wrap:anywhere]">{campo.valor}</span>
                </>
              ) : (
                campo.valor
              )}
            </p>
          )}
        </div>

        {campo && (
          <div className="mt-10 hidden w-[272px] flex-none flex-col gap-5 border-l border-regla pl-8 md:flex">
            <Sello />
            <div className="flex flex-col gap-1">
              <span className={etiquetaCampo}>{campo.etiqueta}</span>
              <span className="font-mono text-[17px] leading-[1.3] font-bold [overflow-wrap:anywhere]">{campo.valor}</span>
              {campo.detalle && <span className="text-sm text-tinta-suave text-pretty">{campo.detalle}</span>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
