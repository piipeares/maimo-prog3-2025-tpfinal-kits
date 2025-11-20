"use client";

import { useEffect } from "react";
import { useKit } from "../app/context/KitContext";
import KitCard from "./KitCard";
import HeroContainer from "./HeroContainer";
import Link from "next/link";

export default function HomeContainer() {
  const { kits, loading, error, getKits } = useKit();

  useEffect(() => {
    getKits({ page: 1, limit: 4 });
  }, []);

  return (
    <main className="space-y-20 pb-20 scroll-smooth">
      
      <HeroContainer />

      <section id="novedades" className="mx-auto max-w-7xl px-6 space-y-12 pt-10">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">
            Novedades del Archivo
          </h2>
          <div className="h-1 w-24 bg-[#e5c07b] rounded-full" />
          <p className="text-neutral-400 max-w-lg">
            Las últimas incorporaciones a nuestra colección. Piezas únicas seleccionadas por nuestros curadores.
          </p>
        </div>

        {error && (
          <p className="text-center text-sm text-red-400">{error}</p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[500px] w-full animate-pulse rounded-3xl bg-neutral-900"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {kits.slice(0, 4).map((kit) => (
              <KitCard key={kit._id} kit={kit} />
            ))}
          </div>
        )}

        <div className="flex justify-center pt-2">
          <Link
            href="/kits"
            className="group flex items-center gap-3 rounded-full border border-neutral-700 px-10 py-4 text-sm font-bold uppercase tracking-widest text-neutral-300 transition-all hover:border-[#e5c07b] hover:text-[#e5c07b]"
          >
            Ver Colección Completa
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </section>

    </main>
  );
}