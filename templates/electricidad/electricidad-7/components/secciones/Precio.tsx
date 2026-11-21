import { precioDesde } from "@andrei-leads/core";

/** Precio: «desde» en pequeño solo si el texto empieza por «desde»; si no, el texto tal cual. */
export function Precio({ texto, className }: { texto: string; className?: string }) {
  const p = precioDesde(texto);
  return (
    <span className={className}>
      {p.desde && (
        <>
          <span className="text-[0.8em] font-bold text-texto-suave uppercase">desde</span>{" "}
        </>
      )}
      {p.importe}
    </span>
  );
}
