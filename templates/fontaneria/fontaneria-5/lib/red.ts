/*
 * RedZonas: cálculo de la red de tuberías (se ejecuta en el servidor al compilar).
 *
 * Entrada: la ciudad del taller (nodo origen) y `zonas` (sin repetir la ciudad).
 * Salida: tramos de troncal, ramas con su nodo y nombre partido en líneas, y el bloque
 * «Salimos de {ciudad}» con la placa de tiempo. No hay geografía: es un esquema, como un plano
 * de metro. La troncal sale del origen hacia la derecha y cada `paso` px deriva una rama en codo
 * hacia abajo o hacia arriba, alternando. Cada `porFila` ramas, la troncal hace un codo de 180°
 * y vuelve en otra línea (serpentín). Con 1–3 zonas, las ramas son más largas.
 */

export type Tramo = {
  d: string;
  /** Sentido en el que se dibuja (para la animación). */
  sentido: "derecha" | "izquierda" | "baja";
};

export type Rama = {
  /** Punto de la troncal. */
  x: number;
  y: number;
  /** Extremo de la rama (donde está el nodo). */
  ny: number;
  baja: boolean;
  /** Nombre partido en líneas de 14 caracteres como máximo, con su `y`. */
  lineas: { texto: string; y: number }[];
};

export type Red = {
  ancho: number;
  alto: number;
  tramos: Tramo[];
  ramas: Rama[];
  /** Tapón del final de la troncal (solo si hay ramas). */
  tapon?: { x: number; y: number };
  origen: { x: number; y: number };
  ciudad: { texto: string; y: number }[];
  salimosY: number;
  placa?: { y: number; tiempo: string };
  /** 1–3 ramas: se centra. */
  centrada: boolean;
};

/** Parte un nombre en líneas de `max` caracteres sin cortar palabras. */
export function partir(nombre: string, max: number): string[] {
  const lineas: string[] = [];
  let actual = "";
  for (const palabra of nombre.split(/\s+/).filter(Boolean)) {
    if (!actual) actual = palabra;
    else if ((actual + " " + palabra).length <= max) actual += " " + palabra;
    else {
      lineas.push(actual);
      actual = palabra;
    }
  }
  if (actual) lineas.push(actual);
  return lineas;
}

type Opciones = {
  ciudad: string;
  zonas: readonly string[];
  /** Separación entre ramas (160 en la sección Zonas, 104 en el hero). */
  paso: number;
  /** Ramas por vuelta (7 en Zonas, 5 en el hero). */
  porFila: number;
  tiempo?: string;
};

const ALTO_LINEA = 19;
const TAM_NOMBRE = 16;

export function calcularRed({ ciudad, zonas, paso, porFila, tiempo }: Opciones): Red {
  const z = zonas.filter((n) => n !== ciudad);
  const n = z.length;
  const largoRama = n > 0 && n <= 3 ? 72 : 40;
  const por = Math.max(1, Math.min(porFila, n || 1));
  const filas = Math.max(1, Math.ceil(n / por));
  const ox = 28;
  const xPrimera = ox + 120;
  const xUltima = xPrimera + (por - 1) * paso;
  const xDerecha = xUltima + 72;
  const xIzquierda = xPrimera - 72;
  const ciudadLineas = partir(ciudad, 12);
  const altoBloque = (tiempo ? 50 : 0) + 22 + ciudadLineas.length * 32 + 22;
  const arriba = Math.max(altoBloque, largoRama + 72) + 10;
  const separacion = 2 * (largoRama + 72) + 28;
  const yFila = (f: number) => arriba + f * separacion;

  const tramos: Tramo[] = [];
  const ramas: Rama[] = [];
  let finX = ox + 150;
  let finY = arriba;

  if (n === 0) tramos.push({ d: `M${ox} ${arriba} H${ox + 150}`, sentido: "derecha" });

  for (let f = 0; f < filas && n > 0; f++) {
    const y = yFila(f);
    const dir = f % 2 ? -1 : 1;
    const cuantas = Math.min(por, n - f * por);
    const ultima = f === filas - 1;
    const xRanura = (k: number) => (dir === 1 ? xPrimera + k * paso : xPrimera + (por - 1 - k) * paso);
    const x0 = f === 0 ? ox : dir === 1 ? xIzquierda : xDerecha;
    const x1 = ultima ? xRanura(cuantas - 1) + dir * 44 : dir === 1 ? xDerecha : xIzquierda;
    if (f > 0) tramos.push({ d: `M${x0} ${yFila(f - 1)} V${y}`, sentido: "baja" });
    tramos.push({ d: `M${x0} ${y} H${x1}`, sentido: x1 > x0 ? "derecha" : "izquierda" });
    for (let k = 0; k < cuantas; k++) {
      const i = f * por + k;
      const x = xRanura(k);
      const baja = i % 2 === 0;
      const ny = baja ? y + largoRama : y - largoRama;
      const partes = partir(z[i], 14);
      const lineas = partes.map((texto, j) => ({
        texto,
        y: baja ? ny + 6 + 10 + TAM_NOMBRE + j * ALTO_LINEA : ny - 6 - 10 - (partes.length - 1 - j) * ALTO_LINEA,
      }));
      ramas.push({ x, y, ny, baja, lineas });
    }
    if (ultima) {
      finX = x1;
      finY = y;
    }
  }

  const ancho = Math.max(xDerecha + 8, ox + 230);
  const alto = yFila(filas - 1) + largoRama + 72 + 10;
  const baseCiudad = arriba - 26;
  const ciudadY = ciudadLineas.map((texto, j) => ({ texto, y: baseCiudad - (ciudadLineas.length - 1 - j) * 32 }));
  const salimosY = baseCiudad - (ciudadLineas.length - 1) * 32 - 34;

  return {
    ancho,
    alto,
    tramos,
    ramas,
    tapon: n > 0 ? { x: finX, y: finY } : undefined,
    origen: { x: ox, y: arriba },
    ciudad: ciudadY,
    salimosY,
    placa: tiempo ? { y: salimosY - 18 - 34, tiempo } : undefined,
    centrada: n > 0 && n <= 3,
  };
}
