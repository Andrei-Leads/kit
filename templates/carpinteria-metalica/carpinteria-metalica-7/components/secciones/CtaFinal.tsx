import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  /** El mensaje de la página (general, del servicio o del trabajo). */
  mensaje: string;
};

/**
 * CtaFinal (encargo §6): banda de hierro con corte diagonal arriba, «¿Qué necesitas forjar?» a
 * tamaño display y la pareja (`boton-chispa` + `boton-contorno-claro`). Entra de lado al hacer
 * scroll ([data-banda]). No sale en contacto, 404 ni legales.
 */
export function CtaFinal({ contacto, mensaje }: Props) {
  return (
    <section data-banda aria-labelledby="titulo-cta" className="hierro banda-arriba mt-[clamp(16px,3vw,40px)] pt-[calc(var(--diagonal)+36px)] pb-[clamp(40px,5vw,72px)]">
      <div className="contenedor">
        <h2 id="titulo-cta" className="display max-w-[12ch]">
          ¿Qué necesitas forjar?
        </h2>
        <p className="mt-3 max-w-[42ch] text-pretty text-texto-suave">
          {contacto.whatsapp
            ? "Mándanos una foto del sitio y una medida aproximada."
            : "Llámanos y cuéntanos qué pieza necesitas y dónde va."}
        </p>
        <Pareja contacto={contacto} mensaje={mensaje} sobre="hierro" className="mt-5" />
      </div>
    </section>
  );
}
