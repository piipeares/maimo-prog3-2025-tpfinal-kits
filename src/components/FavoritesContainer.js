"use client";

import { useFavorites } from "../app/context/FavoritesContext";
import KitCard from "./KitCard";
import Link from "next/link";

export default function FavoritesContainer() {
  const { favorites } = useFavorites();

  return (
    <main className="space-y-8 py-8">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-[#e5c07b]">Tus Favoritos</h1>
          <p className="text-sm text-neutral-400">
            Colección personal guardada en este dispositivo.
          </p>
        </div>
        <span className="rounded-full bg-neutral-800 px-4 py-1 text-xs font-bold text-neutral-300">
          {favorites.length} Items
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-800 py-24 text-center">
          <div className="mb-4 rounded-full bg-neutral-900 p-6 text-neutral-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <h3 className="text-lg font-medium text-white">Aún no tienes favoritos</h3>
          <p className="mt-2 max-w-xs text-sm text-neutral-500">
            Explora el catálogo y guarda las camisetas que más te gusten aquí.
          </p>
          <Link 
            href="/kits" 
            className="mt-6 rounded-xl bg-[#e5c07b] px-6 py-2.5 text-sm font-bold text-black hover:bg-[#cda55c] transition-colors"
          >
            Explorar Camisetas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {favorites.map((kit) => (
            <KitCard key={kit._id} kit={kit} />
          ))}
        </div>
      )}
    </main>
  );
}