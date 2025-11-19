"use client";

import { useState } from "react";

export default function KitDiscussion({ kitId }) {
  const [entries, setEntries] = useState([
    {
      id: "1",
      author: "Anónimo",
      message: "Me encanta este template, tiene vibra clásica.",
      createdAt: "Hace 2 horas",
    },
    {
      id: "2",
      author: "Coleccionista",
      message: "La calidad de tela de esta versión es mejor que el relanzamiento.",
      createdAt: "Hace 30 minutos",
    },
  ]);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    const next = {
      id: String(Date.now()),
      author: author.trim() || "Anónimo",
      message: message.trim(),
      createdAt: "Hace un momento",
    };
    setEntries([next, ...entries]);
    setMessage("");
  }

  return (
    <section className="space-y-5 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#e5c07b]">
          Opiniones sobre esta camiseta
        </h2>
        <p className="text-xs text-neutral-500">
          ID: {kitId}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Nombre (opcional)"
            className="w-40 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs outline-none"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribí tu opinión sobre el diseño, el template o la historia de esta camiseta"
            className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs outline-none resize-none h-20"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-[#e5c07b] px-4 py-2 text-xs font-semibold text-black disabled:opacity-60"
            disabled={!message.trim()}
          >
            Publicar opinión
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-3"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs font-semibold text-[#e5c07b]">
                {entry.author}
              </p>
              <p className="text-[10px] text-neutral-500">
                {entry.createdAt}
              </p>
            </div>
            <p className="mt-1 text-xs text-neutral-200 leading-relaxed">
              {entry.message}
            </p>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-xs text-neutral-500">
            Todavía no hay opiniones. Sé la primera persona en comentar esta camiseta.
          </p>
        )}
      </div>
    </section>
  );
}