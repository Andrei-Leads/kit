/*
 * Formato propio del diseño «Comunidades y fincas». Lo común (teléfono visible, media, horario…)
 * viene de core; aquí solo lo que pinta este template. Solo para componentes de servidor.
 */
import { formatearHorario, hayTrabajos, mediaVisible, MESES, type SiteConfig } from "@andrei-leads/core";

/** 1 → "01": números de sección, de servicio y de zona, como en un plano. */
export function dosCifras(n: number): string {
  return String(n).padStart(2, "0");
}

/** «Llamar 24 h» con urgencias24h; si no, «Llamar». */
export function textoLlamar(contacto: Pick<SiteConfig["contacto"], "urgencias24h">): string {
  return contacto.urgencias24h ? "Llamar 24 h" : "Llamar";
}

/** Fecha de reseña en versalitas: "2026-10-28" → "28 oct 2026"; "2026-09" → "sept 2026". */
export function fechaCorta(fecha: string): string {
  const [anio, mes, dia] = fecha.split("-");
  const nombre = MESES[Number(mes) - 1];
  if (!anio || !nombre) return fecha;
  const corto = nombre === "septiembre" ? "sept" : nombre.slice(0, 3);
  return [dia ? String(Number(dia)) : "", corto, anio].filter(Boolean).join(" ");
}

/** Una cifra de credibilidad: el número grande y su rótulo. Solo existe con dato. */
export type Cifra = { valor: string; rotulo: string };

/** «Desde 2004», «4,6 de 88 reseñas», «12 municipios», «Llegamos en 50 min» (encargo §5). */
export function cifrasCredibilidad(config: {
  negocio: Pick<SiteConfig["negocio"], "anioFundacion">;
  valoracion?: SiteConfig["valoracion"];
  zonas: readonly string[];
  contacto: Pick<SiteConfig["contacto"], "tiempoLlegada">;
}): Cifra[] {
  const lista: Cifra[] = [];
  if (config.negocio.anioFundacion) lista.push({ valor: String(config.negocio.anioFundacion), rotulo: "Año de fundación" });
  if (config.valoracion)
    lista.push({
      valor: mediaVisible(config.valoracion.media),
      rotulo: `De 5 en ${config.valoracion.total} ${config.valoracion.total === 1 ? "reseña" : "reseñas"}`,
    });
  if (config.zonas.length > 0)
    lista.push({ valor: String(config.zonas.length), rotulo: config.zonas.length === 1 ? "Municipio" : "Municipios" });
  if (config.contacto.tiempoLlegada) lista.push({ valor: config.contacto.tiempoLlegada, rotulo: "Tiempo de llegada" });
  return lista;
}

/** Elemento de la franja superior: un texto y, si hay, su número en `noche-suave`. */
export type ItemFranja = { texto: string; numero?: string };

/**
 * Franja superior (encargo §5, «Doble barra»). Escritorio: acreditación con número + primera garantía;
 * sin acreditaciones, la garantía; sin ninguna de las dos, las filas del horario. Móvil: solo la
 * acreditación o, sin acreditaciones, la primera fila del horario.
 */
export function franja(config: Pick<SiteConfig, "acreditaciones" | "garantias" | "contacto">): {
  escritorio: ItemFranja[];
  movil: ItemFranja;
} {
  const horario = formatearHorario(config.contacto.horario).map((l) => ({ texto: `${l.dias} · ${l.horas}` }));
  const [acreditacion] = config.acreditaciones;
  const [garantia] = config.garantias;
  const itemAcred = acreditacion && { texto: acreditacion.nombre, numero: acreditacion.numero && numeroAcreditacion(acreditacion.numero) };
  const escritorio: ItemFranja[] = [];
  if (itemAcred) escritorio.push(itemAcred);
  if (garantia) escritorio.push({ texto: garantia });
  const movil = itemAcred ?? horario[0];
  return { escritorio: escritorio.length > 0 ? escritorio : horario.slice(0, 2), movil };
}

/** Página del menú (la actual se marca con aria-current en el servidor). */
export type IdPagina = "inicio" | "servicios" | "comunidades" | "contacto" | "trabajos" | "empresa";
export type PaginaMenu = { id: IdPagina; href: string; texto: string };

/** Orden de urgencias (brief §6) con Comunidades tras Servicios (encargo §5). Cada una, solo con datos. */
export function paginasMenu(config: Pick<SiteConfig, "trabajos" | "galeria" | "comunidades">): PaginaMenu[] {
  const lista: PaginaMenu[] = [
    { id: "inicio", href: "/", texto: "Inicio" },
    { id: "servicios", href: "/servicios", texto: "Servicios" },
  ];
  if (config.comunidades) lista.push({ id: "comunidades", href: "/comunidades", texto: "Comunidades" });
  lista.push({ id: "contacto", href: "/contacto", texto: "Contacto" });
  if (hayTrabajos(config)) lista.push({ id: "trabajos", href: "/trabajos", texto: "Trabajos" });
  lista.push({ id: "empresa", href: "/empresa", texto: "Empresa" });
  return lista;
}

/** Secciones presentes (los `false` se quitan) con su número de orden «01», «02»… */
export function numerar<T extends string>(ids: (T | false | undefined | null)[]): (id: T) => string {
  const presentes = ids.filter((x): x is T => Boolean(x));
  return (id) => {
    const i = presentes.indexOf(id);
    return i < 0 ? "" : dosCifras(i + 1);
  };
}

/** «46/IBTE/0137» → «n.º 46/IBTE/0137»; un número que ya trae su palabra («Póliza…») se deja igual. */
export function numeroAcreditacion(numero: string): string {
  return /^[0-9]/.test(numero) ? `n.º ${numero}` : numero;
}

/** Meta description: ≤ 160 caracteres sin partir palabras (como hace core con las suyas). */
export function resumen(texto: string, max = 160): string {
  if (texto.length <= max) return texto;
  const corte = texto.slice(0, max - 1);
  return corte.slice(0, corte.lastIndexOf(" ")).replace(/[,;:.]$/, "") + "…";
}
