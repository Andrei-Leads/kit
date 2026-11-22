import { BotonLlamada, minusculaInicial, type Servicio, type SiteConfig } from "@andrei-leads/core";

import { Encargo } from "@/components/Encargo";

type Props = {
  servicios: readonly Pick<Servicio, "titulo">[];
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensajeGeneral: string;
};

/**
 * Sección del asistente «Encargo» sobre `alterna` (el primario oscurecido). Envoltorio de servidor:
 * pasa props planas a la isla (nunca `site.config`) y pinta aquí «Prefiero llamar». Sin WhatsApp,
 * no existe.
 */
export function EncargoSeccion({ servicios, contacto, mensajeGeneral }: Props) {
  if (!contacto.whatsapp) return null;
  return (
    <section aria-labelledby="titulo-encargo" className="bg-alterna py-[clamp(40px,6vw,88px)]">
      <div className="contenedor">
        <h2 id="titulo-encargo" className="h2">
          Encarga tu pieza
        </h2>
        <p className="mt-2 max-w-[44ch] text-pretty">Tres preguntas y el mensaje queda listo para WhatsApp. No te pedimos datos.</p>
        <Encargo
          piezas={servicios.map((s) => ({ titulo: s.titulo, frase: minusculaInicial(s.titulo) }))}
          numero={contacto.whatsapp}
          mensajeGeneral={mensajeGeneral}
          llamada={
            <BotonLlamada telefono={contacto.telefono} className="boton boton-contorno-claro">
              Prefiero llamar
            </BotonLlamada>
          }
        />
      </div>
    </section>
  );
}
