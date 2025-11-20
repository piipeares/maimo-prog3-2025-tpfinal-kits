"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function UserContainer() {
  const [user, setUser] = useState({
    name: "Franco Colapinto",
    email: "franco@kitradar.com",
    role: "Curador Verificado",
    joined: "Miembro desde 2024",
    avatar: "" 
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...user });
  const [uploadCount, setUploadCount] = useState(0);

  const messages = [
    {
      id: 1,
      from: "Juan Pérez",
      email: "juan@gmail.com",
      subject: "Consulta sobre Boca 2000",
      preview: "Hola, quería saber si el talle es amplio o ajustado...",
      date: "Hace 2 horas",
      unread: true,
    },
    {
      id: 2,
      from: "Maria García",
      email: "maria@hotmail.com",
      subject: "Interés en Francia 98",
      preview: "Te escribo porque estoy buscando esta camiseta hace años...",
      date: "Ayer",
      unread: false,
    },
    {
      id: 3,
      from: "Carlos Tevez",
      email: "carlitos@boca.com",
      subject: "Tremenda colección",
      preview: "Muy buenas las camisetas que subiste, abrazo grande.",
      date: "18 Nov",
      unread: false,
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
        const uploads = JSON.parse(localStorage.getItem("kitradar_uploads") || "[]");
        setUploadCount(uploads.length);
    }
  }, []);

  function handleEditClick() {
    setEditForm(user);
    setIsEditing(true);
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    setUser(editForm);
    setIsEditing(false);
  }

  return (
    <main className="min-h-screen py-8 space-y-8">
      
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-800 pb-8">
        <div className="flex items-center gap-6">
          <div className="relative h-24 w-24 shrink-0 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 p-1 ring-2 ring-[#e5c07b]/30">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="h-full w-full rounded-full bg-neutral-950 flex items-center justify-center text-neutral-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <span className="rounded-full border border-[#e5c07b]/30 bg-[#e5c07b]/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#e5c07b]">
                {user.role}
              </span>
            </div>
            <p className="text-neutral-400">{user.email}</p>
            <p className="text-xs text-neutral-600 uppercase tracking-widest">{user.joined}</p>
          </div>
        </div>

        <div className="flex gap-3">
            <button 
              onClick={handleEditClick}
              className="rounded-xl border border-neutral-800 px-6 py-2.5 text-sm font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Editar Perfil
            </button>
            <button className="rounded-xl border border-red-900/30 text-red-500/80 px-6 py-2.5 text-sm font-medium hover:bg-red-900/10 hover:text-red-500 transition-colors">
              Cerrar Sesión
            </button>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr,2.5fr]">
        
        <aside className="space-y-6">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Acciones Rápidas</h3>
              <p className="text-xs text-neutral-500">Gestiona tu colección</p>
            </div>
            
            <Link 
              href="/admin/upload" 
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#e5c07b] py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(229,192,123,0.15)] hover:bg-[#cda55c] hover:scale-[1.02] transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Subir Nueva Camiseta
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-neutral-950 p-4 text-center border border-neutral-800">
                <p className="text-2xl font-bold text-white">{uploadCount}</p>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">Publicadas</p>
              </div>
              <div className="rounded-xl bg-neutral-950 p-4 text-center border border-neutral-800">
                <p className="text-2xl font-bold text-[#e5c07b]">{messages.length}</p>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">Mensajes</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Bandeja de Mensajes</h2>
          </div>

          <div className="space-y-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`group relative overflow-hidden rounded-2xl border p-5 transition-all hover:border-neutral-600 ${
                  msg.unread 
                    ? "bg-neutral-900/80 border-neutral-700" 
                    : "bg-neutral-950/40 border-neutral-800 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400">
                      {msg.from.charAt(0)}
                    </div>
                    <div>
                      <h4 className={`text-sm ${msg.unread ? "font-bold text-white" : "font-medium text-neutral-300"}`}>
                        {msg.from}
                      </h4>
                      <p className="text-xs text-neutral-500">{msg.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-500 font-mono">{msg.date}</span>
                    {msg.unread && (
                      <div className="h-2 w-2 rounded-full bg-[#e5c07b] shadow-[0_0_8px_#e5c07b]" title="No leído" />
                    )}
                  </div>
                </div>

                <div className="pl-11">
                  <p className={`text-sm mb-1 ${msg.unread ? "text-white font-medium" : "text-neutral-400"}`}>
                    {msg.subject}
                  </p>
                  <p className="text-xs text-neutral-500 line-clamp-1 group-hover:text-neutral-400 transition-colors">
                    {msg.preview}
                  </p>
                </div>

                <div className="mt-4 pl-11 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs font-bold text-[#e5c07b] hover:underline">Responder</button>
                  <button className="text-xs text-neutral-500 hover:text-white">Archivar</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#e5c07b]">Editar Perfil</h3>
              <button 
                onClick={() => setIsEditing(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Nombre</label>
                <input 
                  type="text" 
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Email</label>
                <input 
                  type="email" 
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">URL del Avatar (Foto)</label>
                <input 
                  type="text" 
                  value={editForm.avatar}
                  onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-neutral-700 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-[#e5c07b]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 rounded-xl border border-neutral-700 py-3 text-sm font-bold text-neutral-300 hover:bg-neutral-800 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 rounded-xl bg-[#e5c07b] py-3 text-sm font-bold text-black hover:bg-[#cda55c] transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}