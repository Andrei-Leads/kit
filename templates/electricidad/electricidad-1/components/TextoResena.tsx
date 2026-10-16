"use client";

import { useId, useState } from "react";

/**
 * Texto de una reseña con recorte a 5 líneas y «Leer más» (solo si `largo`, más de 240 caracteres).
 *
 * Sin JavaScript se lee entera: el recorte y el botón solo existen bajo `html.js` (globals.css,
 * `.resena-texto` / `.resena-mas`). El estado es solo `abierta`; el CSS hace el resto.
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
        className="resena-texto m-0 text-base leading-[1.55] text-pretty"
      >
        {texto}
      </blockquote>
      {largo && (
        <button
          type="button"
          aria-expanded={abierta}
          aria-controls={id}
          onClick={() => setAbierta((a) => !a)}
          className="resena-mas min-h-11 cursor-pointer items-center self-start bg-transparent p-0 font-bold text-tinta underline underline-offset-4"
        >
          {abierta ? "Leer menos" : "Leer más"}
        </button>
      )}
    </>
  );
}
