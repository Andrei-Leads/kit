import { BotonLlamada } from "@andrei-leads/core";
import config from "@/site.config";

export default function Home() {
  const { negocio, contacto, servicios, resenas, zonas } = config;

  return (
    <main>
      <header className="bg-primario p-10 text-white">
        <h1 className="text-3xl font-bold">{negocio.nombre}</h1>
        <p>{negocio.descripcionCorta}</p>
        <BotonLlamada telefono={contacto.telefono} />
      </header>

      <section className="p-10">
        <h2 className="text-2xl font-bold">Servicios</h2>
        <ul>
          {servicios.map((s) => (
            <li key={s.titulo}>
              <strong>{s.titulo}</strong>: {s.descripcion}
            </li>
          ))}
        </ul>
      </section>

      {resenas.length > 0 && (
        <section className="p-10">
          <h2 className="text-2xl font-bold">Opiniones</h2>
        </section>
      )}

      {zonas.length > 0 && (
        <p className="p-10">Trabajamos en: {zonas.join(", ")}</p>
      )}
    </main>
  );
}