import type { Servicio, SiteConfig } from "@andrei-leads/core";

import { Migas } from "@/components/Migas";
import { LlamadaLinea, WhatsApp } from "@/components/BotonesContacto";
import { etiquetaCampo } from "@/lib/estilos";
import { minusculaInicial, precioDesde } from "@/lib/formato";
import { h1Guia } from "@/lib/guia";
import { mensajeServicio } from "@/lib/mensajes";

type Props = {
  servicio: Servicio;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  ciudad: string;
};

/**
 * Cabecera de la guía (Specs §6): banda de aviso fina (decorativa) y cabecera de documento sobre
 * `papel-2` con migas, h1 «{titulo} en {ciudad}», descripción, campo DESDE (solo con `precioDesde`;
 * etiqueta solo si el texto empieza por «desde», decisión 3), whatsapp-tramite (solo con WhatsApp,
 * con el mensaje del servicio) y llamada-linea. Es la única cabecera: sin `contenido` la
 * `descripcion` de aquí es todo el texto de la página.
 */
export function GuiaCabecera({ servicio, contacto, ciudad }: Props) {
  const precio = servicio.precioDesde ? precioDesde(servicio.precioDesde) : null;

  return (
    <section aria-label="Cabecera de la guía">
      <div aria-hidden="true" className="cinta-aviso" />
      <div className="border-b border-regla bg-papel-2">
        <div className="contenedor flex flex-col gap-4 pt-2 pb-7 md:pt-5 md:pb-12">
          <Migas
            items={[
              { href: "/", texto: "Inicio" },
              { href: "/servicios", texto: "Servicios" },
              { texto: servicio.titulo },
            ]}
          />
          <h1 className={h1Guia}>
            {servicio.titulo} en {ciudad}
          </h1>
          <p className="m-0 max-w-[56ch] text-[17px] text-tinta-cuerpo text-pretty md:text-xl">
            {servicio.descripcion}
          </p>
          {precio && (
            <div className="flex flex-col gap-0.5 self-start border border-regla bg-papel px-4 py-2.5">
              {precio.desde && <span className={etiquetaCampo}>Desde</span>}
              <span className="font-mono text-2xl leading-[1.2] font-bold">{precio.importe}</span>
            </div>
          )}
          <div className="mt-1 flex flex-col gap-2.5 md:flex-row md:items-center">
            {contacto.whatsapp && (
              <WhatsApp numero={contacto.whatsapp} mensaje={mensajeServicio(servicio)} variante="tramite">
                Pide presupuesto de {minusculaInicial(servicio.titulo)} por WhatsApp
              </WhatsApp>
            )}
            <LlamadaLinea telefono={contacto.telefono} />
          </div>
        </div>
      </div>
    </section>
  );
}
