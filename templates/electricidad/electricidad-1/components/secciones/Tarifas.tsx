import type { Tarifas as DatosTarifas } from "@andrei-leads/core";

import { Regla } from "@/components/Regla";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { h2, seccionPlana } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  numero: string;
  tarifas: DatosTarifas;
  className?: string;
};

/**
 * Tarifas (Specs §2): tabla de documento, concepto a la izquierda y precio en mono a la derecha,
 * y la `nota` debajo. Solo con cifras validadas por el cliente (AGENTS.md §6). Sin `tarifas`, la
 * página ni la llama. Ocupa como máximo 820 px de ancho.
 */
export function Tarifas({ numero, tarifas, className }: Props) {
  return (
    <section aria-labelledby="titulo-tarifas" className={cn(seccionPlana, className)}>
      <div className="max-w-[820px]">
        <Regla numero={numero} etiqueta="Tarifas" />
        <h2 id="titulo-tarifas" className={cn(h2, "mt-5")}>
          Tarifas
        </h2>
        <Table aria-labelledby="titulo-tarifas" className="mt-5 border-b border-tinta">
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Concepto</TableHead>
              <TableHead scope="col" className="text-right">
                Precio
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tarifas.items.map((item) => (
              <TableRow key={`${item.concepto}-${item.precio}`}>
                <TableCell className="pr-4 leading-[1.4]">{item.concepto}</TableCell>
                <TableCell className="text-right font-mono font-bold whitespace-nowrap">{item.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {tarifas.nota && <p className="m-0 mt-3 text-sm text-tinta-suave text-pretty">{tarifas.nota}</p>}
      </div>
    </section>
  );
}
