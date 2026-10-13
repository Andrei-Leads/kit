"use client";

import Link from "next/link";
import { useState } from "react";
import type { Imagen } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type TrabajoLista = {
  slug: string;
  titulo: string;
  /** «Ubicación · duración», solo con lo que exista. */
  meta: string;
  imagen: Imagen;
  conAntes: boolean;
  /** Slug del servicio al que pertenece, si lo tiene. */
  servicio?: string;
};

type Props = {
  trabajos: TrabajoLista[];
  /** Servicios que tienen trabajos; el filtro solo sale con 2 o más. */
  filtros: { slug: string; titulo: string }[];
};

/** Rejilla de tarjetas de trabajos con filtro por servicio (estado local, sin URL). */
export function RejillaTrabajos({ trabajos, filtros }: Props) {
  const [filtro, setFiltro] = useState("todos");
  const visibles = filtro === "todos" ? trabajos : trabajos.filter((t) => t.servicio === filtro);

  return (
    <div className="flex flex-col gap-5">
      {filtros.length >= 2 && (
        <ToggleGroup
          type="single"
          value={filtro}
          onValueChange={(valor) => {
            if (valor) setFiltro(valor);
          }}
          aria-label="Filtrar por servicio"
        >
          <ToggleGroupItem value="todos">Todos</ToggleGroupItem>
          {filtros.map((f) => (
            <ToggleGroupItem key={f.slug} value={f.slug}>
              {f.titulo}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
      <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
        {visibles.map((t) => (
          <li key={t.slug} className="flex">
            <Link
              href={`/trabajos/${t.slug}`}
              className="flex w-full flex-col overflow-hidden rounded-md border-2 border-tinta bg-tarjeta text-tinta no-underline shadow-placa hover:bg-papel"
            >
              <Foto
                imagen={t.imagen}
                proporcion="4/3"
                sizes="(min-width: 1120px) 360px, (min-width: 768px) 33vw, 100vw"
                decorativa
                className="rounded-none"
              >
                {t.conAntes && (
                  <span className="absolute top-2 right-2 rounded-sm bg-white px-[7px] py-[5px] text-xs leading-none font-bold text-tinta">
                    Antes / después
                  </span>
                )}
              </Foto>
              <span className="flex flex-col gap-1 px-4 pt-3.5 pb-4">
                <h2 className="m-0 text-[19px] leading-tight font-bold">{t.titulo}</h2>
                {t.meta && <span className="text-[15px] text-tinta-suave">{t.meta}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
