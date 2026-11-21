import { Navegacion } from "@/components/Navegacion";

// Slot de la cabecera en una página legal: ninguna sección marcada (las legales no están en el menú).
// Hace falta igualmente: sin ella, al llegar desde otra página se quedaría marcada la anterior.
export default function Page() {
  return <Navegacion />;
}
