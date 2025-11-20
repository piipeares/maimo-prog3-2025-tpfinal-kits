"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useKit } from "../app/context/KitContext";
import { useFavorites } from "../app/context/FavoritesContext";
import KitDiscussion from "./KitDiscussion.js";
import Link from "next/link";

const TYPE_TRANSLATION = {
  home: "Titular",
  away: "Suplente",
  third: "Tercera",
  gk: "Arquero",
};

export default function KitDetailContainer({ id }) {
  const router = useRouter();
  const { kit, team, loading, error, getKitById, getTeamById } = useKit();
  const { toggleFavorite, isFav } = useFavorites();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false); // Estado para saber si es mi camiseta

  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    getKitById(id);
    // Verificar si el ID está en mi lista de uploads
    const myUploads = JSON.parse(localStorage.getItem("kitradar_uploads") || "[]");
    if (myUploads.includes(id)) {
      setIsOwner(true);
    }
  }, [id]);

  useEffect(() => {
    if (kit) {
      if (kit.teamId) {
        getTeamById(kit.teamId);
      }
      if (kit.images && kit.images.length > 0) {
        setSelectedImage(kit.images[0]);
      }
    }
  }, [kit]);

  async function handleDelete() {
    if (!confirm("¿Estás seguro de que querés eliminar esta camiseta? Esta acción no se puede deshacer.")) return;

    try {
      await axios.delete(`${api}/kits/${id}`);
      
      // Borrar de localStorage también
      const myUploads = JSON.parse(localStorage.getItem("kitradar_uploads") || "[]");
      const updatedUploads = myUploads.filter((uid) => uid !== id);
      localStorage.setItem("kitradar_uploads", JSON.stringify(updatedUploads));

      router.push("/kits");
    } catch (e) {
      alert("Error al eliminar la camiseta.");
    }
  }

  if (error) return <p className="py-10 text-center text-red-400">{error}</p>;
  if (loading || !kit) return <div className="py-10 text-center text-neutral-500">Cargando archivo...</div>;

  const typeLabel = TYPE_TRANSLATION[kit.type] || kit.type;
  const isFavorite = isFav(kit._id);

  return (
    <main className="min-h-screen pb-12">
      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6 uppercase tracking-widest">
        <Link href="/kits" className="hover:text-[#e5c07b]">Camisetas</Link>
        <span>/</span>
        <span className="text-neutral-300">{kit.season}</span>
        <span>/</span>
        <span className="text-[#e5c07b]">{kit.supplier}</span>
      </div>

      <div className="grid gap-10 md:grid-cols-[380px_1fr] lg:grid-cols-[450px_1fr] items-start">
        
        <div className="space-y-4 sticky top-24">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0,rgba(229,192,123,0.1),transparent_60%)]" />
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={kit.teamName}
                className="relative z-10 h-full w-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-600">Sin imagen disponible</div>
            )}
            
            <div className="absolute bottom-6 left-6 z-20">
              <span className="inline-block rounded-full border border-neutral-700 bg-black/80 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#e5c07b]">
                {typeLabel}
              </span>
            </div>
          </div>

          {kit.images && kit.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {kit.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border transition-all ${
                    selectedImage === img
                      ? "border-[#e5c07b] ring-2 ring-[#e5c07b] opacity-100"
                      : "border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${kit.teamName} vista ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 pt-2">
          
          <div className="flex items-start justify-between border-b border-neutral-800 pb-6">
            <div className="flex items-start gap-6">
              {team?.logo && (
                <Link 
                  href={`/teams/${kit.teamId}`}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-neutral-900 p-3 ring-1 ring-neutral-800 transition-transform hover:scale-110 hover:ring-[#e5c07b]"
                  title="Ver colección de este equipo"
                >
                  <img 
                    src={team.logo} 
                    alt={team.name} 
                    className="h-full w-full object-contain" 
                  />
                </Link>
              )}
              
              <div className="space-y-2 pt-1">
                <h1 className="text-4xl font-bold text-white leading-none">
                  {kit.teamName || "Equipo Desconocido"}
                </h1>
                <div className="flex items-center gap-3 text-xl text-neutral-400">
                  <span className="text-[#e5c07b] font-medium">{kit.season}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                  <span>{kit.supplier}</span>
                </div>
              </div>
            </div>

            {/* BOTÓN DE ELIMINAR (SOLO SI ES OWNER) */}
            {isOwner && (
              <button 
                onClick={handleDelete}
                className="rounded-xl border border-red-900/40 bg-red-900/10 px-4 py-2 text-xs font-bold text-red-500 transition-colors hover:bg-red-900/20 hover:text-red-400"
              >
                Eliminar Publicación
              </button>
            )}
          </div>

          {kit.tags && kit.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {kit.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-1">
            <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-neutral-800">
                <tr className="group">
                  <td className="p-4 text-neutral-500 font-medium w-1/3">Marca</td>
                  <td className="p-4 text-neutral-200 font-semibold group-hover:text-[#e5c07b] transition-colors">{kit.supplier}</td>
                </tr>
                <tr className="group">
                  <td className="p-4 text-neutral-500 font-medium">Versión</td>
                  <td className="p-4 text-neutral-200 capitalize">{typeLabel}</td>
                </tr>
                <tr className="group">
                  <td className="p-4 text-neutral-500 font-medium">Número</td>
                  <td className="p-4 text-neutral-200 font-mono text-lg">
                    {kit.playerNumber ? `#${kit.playerNumber}` : "-"}
                  </td>
                </tr>
                <tr className="group">
                  <td className="p-4 text-neutral-500 font-medium">Jugador</td>
                  <td className="p-4 text-neutral-200 uppercase tracking-wider font-bold">
                    {kit.playerName || "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#e5c07b]">Notas del Archivo</h3>
            <p className="text-base leading-relaxed text-neutral-300 font-light">
              {kit.notes || "No hay notas adicionales sobre esta pieza."}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => toggleFavorite(kit)}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition-colors ${
                isFavorite 
                  ? "bg-[#e5c07b] text-black hover:bg-[#cda55c]" 
                  : "bg-neutral-100 text-black hover:bg-neutral-200"
              }`}
            >
              {isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
            </button>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="flex-1 rounded-xl border border-[#e5c07b] text-[#e5c07b] py-3 text-sm font-bold hover:bg-[#e5c07b] hover:text-black transition-colors"
            >
              Contactar al dueño
            </button>
          </div>

        </div>
      </div>

      <div className="mt-20">
        <KitDiscussion kitId={id} />
      </div>

      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#e5c07b]">Contacto</h3>
              <button 
                onClick={() => setIsContactOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsContactOpen(false); }}>
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Tu Nombre</label>
                <input 
                  type="text" 
                  className="w-full rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Email de contacto</label>
                <input 
                  type="email" 
                  className="w-full rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
                  placeholder="Ej: juan@email.com"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Tu Consulta</label>
                <textarea 
                  className="w-full h-32 rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b] resize-none"
                  placeholder="Hola, me interesa esta camiseta..."
                />
              </div>

              <button 
                type="submit"
                className="w-full rounded-xl bg-[#e5c07b] py-3 text-sm font-bold text-black hover:bg-[#cda55c] transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}