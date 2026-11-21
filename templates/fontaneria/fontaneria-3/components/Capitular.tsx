import { cn } from "@/lib/utils";

/**
 * Párrafos en columna de 62 caracteres; el primero con capitular cursiva en
 * primario. La capitular y el resto de la primera palabra van con aria-hidden y
 * la palabra entera en sr-only, para que el lector no lea «U na».
 */
export function Capitular({ parrafos, className }: { parrafos: readonly string[]; className?: string }) {
  if (parrafos.length === 0) return null;
  const [primero, ...resto] = parrafos;
  const palabra = primero.split(/\s/, 1)[0];
  return (
    <div className={cn("max-w-[62ch]", className)}>
      <p className="m-0">
        <span
          aria-hidden="true"
          className="float-left mt-[0.06em] mr-[0.1em] -ml-[0.02em] font-titulo text-[4.4em] leading-[0.82] font-medium text-primario-texto italic"
        >
          {palabra.charAt(0)}
        </span>
        <span aria-hidden="true">{palabra.slice(1)}</span>
        <span className="sr-only">{palabra}</span>
        {primero.slice(palabra.length)}
      </p>
      {resto.map((p, i) => (
        <p key={i} className="mt-[1.1em] mb-0">
          {p}
        </p>
      ))}
    </div>
  );
}
