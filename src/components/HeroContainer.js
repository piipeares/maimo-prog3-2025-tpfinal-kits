export default function HeroContainer() {
  return (
    <section className="relative h-[80vh] w-screen left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] overflow-hidden">
      <img
        src="/museo.png"
        alt="Camisetas exhibidas"
        className="absolute inset-0 h-full w-full object-cover brightness-[1.25] contrast-[1.15] saturate-[1.25]"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      <div className="relative z-10 h-full flex items-center px-10 md:px-24">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tight text-transparent [-webkit-text-stroke-width:3px] [-webkit-text-stroke-color:#e5c07b] drop-shadow-[0_0_18px_rgba(229,192,123,0.45)]">
            KitRadar
          </h1>

          <p className="text-[#e5c07b] text-lg md:text-2xl max-w-lg opacity-90">
            Una exhibición digital de camisetas icónicas. Historia, diseño y
            pasión en su máxima expresión.
          </p>

          <div className="flex gap-4 pt-2">
            <a
              href="/kits"
              className="rounded-xl bg-[#e5c07b] text-black px-6 py-2.5 text-sm font-semibold shadow-[0_0_18px_rgba(229,192,123,0.65)] hover:scale-105 transition"
            >
              Explorar Kits
            </a>

            <a
              href="/teams"
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-[#e5c07b] border border-[#e5c07b]/60 backdrop-blur-md bg-black/40 hover:bg-[#e5c07b]/10 hover:scale-105 transition"
            >
              Ver Equipos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}