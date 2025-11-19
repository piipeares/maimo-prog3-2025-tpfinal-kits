"use client";

import { useEffect } from "react";
import { useKit } from "../app/context/KitContext";
import KitDiscussion from "./KitDiscussion.js";

export default function KitDetailContainer({ id }) {
  const { kit, loading, error, getKitById } = useKit();

  useEffect(() => {
    getKitById(id);
  }, [id]);

  if (error) {
    return (
      <main className="py-8">
        <p className="text-sm text-red-400">{error}</p>
      </main>
    );
  }

  if (loading || !kit) {
    return (
      <main className="py-8">
        <div className="h-72 w-full animate-pulse rounded-2xl bg-neutral-800" />
      </main>
    );
  }

  const label = `${kit.season || ""} ${kit.type ? `• ${kit.type.toUpperCase()}` : ""}`;

  return (
    <main className="space-y-10 py-8">
      <section className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0,rgba(229,192,123,0.15),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(229,192,123,0.2),transparent_55%)]" />
            {kit.images?.[0] && (
              <img
                src={kit.images[0]}
                alt={kit.code || kit.season}
                className="relative z-10 h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {(kit.tags || []).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs text-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
            {label}
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-neutral-50">
            {kit.supplier || "Proveedor desconocido"}
            {kit.sponsor ? ` • ${kit.sponsor}` : ""}
          </h1>
          {kit.code && (
            <p className="text-sm text-neutral-400">
              Código de producto: {kit.code}
            </p>
          )}
          {kit.notes && (
            <p className="text-sm leading-relaxed text-neutral-200">
              {kit.notes}
            </p>
          )}
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-neutral-300">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                Temporada
              </p>
              <p>{kit.season || "N/D"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                Tipo
              </p>
              <p>{kit.type ? kit.type.toUpperCase() : "N/D"}</p>
            </div>
          </div>
        </aside>
      </section>

      <KitDiscussion kitId={id} />
    </main>
  );
}