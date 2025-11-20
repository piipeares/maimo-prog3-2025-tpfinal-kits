"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UploadContainer() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({ front: null, back: null });
  const [form, setForm] = useState({
    teamName: "",
    season: "",
    supplier: "",
    type: "home",
    notes: "",
    playerNumber: "",
    playerName: "",
  });

  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  function handleImageChange(e, side) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => ({ ...prev, [side]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const imageArray = [];
    if (images.front) imageArray.push(images.front);
    if (images.back) imageArray.push(images.back);

    try {
      // 1. Subimos la camiseta y ESPERAMOS la respuesta que trae el ID nuevo
      const res = await axios.post(`${api}/kits`, {
        ...form,
        images: imageArray,
        tags: [form.season, form.supplier, form.type], 
      });
      
      // 2. GUARDAR EN LOCALSTORAGE (La marca de "Es Mía")
      const newKitId = res.data.data._id; // El ID que creó Mongo
      const myUploads = JSON.parse(localStorage.getItem("kitradar_uploads") || "[]");
      myUploads.push(newKitId);
      localStorage.setItem("kitradar_uploads", JSON.stringify(myUploads));

      // 3. Actualizamos equipos
      await axios.get(`${api}/teams/seed-from-kits`);
      
      // 4. Redirección
      router.push("/kits");
      
    } catch (error) {
      console.error(error);
      alert("Error al subir la camiseta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#e5c07b]">Subir Camiseta</h1>
            <p className="text-sm text-neutral-400">Agrega una nueva pieza a la colección del archivo.</p>
          </div>
          <Link href="/user" className="text-sm text-neutral-500 hover:text-white">
            Cancelar
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid gap-6 md:grid-cols-2">
            {["front", "back"].map((side) => (
              <div key={side} className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  {side === "front" ? "Foto Frente" : "Foto Dorso"}
                </label>
                <div className="relative flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-neutral-800 bg-neutral-900/50 transition-colors hover:border-[#e5c07b]/50 hover:bg-neutral-900">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, side)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  {images[side] ? (
                    <img
                      src={images[side]}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-neutral-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      <span className="text-xs font-medium">Click para subir</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
            <h3 className="text-lg font-bold text-white">Información General</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Equipo</label>
                <input
                  required
                  value={form.teamName}
                  onChange={(e) => setForm({ ...form, teamName: e.target.value })}
                  placeholder="Ej: Boca Juniors"
                  className="w-full rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Marca / Proveedor</label>
                <input
                  required
                  value={form.supplier}
                  onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                  placeholder="Ej: Nike"
                  className="w-full rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Año / Temporada</label>
                <input
                  required
                  value={form.season}
                  onChange={(e) => setForm({ ...form, season: e.target.value })}
                  placeholder="Ej: 2001"
                  className="w-full rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Tipo</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
                >
                  <option value="home">Titular</option>
                  <option value="away">Suplente</option>
                  <option value="third">Tercera</option>
                  <option value="gk">Arquero</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Descripción / Notas</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Detalles históricos, curiosidades..."
                className="h-24 w-full resize-none rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
              />
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
            <h3 className="text-lg font-bold text-white">Detalles de Jugador (Opcional)</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Número (Dorsal)</label>
                <input
                  value={form.playerNumber}
                  onChange={(e) => setForm({ ...form, playerNumber: e.target.value })}
                  placeholder="Ej: 10"
                  className="w-full rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Nombre del Jugador</label>
                <input
                  value={form.playerName}
                  onChange={(e) => setForm({ ...form, playerName: e.target.value })}
                  placeholder="Ej: RIQUELME"
                  className="w-full rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#e5c07b] px-8 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(229,192,123,0.2)] transition-all hover:bg-[#cda55c] hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Publicar Camiseta"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}