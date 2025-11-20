"use client";

import { useEffect, useState } from "react";
import { useKit } from "../app/context/KitContext";
import TeamCard from "./TeamCard";

const TEAM_TYPES = [
  { value: "", label: "Todos los equipos" },
  { value: "club", label: "Clubes" },
  { value: "national", label: "Selecciones" },
];

export default function TeamsContainer() {
  const { teams, loading, error, getTeams } = useKit();
  const [q, setQ] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getTeams({ page: 1, limit: 50, q, type });
  }, [q, type]);

  return (
    <main className="min-h-screen space-y-12 py-10">

      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between border-b border-neutral-800 pb-8">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tighter leading-none">
            Directorio de <span className="text-transparent [-webkit-text-stroke:1px_#e5c07b]">Equipos</span>
          </h1>
          <p className="text-neutral-400 text-sm md:text-base font-light max-w-lg leading-relaxed pl-4 border-l-2 border-[#e5c07b]">
            Navegá por la historia de los clubes y selecciones más importantes del mundo.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64 group">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar equipo..."
              className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 pl-10 text-sm text-white outline-none focus:border-[#e5c07b] transition-colors placeholder:text-neutral-600"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="absolute left-3 top-3.5 text-neutral-600 transition-colors group-focus-within:text-[#e5c07b]"
            >
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>

          <div className="relative w-full sm:w-48 group">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full appearance-none rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b] transition-colors cursor-pointer"
            >
              {TEAM_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none text-neutral-600 group-focus-within:text-[#e5c07b] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-400 text-center">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-40 w-full animate-pulse rounded-2xl bg-neutral-800 border border-neutral-700"
            />
          ))}
        </div>
      ) : teams.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-800 bg-neutral-900/20">
          <div className="mb-4 p-4 rounded-full bg-neutral-900 text-neutral-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <p className="text-lg font-medium text-white">No se encontraron equipos</p>
          <p className="text-sm text-neutral-500">Intenta cambiar los filtros de búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {teams.map((team) => (
            <TeamCard key={team._id} team={team} />
          ))}
        </div>
      )}
    </main>
  );
}