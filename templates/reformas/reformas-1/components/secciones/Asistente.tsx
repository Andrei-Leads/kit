import { minusculaInicial, type SiteConfig } from "@andrei-leads/core";

import { AsistenteReforma } from "@/components/secciones/AsistenteReforma";

/**
 * Sección del asistente (tablero Asistente): texto a la izquierda (5/12) y las preguntas a la
 * derecha (7/12) sobre `alterna`. Componente de servidor: pasa los datos como props a la isla.
 * Sin WhatsApp, no existe (encargo §6.7).
 */
export function Asistente({ servicios, whatsapp }: { servicios: SiteConfig["servicios"]; whatsapp?: string }) {
  if (!whatsapp) return null;
  return (
    <section aria-labelledby="titulo-asistente" className="bg-alterna">
      <div className="contenedor seccion grid items-start gap-[clamp(24px,4vw,72px)] lg:grid-cols-[5fr_7fr]">
        <div>
          <p className="versalitas mb-3.5">Presupuesto</p>
          <h2 id="titulo-asistente" className="titulo-seccion">
            {servicios.length === 1 ? "Dos" : "Tres"} preguntas y <em>te contestamos</em> por WhatsApp.
          </h2>
          <p className="mt-4 max-w-[36ch] text-texto-suave">
            No pedimos nombre ni correo. Solo preparamos el mensaje y lo envías tú por WhatsApp.
          </p>
        </div>
        <AsistenteReforma servicios={servicios.map((s) => ({ titulo: s.titulo, enFrase: minusculaInicial(s.titulo) }))} numero={whatsapp} />
      </div>
    </section>
  );
}
