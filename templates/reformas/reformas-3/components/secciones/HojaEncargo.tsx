"use client";

import { useState, useSyncExternalStore } from "react";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";

type Props = {
  /** Títulos de los servicios (con 1 solo, la fila «Obra» no sale). */
  servicios: readonly string[];
  whatsapp: string;
  telefono: string;
  /** «600 00 03 03», ya formateado en el servidor. */
  telefonoVisible: string;
};

const VIVIENDA = ["Hasta 60 m²", "60–100 m²", "Más de 100 m²", "Solo una estancia"];
const INICIO = ["Ya", "Este trimestre", "Estoy comparando"];
const sinSuscripcion = () => () => {};

/**
 * Asistente «Hoja de encargo» (única isla de cliente del diseño): tres filas
 * Obra / Vivienda / Inicio con casillas `aria-pressed` (marcar otra vez
 * desmarca). Solo compone el `mensaje` de `BotonWhatsApp`: no guarda ni envía
 * nada. Sin JS (y hasta hidratar), cada casilla es un `BotonWhatsApp` con
 * esa sola opción en el mensaje, y el botón grande manda el mensaje base. Recibe los datos por props:
 * nunca importa site.config (no arrastra zod al navegador).
 */
export function HojaEncargo({ servicios, whatsapp, telefono, telefonoVisible }: Props) {
  const [marcado, setMarcado] = useState<Record<string, string | undefined>>({});
  const hidratado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const filas = [
    ...(servicios.length > 1 ? [{ clave: "obra", etiqueta: "Obra", opciones: servicios }] : []),
    { clave: "vivienda", etiqueta: "Vivienda", opciones: VIVIENDA },
    { clave: "inicio", etiqueta: "Inicio", opciones: INICIO },
  ];
  const componer = (m: Record<string, string | undefined>) => {
    const obra = servicios.length === 1 ? servicios[0] : m.obra;
    return (
      "Hola, quiero presupuesto." +
      (obra ? ` Obra: ${obra}.` : "") +
      (m.vivienda ? ` Vivienda: ${m.vivienda}.` : "") +
      (m.inicio ? ` Inicio: ${m.inicio}.` : "") +
      " Os mando fotos y plano si lo tengo."
    );
  };
  const mensaje = componer(marcado);

  return (
    <section aria-labelledby="titulo-hoja" className="contenedor pt-(--seccion)">
      <div className="max-w-[960px] border-2 border-borde">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 border-b-2 border-borde px-4 py-3.5">
          <h2 id="titulo-hoja" className="titulo-h2 m-0">
            Hoja de encargo
          </h2>
          <span className="text-[13px] text-texto-suave">Marca y envía. No guardamos nada.</span>
        </div>
        {filas.map((f) => (
          <div key={f.clave} className="flex flex-wrap border-b-2 border-borde">
            <div id={`hoja-${f.clave}`} className="condensada flex-[0_0_100%] px-4 pt-3.5 text-[22px] leading-none lg:flex-[0_0_180px] lg:border-r-2 lg:border-borde lg:pb-3.5">
              {f.etiqueta}
            </div>
            <div role="group" aria-labelledby={`hoja-${f.clave}`} className="flex flex-[1_1_240px] flex-wrap gap-1.5 px-4 py-3">
              {f.opciones.map((op) => {
                const on = marcado[f.clave] === op;
                const clase =
                  "inline-flex min-h-11 cursor-pointer items-center border-2 border-borde px-3.5 text-left text-[15px] leading-[1.1] font-medium no-underline focus-visible:outline-offset-2 " +
                  (on ? "bg-negro text-sobre-negro" : "bg-fondo text-texto hover:bg-superficie");
                return hidratado ? (
                  <button
                    key={op}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setMarcado((m) => ({ ...m, [f.clave]: m[f.clave] === op ? undefined : op }))}
                    className={clase}
                  >
                    {op}
                  </button>
                ) : (
                  <BotonWhatsApp key={op} numero={whatsapp} mensaje={componer({ [f.clave]: op })} className={clase}>
                    {op}
                  </BotonWhatsApp>
                );
              })}
            </div>
          </div>
        ))}
        <div className="p-4">
          <p className="etiqueta m-0 text-[13px] text-texto-suave">Mensaje que se envía</p>
          <p aria-live="polite" className="m-0 mt-1.5 mb-3.5 border-2 border-borde bg-superficie px-3.5 py-3 text-[15px] leading-[1.45]">
            {mensaje}
          </p>
          <div className="pareja">
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-principal boton-wa">
              <IconoWhatsapp className="size-5 flex-none" />
              Enviar hoja por WhatsApp
            </BotonWhatsApp>
            <BotonLlamada telefono={telefono} className="boton boton-secundario boton-contorno">
              <span>
                Llamar <span aria-hidden="true">·</span> <span className="whitespace-nowrap tabular-nums">{telefonoVisible}</span>
              </span>
            </BotonLlamada>
          </div>
        </div>
      </div>
    </section>
  );
}
