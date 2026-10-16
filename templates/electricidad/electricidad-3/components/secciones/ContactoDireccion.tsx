import type { SiteConfig } from "@andrei-leads/core";

import { urlComoLlegar } from "@/lib/formato";

const enlace =
  "inline-flex min-h-11 items-center gap-1 font-semibold text-texto underline underline-offset-4 hover:decoration-2";

/**
 * Dirección de /contacto (Pantalla): tarjeta superficie con la dirección y los enlaces «Cómo llegar ↗» (siempre,
 * a Google Maps con las coordenadas o la dirección) y «Ver ficha en Google ↗» (solo con `fichaGoogle`). Son
 * ENLACES: nunca un mapa ni un iframe (la política de cookies declara que no hay terceros). Se abren en otra
 * pestaña y lo dicen a los lectores de pantalla.
 */
export function ContactoDireccion({
  contacto,
}: {
  contacto: Pick<SiteConfig["contacto"], "direccion" | "coordenadas" | "fichaGoogle">;
}) {
  const { direccion, fichaGoogle } = contacto;
  return (
    <section aria-labelledby="titulo-direccion" className="rounded-tarjeta bg-superficie px-5 py-4">
      <h2 id="titulo-direccion" className="m-0 mb-1.5 text-xl font-bold">
        Dirección
      </h2>
      <p className="m-0 mb-2.5 text-base leading-normal">
        {direccion.calle}
        <br />
        {direccion.cp} {direccion.ciudad}
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener noreferrer" className={enlace}>
          Cómo llegar <span aria-hidden="true">↗</span>
          <span className="sr-only"> (se abre en otra pestaña)</span>
        </a>
        {fichaGoogle && (
          <a href={fichaGoogle} target="_blank" rel="noopener noreferrer" className={enlace}>
            Ver ficha en Google <span aria-hidden="true">↗</span>
            <span className="sr-only"> (se abre en otra pestaña)</span>
          </a>
        )}
      </div>
    </section>
  );
}
