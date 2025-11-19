"use client";

import { useEffect } from "react";
import { useKit } from "../app/context/KitContext";
import SectionHeader from "./SectionHeader";
import KitCard from "./KitCard";
import HeroContainer from "./HeroContainer";

export default function HomeContainer() {
  const { kits, loading, error, getKits } = useKit();

  useEffect(() => {
    getKits({ page: 1, limit: 8 });
  }, []);

  return (
    <main className="space-y-10">

      <HeroContainer />

      <section>
        <SectionHeader title="Novedades" />

        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}

        {loading ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-48 w-full animate-pulse rounded-xl bg-neutral-800"
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kits.map((kit) => (
              <KitCard key={kit._id} kit={kit} />
            ))}
          </div>
        )}
      </section>

    </main>
  );
}