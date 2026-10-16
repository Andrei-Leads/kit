import type { Trabajo } from "@andrei-leads/core";

/** Testimonio del trabajo (Pantalla): tarjeta superficie de 20 px con la cita a 18 px y el autor en texto suave. */
export function TrabajoTestimonio({ testimonio }: { testimonio: NonNullable<Trabajo["testimonio"]> }) {
  return (
    <figure className="m-0 max-w-[64ch] rounded-tarjeta bg-superficie px-5 py-[18px]">
      <blockquote className="m-0">
        <p className="m-0 mb-2 text-[18px] leading-normal text-pretty">«{testimonio.texto}»</p>
      </blockquote>
      <figcaption className="text-[15px] text-texto-suave">{testimonio.autor}</figcaption>
    </figure>
  );
}
