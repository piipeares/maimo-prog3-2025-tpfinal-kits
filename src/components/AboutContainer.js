export default function AboutContainer() {
  return (
    <main className="space-y-14 py-10">

      <section className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[#e5c07b]">
          Sobre KitRadar
        </h1>

        <p className="text-neutral-300 text-lg leading-relaxed">
          KitRadar es una exhibición digital dedicada a preservar, explorar y 
          celebrar la estética del fútbol a través de sus camisetas. Cada modelo 
          cuenta una historia: identidad de un club, momentos históricos, 
          transformaciones culturales y decisiones de diseño que marcaron épocas.
        </p>

        <p className="text-neutral-300 text-lg leading-relaxed">
          El proyecto reúne información organizada por equipo, temporada y tipo 
          de camiseta, permitiendo navegar una colección presentada con el cuidado 
          de un archivo visual. La intención es capturar la esencia del diseño 
          deportivo, desde lo clásico hasta lo contemporáneo.
        </p>

        <p className="text-neutral-300 text-lg leading-relaxed">
          Desarrollado como trabajo final de Programación Multimedial III, el sitio 
          integra Next.js para el frontend y Express con MongoDB en el backend, 
          priorizando rendimiento, estructura clara y una experiencia visual pulida.
        </p>
      </section>

      <section className="space-y-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#e5c07b]">
          Misión del Proyecto
        </h2>

        <p className="text-neutral-300 text-lg leading-relaxed">
          Crear un espacio accesible y atractivo donde aficionados, coleccionistas 
          y diseñadores puedan apreciar el valor cultural y estético de las 
          camisetas de fútbol. Un archivo que funcione tanto como referencia 
          visual como fuente de inspiración.
        </p>
      </section>

      <section className="space-y-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#e5c07b]">
          Qué Podés Encontrar
        </h2>

        <ul className="text-neutral-300 text-lg space-y-2 leading-relaxed">
          <li>• Camisetas clasificadas por equipo y temporada</li>
          <li>• Identificación de tipo (home, away, third, GK)</li>
          <li>• Datos de diseño: proveedor, sponsor, código, notas</li>
          <li>• Presentación visual cuidada, estilo catálogo de museo</li>
        </ul>
      </section>

    </main>
  );
}