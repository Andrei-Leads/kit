import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { AsistenteMedida } from "@/components/secciones/AsistenteMedida";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FilaAveria } from "@/components/secciones/FilaAveria";
import { Resenas } from "@/components/secciones/Resenas";
import { h2Seccion, seccion } from "@/lib/estilos";
import { serviciosAMedida, serviciosAveria } from "@/lib/medida";
import { mensajeGeneral } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Averías y reparaciones" });

export default function Page() {
  const averias = serviciosAveria(config.servicios);
  const aMedida = serviciosAMedida(config.servicios);
  const { telefono, whatsapp } = config.contacto;

  return (
    <>
      <section className={seccion}>
        <div className="contenedor flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.015em] md:text-[56px]">
              Averías y reparaciones
            </h1>
            <p className="m-0 max-w-[52ch] text-tinta-suave">
              Elige qué se ha roto. Si no lo ves, llámanos y te decimos si podemos ir.
            </p>
          </div>

          {averias.length > 0 && (
            <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 lg:grid-cols-2 [&>li]:min-w-0">
              {averias.map((s) => (
                <li key={s.slug}>
                  <FilaAveria servicio={s} nivelTitulo="h2" variante="conFoto" />
                </li>
              ))}
            </ul>
          )}

          {aMedida.length > 0 && (
            <section id="a-medida" className="mt-3 flex flex-col gap-4 border-t border-linea pt-6">
              <div className="flex flex-col gap-1">
                <h2 className={h2Seccion}>A medida</h2>
                <p className="m-0 text-tinta-suave">También fabricamos e instalamos en nuestro taller.</p>
              </div>
              <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 [&>*]:min-w-0">
                <ul className="m-0 flex min-w-0 list-none flex-col gap-2.5 p-0 [&>li]:min-w-0">
                  {aMedida.map((s) => (
                    <li key={s.slug}>
                      <FilaAveria servicio={s} nivelTitulo="h3" />
                    </li>
                  ))}
                </ul>
                {whatsapp && <AsistenteMedida servicios={aMedida.map((s) => ({ titulo: s.titulo }))} whatsapp={whatsapp} />}
              </div>
            </section>
          )}
        </div>
      </section>

      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={config.contacto.fichaGoogle} />
      <CtaFinal telefono={telefono} whatsapp={whatsapp} mensaje={mensajeGeneral(config.contacto)} />
    </>
  );
}
