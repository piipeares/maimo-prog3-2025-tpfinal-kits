export default function HeroContainer() {
  return (
    <section className="relative h-[85vh] w-screen left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] overflow-hidden">
      <img
        src="/museo.png"
        alt="Camisetas exhibidas"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.6] contrast-[1.1]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl space-y-12">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_#e5c07b] drop-shadow-[0_0_30px_rgba(229,192,123,0.3)]">
            KitRadar
          </h1>

          <p className="text-lg md:text-2xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            El archivo digital definitivo. Explorá la historia del fútbol a través de sus diseños más icónicos.
          </p>

          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/kits"
                className="group relative overflow-hidden rounded-full bg-[#e5c07b] px-12 py-5 text-lg font-bold text-black transition-transform hover:scale-105 shadow-[0_0_40px_rgba(229,192,123,0.4)]"
              >
                <span className="relative z-10 uppercase tracking-widest">Museo de Camisetas</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              <a
                href="/teams"
                className="group rounded-full border border-white/30 bg-black/30 backdrop-blur-md px-12 py-5 text-lg font-bold text-white transition-all hover:bg-white/10 hover:border-white/60"
              >
                <span className="uppercase tracking-widest">Explorar Equipos</span>
              </a>
            </div>
            
            <a 
              href="#novedades" 
              className="flex flex-col items-center gap-2 text-neutral-400 transition-colors hover:text-[#e5c07b] animate-bounce cursor-pointer"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-medium">Novedades</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}