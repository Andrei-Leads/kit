import config from "@/site.config";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { h1, lectura } from "@/lib/estilos";

/**
 * Inicio PROVISIONAL (fase 1: fundaciones). Solo el h1 «{sector} en {ciudad}» y el CTA final, para
 * comprobar layout, cabecera, barra combinada y pie. La fase 2 lo sustituye por el hero y las secciones.
 */
export default function Page() {
  const { negocio, contacto } = config;
  return (
    <>
      <section className="contenedor seccion-y">
        <h1 className={h1}>
          {negocio.sector} en {contacto.direccion.ciudad}
        </h1>
        <p className={`${lectura} mt-4 text-lg`}>{negocio.descripcionCorta}</p>
      </section>
      <CtaFinal contacto={contacto} />
    </>
  );
}
