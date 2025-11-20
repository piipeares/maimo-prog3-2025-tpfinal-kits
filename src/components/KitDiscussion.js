"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function KitDiscussion({ kitId }) {
  const [entries, setEntries] = useState([]);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetchComments();
  }, [kitId]);

  async function fetchComments() {
    try {
      const res = await axios.get(`${api}/comments/${kitId}`);
      setEntries(res.data?.data || []);
    } catch (error) {
      console.error("Error cargando comentarios");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    
    setLoading(true);
    try {
      const res = await axios.post(`${api}/comments`, {
        kitId,
        author: author.trim() || "Anónimo",
        message: message.trim(),
      });
      setEntries([res.data.data, ...entries]);
      setMessage("");
    } catch (error) {
      console.error("Error enviando comentario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6 pt-8 border-t border-neutral-800">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#e5c07b]">
          Reseñas & Opiniones
        </h2>
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          {entries.length} Comentarios
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,1.5fr]">
        
        <div className="order-2 lg:order-1 space-y-4">
          {entries.length === 0 ? (
            <div className="p-6 rounded-xl border border-dashed border-neutral-800 text-center">
              <p className="text-sm text-neutral-500">
                Nadie ha comentado sobre esta camiseta aún.
              </p>
              <p className="text-xs text-neutral-600 mt-1">
                Sé el primero en dejar tu opinión.
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry._id}
                className="group relative pl-4 border-l-2 border-neutral-800 hover:border-[#e5c07b] transition-colors py-1"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-bold text-neutral-200">
                    {entry.author}
                  </p>
                  <p className="text-[10px] text-neutral-600 uppercase">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
                  {entry.message}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="order-1 lg:order-2">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 space-y-4">
            <h3 className="text-sm font-medium text-neutral-300">Agregar un comentario</h3>
            <div className="space-y-3">
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Tu nombre (opcional)"
                className="w-full rounded-lg border border-neutral-700 bg-black/40 px-4 py-2.5 text-sm text-neutral-200 outline-none focus:border-[#e5c07b]/50 transition-colors"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="¿Qué opinas de este diseño? Detalles históricos, tela, ajuste..."
                className="w-full rounded-lg border border-neutral-700 bg-black/40 px-4 py-3 text-sm text-neutral-200 outline-none focus:border-[#e5c07b]/50 transition-colors resize-none h-24"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!message.trim() || loading}
                className="rounded-lg bg-[#e5c07b] px-6 py-2 text-xs font-bold text-black hover:bg-[#cda55c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Enviando..." : "Publicar Comentario"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}