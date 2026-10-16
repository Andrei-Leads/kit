"use client";

import { useId, useState } from "react";

/**
 * Texto de una reseña con recorte a 4 líneas y «Leer más» (solo si `largo`, más de 170 caracteres).
 *
 * Sin JavaScript se lee entera: el recorte y el botón solo existen bajo `html.js` (globals.css,
 * `.resena-texto` / `.resena-mas`). El estado es solo `abierta`; el CSS hace el resto. Botón de ≥ 44 px.
 */
export function TextoResena({ texto, largo }: { texto: string; largo: boolean }) {
  const [abierta, setAbierta] = useState(false);
  const id = useId();

  return (
    <>
      <blockquote
        id={id}
        data-largo={largo}
        data-abierta={abierta}
        className="resena-texto m-0 text-base leading-normal text-pretty"
      >
        {texto}
      </blockquote>
      {largo && (
        <button
          type="button"
          aria-expanded={abierta}
          aria-controls={id}
          onClick={() => setAbierta((a) => !a)}
          className="resena-mas -mt-1 min-h-11 cursor-pointer items-center self-start bg-transparent p-0 text-[15px] font-semibold text-texto underline underline-offset-[3px]"
        >
          {abierta ? "Leer menos" : "Leer más"}
        </button>
      )}
    </>
  );
}
