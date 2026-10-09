export function BotonLlamada({ telefono }: { telefono: string }) {
  return (
    <a
      href={`tel:${telefono}`}
      className="inline-block rounded-full bg-orange-600 px-6 py-3 font-semibold text-white"
    >
      Llamar ahora
    </a>
  );
}