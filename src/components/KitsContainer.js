"use client";

import { useEffect, useState } from "react";
import { useKit } from "../app/context/KitContext";
import SectionHeader from "./SectionHeader";
import SearchBar from "./SearchBar";
import KitCard from "./KitCard";

const TYPES = [
  { value: "", label: "Todos los tipos" },
  { value: "home", label: "Home" },
  { value: "away", label: "Away" },
  { value: "third", label: "Third" },
  { value: "gk", label: "Arquero" },
];

export default function KitsContainer() {
  const { kits, loading, error, getKits } = useKit();
  const [q, setQ] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getKits({ page: 1, limit: 24, q, type });
  }, [q, type, getKits]);

  return (
    <main className="space-y-8 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <SectionHeader title="Archivo de camisetas" />
          <p className="text-sm text-neutral-400">
            Filtrá por tipo o buscá por temporada, proveedor o sponsor.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            value={q}
            onChange={setQ}
            placeholder="Buscar por temporada, proveedor o sponsor"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none sm:w-40"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="h-56 w-full animate-pulse rounded-2xl bg-neutral-800"
            />
          ))}
        </div>
      ) : kits.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-950/60">
          <p className="text-sm text-neutral-400">
            No se encontraron camisetas con esos filtros.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {kits.map((kit) => (
            <KitCard key={kit._id} kit={kit} />
          ))}
        </div>
      )}
    </main>
  );
}