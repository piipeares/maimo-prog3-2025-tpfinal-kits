"use client";

import { useEffect } from "react";
import { useKit } from "../app/context/KitContext";
import KitCard from "./KitCard";

export default function TeamDetailContainer({ id }) {
  const { team, kits, loading, getTeamById, getKits } = useKit();

  useEffect(() => {
    getTeamById(id);
    getKits({ teamId: id });
  }, [id]);

  if (loading || !team) {
    return (
      <div className="space-y-8 py-10">
        <div className="h-64 w-full animate-pulse rounded-3xl bg-neutral-900" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
           {Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="h-56 w-full animate-pulse rounded-2xl bg-neutral-900" />
           ))}
        </div>
      </div>
    );
  }

  return (
    <main className="space-y-12 py-6">
      <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 px-6 py-12 text-center md:px-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0,rgba(229,192,123,0.15),transparent_70%)]" />
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative h-32 w-32 overflow-hidden rounded-full bg-neutral-950 p-4 shadow-[0_0_40px_rgba(229,192,123,0.2)] ring-1 ring-[#e5c07b]/30">
            {team.logo ? (
              <img
                src={team.logo}
                alt={team.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
                Sin Logo
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {team.name}
            </h1>
            <p className="text-lg text-[#e5c07b] font-medium uppercase tracking-widest">
              Colección
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-semibold text-neutral-100">
            Archivo del Club
          </h2>
          <span className="rounded-full bg-neutral-900 border border-neutral-800 px-3 py-1 text-xs text-neutral-400">
            {kits.length} Camisetas
          </span>
        </div>

        {kits.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {kits.map((kit) => (
              <KitCard key={kit._id} kit={kit} />
            ))}
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-neutral-800 text-neutral-500">
            No hay camisetas cargadas para este equipo todavía.
          </div>
        )}
      </section>
    </main>
  );
}