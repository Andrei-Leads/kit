"use client";

import { useState } from "react";
import { BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Props = {
  /** Solo los servicios a medida. */
  servicios: { titulo: string }[];
  whatsapp: string;
};

const UNIDADES = [
  { valor: "1", texto: "1", mensaje: "1 unidad" },
  { valor: "2-3", texto: "2–3", mensaje: "2–3 unidades" },
  { valor: "4+", texto: "4 o más", mensaje: "4 o más unidades" },
];

/** Compone el mensaje con lo elegido; si falta una respuesta, la omite. Siempre ≤ 200 caracteres. */
export function componerMensaje(servicio: string, unidades: string): string {
  const fin = ". Os envío una foto del hueco y medidas aproximadas:";
  let cuerpo = "Hola, quiero presupuesto";
  if (servicio) cuerpo += " de " + servicio.slice(0, 100);
  if (unidades) cuerpo += servicio ? " (" + unidades + ")" : " para " + unidades;
  if (!servicio && !unidades) cuerpo += " a medida";
  return cuerpo + fin;
}

const leyenda = "mb-2 p-0 text-[15px] font-bold";

/** Asistente de WhatsApp: dos preguntas con botones que solo componen el texto del mensaje. No guarda ni envía nada. */
export function AsistenteMedida({ servicios, whatsapp }: Props) {
  const [servicio, setServicio] = useState("");
  const [unidades, setUnidades] = useState("");

  const textoUnidades = UNIDADES.find((u) => u.valor === unidades)?.mensaje ?? "";
  const mensaje = componerMensaje(servicio, textoUnidades);

  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-md border-2 border-tinta bg-tarjeta p-[18px]">
      <h3 className="m-0 text-xl leading-[1.2] font-bold">Pide presupuesto por WhatsApp</h3>

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={leyenda}>¿Qué necesitas?</legend>
        <ToggleGroup type="single" value={servicio} onValueChange={setServicio}>
          {servicios.map((s) => (
            <ToggleGroupItem key={s.titulo} value={s.titulo} className="text-left">
              {s.titulo}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </fieldset>

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className={leyenda}>¿Cuántas unidades?</legend>
        <ToggleGroup type="single" value={unidades} onValueChange={setUnidades}>
          {UNIDADES.map((u) => (
            <ToggleGroupItem key={u.valor} value={u.valor} className="min-w-16 tabular-nums">
              {u.texto}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </fieldset>

      <p className="m-0 rounded-md bg-papel px-3 py-2.5 text-sm break-words whitespace-normal text-tinta-suave">{mensaje}</p>

      <BotonWhatsApp
        numero={whatsapp}
        mensaje={mensaje}
        className={buttonVariants({ variant: "whatsappAsistente" })}
      >
        <MessageCircle aria-hidden="true" className="size-5 flex-none" />
        <span>Envíanos una foto del hueco y medidas aproximadas</span>
      </BotonWhatsApp>
    </div>
  );
}
