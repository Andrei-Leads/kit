/*
 * Horario estructurado (desde 0.4.0): franjas { dias, abre, cierra }.
 * Sirve para el JSON-LD (openingHoursSpecification) y, con
 * `formatearHorario`, para pintarlo como texto en el template.
 */

/** Días de la semana, en orden y sin tildes (valor del contrato). */
export const DIAS = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"] as const;

export type Dia = (typeof DIAS)[number];

export type FranjaHorario = { dias: Dia[]; abre: string; cierra: string };

/** Lo que pinta el template: la forma del horario anterior a 0.4.0. */
export type LineaHorario = { dias: string; horas: string };

const NOMBRES: Record<Dia, string> = {
  lunes: "lunes",
  martes: "martes",
  miercoles: "miércoles",
  jueves: "jueves",
  viernes: "viernes",
  sabado: "sábado",
  domingo: "domingo",
};

/** Para `dayOfWeek` del JSON-LD. */
export const DIAS_SCHEMA: Record<Dia, string> = {
  lunes: "https://schema.org/Monday",
  martes: "https://schema.org/Tuesday",
  miercoles: "https://schema.org/Wednesday",
  jueves: "https://schema.org/Thursday",
  viernes: "https://schema.org/Friday",
  sabado: "https://schema.org/Saturday",
  domingo: "https://schema.org/Sunday",
};

/** ["a", "b", "c"] → "a, b y c". Uso interno de core (no se exporta en index). */
export function listaY(lista: string[]): string {
  if (lista.length < 2) return lista.join("");
  return lista.slice(0, -1).join(", ") + " y " + lista[lista.length - 1];
}

/** "08:00" → "8:00". */
function hora(hhmm: string): string {
  return hhmm.replace(/^0(\d)/, "$1");
}

/** [lunes…viernes] → "lunes a viernes"; [lunes, miercoles, viernes] → "lunes, miércoles y viernes". */
function textoDias(indices: number[]): string {
  const partes: string[] = [];
  let i = 0;
  while (i < indices.length) {
    let j = i;
    while (j + 1 < indices.length && indices[j + 1] === indices[j] + 1) j++;
    if (j - i >= 2) {
      partes.push(`${NOMBRES[DIAS[indices[i]]]} a ${NOMBRES[DIAS[indices[j]]]}`);
    } else {
      for (let k = i; k <= j; k++) partes.push(NOMBRES[DIAS[indices[k]]]);
    }
    i = j + 1;
  }
  const texto = listaY(partes);
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/**
 * Agrupa los días que tienen las mismas franjas:
 * `{ dias: "Lunes a viernes", horas: "8:00–14:00 y 16:00–19:00" }`.
 * Los días sin franja (cerrado) no salen.
 */
export function formatearHorario(horario: FranjaHorario[]): LineaHorario[] {
  // Horas de cada día, ordenadas: "8:00–14:00 y 16:00–19:00".
  const porDia = DIAS.map((dia) => {
    const franjas = horario
      .filter((f) => f.dias.includes(dia))
      .map((f) => [f.abre, f.cierra] as const)
      .sort((a, b) => a[0].localeCompare(b[0]));
    return listaY(franjas.map(([abre, cierra]) => `${hora(abre)}–${hora(cierra)}`));
  });

  // Días con el mismo texto de horas, en el orden del primer día.
  const grupos = new Map<string, number[]>();
  porDia.forEach((horas, i) => {
    if (!horas) return;
    grupos.set(horas, [...(grupos.get(horas) ?? []), i]);
  });

  return [...grupos.entries()].map(([horas, indices]) => ({ dias: textoDias(indices), horas }));
}
