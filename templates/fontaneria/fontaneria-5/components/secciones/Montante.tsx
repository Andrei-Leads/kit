import { cn } from "@/lib/utils";

/**
 * Montante vertical (móvil): «Salimos de {ciudad}» y la `<ol>` de municipios con una línea tinta de
 * 6 px a la izquierda y cada municipio como rama corta con su nodo (44 px de alto). Es la lista
 * accesible de la red. `max` recorta a los N primeros con «y N más ↓» (ancla a #zonas).
 */
export function Montante({
  ciudad,
  ramas,
  max,
  hrefMas = "#zonas",
  animada,
  className,
  conLista = true,
}: {
  ciudad: string;
  ramas: readonly string[];
  max?: number;
  hrefMas?: string;
  animada?: boolean;
  className?: string;
  /** false: solo el «Salimos de» (sin zonas). */
  conLista?: boolean;
}) {
  const visibles = max ? ramas.slice(0, max) : ramas;
  const mas = ramas.length - visibles.length;
  return (
    <div className={className}>
      <div className="flex h-11 items-center gap-2.5">
        <span aria-hidden="true" className="box-border size-[22px] flex-none border-4 border-tinta bg-primario" />
        <span className="text-xs leading-none font-semibold tracking-[0.12em] uppercase">Salimos de</span>
        <strong className="font-titulo text-[22px] leading-none font-bold">{ciudad}</strong>
      </div>
      {conLista && ramas.length > 0 && (
        <>
          <div className="relative ml-2">
            <span aria-hidden="true" data-montante={animada ? "" : undefined} className="absolute inset-y-0 left-0 w-1.5 bg-tinta" />
            <ol aria-label="Municipios donde trabajamos" className="m-0 list-none p-0 pl-1.5">
              {visibles.map((z) => (
                <li key={z} data-aparecer={animada ? "izquierda" : undefined} className="flex min-h-11 items-center">
                  <span aria-hidden="true" className="h-1 w-4 flex-none bg-tinta" />
                  <span aria-hidden="true" className="box-border size-[13px] flex-none rounded-full border-3 border-primario bg-white" />
                  <span className="ml-2.5 font-titulo text-[17px] leading-[1.15] font-semibold">{z}</span>
                </li>
              ))}
              {mas > 0 && (
                <li className="flex min-h-11 items-center">
                  <span aria-hidden="true" className="h-1 w-4 flex-none bg-tinta" />
                  <a
                    href={hrefMas}
                    className="ml-1.5 flex min-h-11 items-center font-titulo text-base leading-none font-semibold text-inherit underline decoration-2 underline-offset-4"
                  >
                    y {mas} más <span aria-hidden="true">&nbsp;↓</span>
                  </a>
                </li>
              )}
            </ol>
          </div>
          {!max && <span aria-hidden="true" className={cn("ml-0.5 block h-2 w-6 bg-tinta")} />}
        </>
      )}
    </div>
  );
}
