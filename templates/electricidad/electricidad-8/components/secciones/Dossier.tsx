import type { Acreditacion, SiteConfig } from "@andrei-leads/core";

import { LlamadaDossier, PresupuestoJunta, WhatsappLinea } from "@/components/Botones";
import { Rombo } from "@/components/Iconos";
import { H2, Rotulo } from "@/components/Rotulo";
import { anioActual } from "@/lib/anio";
import { numeroAcreditacion } from "@/lib/formato";
import { mensajeEdificio } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = {
  acreditaciones: readonly Acreditacion[];
  garantias: readonly string[];
  negocio: Pick<SiteConfig["negocio"], "nombre" | "nombreLegal" | "nif" | "anioFundacion" | "registroMercantil">;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h" | "mensajeWhatsapp">;
  /** Hay bloque `comunidades`: el pie de la hoja es `presupuesto-junta`. */
  comunidades: boolean;
  /** "habilitacion": versión corta (/servicios, /comunidades), solo el apartado de habilitación. */
  modo?: "completo" | "habilitacion";
  n?: string;
  /** Nivel de los títulos de apartado (h3 bajo el h2 de la banda). */
  className?: string;
};

/**
 * `Dossier` (estrella, encargo §6.2): banda noche con retícula y, dentro, una hoja de papel con
 * apartados numerados como un documento: 1. Habilitación, 2. Garantías, 3. Empresa. Los apartados
 * vacíos desaparecen y se renumeran; sin acreditaciones ni garantías queda «Empresa» (que siempre
 * tiene razón social y NIF). Al pie: `presupuesto-junta` (WhatsApp + comunidades), si no
 * `whatsapp-linea`, y sin WhatsApp `llamada-dossier`. Componente de servidor (los años salen de
 * `anioActual`, sin `new Date()` en el render).
 */
export async function Dossier({ acreditaciones, garantias, negocio, contacto, comunidades, modo = "completo", n, className }: Props) {
  const corto = modo === "habilitacion";
  if (corto && acreditaciones.length === 0) return null;

  const anio = await anioActual();
  const hayAcred = acreditaciones.length > 0;
  const hayGarantias = !corto && garantias.length > 0;
  const soloEmpresa = !hayAcred && !hayGarantias;
  const apartados = [hayAcred && "habilitacion", hayGarantias && "garantias", !corto && "empresa"].filter(Boolean) as string[];
  const num = (id: string) => `${apartados.indexOf(id) + 1}.`;

  const titulo = corto ? "Habilitación y seguros" : soloEmpresa ? "Datos de la empresa" : "Lo que el administrador presenta a la junta";
  const entradilla = corto
    ? "Los números que pide el administrador antes de contratar."
    : soloEmpresa
      ? "Los datos de la sociedad, para el presupuesto y la factura."
      : "Habilitación, garantías y datos de la sociedad en una sola hoja, para adjuntar al presupuesto.";

  const anios = negocio.anioFundacion ? anio - negocio.anioFundacion : undefined;
  const antiguedad =
    negocio.anioFundacion && anios !== undefined
      ? anios > 0
        ? `${anios} ${anios === 1 ? "año" : "años"} · desde ${negocio.anioFundacion}`
        : `Desde ${negocio.anioFundacion}`
      : undefined;
  const filasEmpresa = [
    { k: "Razón social", v: negocio.nombreLegal },
    { k: "NIF", v: negocio.nif },
    antiguedad && { k: "Antigüedad", v: antiguedad },
    negocio.registroMercantil && { k: "Registro", v: negocio.registroMercantil },
  ].filter(Boolean) as { k: string; v: string }[];

  const apartado = "border-t border-linea-plano pt-6 pb-2 first:border-t-0 first:pt-0";
  const tituloApartado = "font-titulo text-[1.375rem] font-normal";

  return (
    <section aria-labelledby="h2-dossier" className={cn("banda-noche", className)}>
      <div className="contenedor grid gap-8 py-14 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-4">
          <Rotulo n={n} texto={corto ? "Habilitación" : "Solvencia"} sobreNoche />
          <h2 id="h2-dossier" className={cn(H2, "mt-4")}>
            {titulo}
          </h2>
          <p className="mt-5 max-w-[34ch] text-[0.9375rem] text-noche-suave">{entradilla}</p>
        </div>

        <div className="bg-superficie px-5 py-7 text-texto [--color-foco:var(--color-texto)] sm:px-8 sm:py-10 lg:col-span-8 lg:px-12 lg:py-12">
          <p className="versalitas flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-texto pb-3 text-texto-suave">
            <span>Ficha de empresa</span>
            <span>{negocio.nombre}</span>
          </p>

          <div className="mt-6">
            {hayAcred && (
              <div data-aparecer="" className={apartado}>
                <h3 className={tituloApartado}>{num("habilitacion")} Habilitación</h3>
                <ul className="mt-4 border-t border-linea-plano">
                  {acreditaciones.map((a) => (
                    <li key={a.nombre} className="flex flex-col gap-1 border-b border-linea-plano py-3.5 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <span className="text-[1rem]">{a.nombre}</span>
                      {a.numero && <span className="cifras-antiguas shrink-0 font-titulo text-[1.125rem]">{numeroAcreditacion(a.numero)}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hayGarantias && (
              <div data-aparecer="" className={cn(apartado, "mt-6")}>
                <h3 className={tituloApartado}>{num("garantias")} Garantías</h3>
                <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                  {garantias.map((g) => (
                    <li key={g} className="flex items-baseline gap-3 border-t border-linea-plano py-3 text-[1rem]">
                      <Rombo className="-translate-y-0.5" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!corto && (
              <div data-aparecer="" className={cn(apartado, "mt-6")}>
                <h3 className={tituloApartado}>{num("empresa")} Empresa</h3>
                <dl className="mt-4">
                  {filasEmpresa.map((f) => (
                    <div key={f.k} className="grid gap-1 border-t border-linea-plano py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                      <dt className="versalitas pt-1 text-texto-suave">{f.k}</dt>
                      <dd className="text-[1rem]">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-linea-plano pt-6">
            {contacto.whatsapp && comunidades ? (
              <PresupuestoJunta numero={contacto.whatsapp} />
            ) : contacto.whatsapp ? (
              <WhatsappLinea numero={contacto.whatsapp} mensaje={mensajeEdificio(contacto)} />
            ) : (
              <LlamadaDossier contacto={contacto} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

