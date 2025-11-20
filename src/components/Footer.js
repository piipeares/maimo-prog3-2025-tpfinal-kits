import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-[#e5c07b]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>
              </div>
              <span className="text-lg font-extrabold uppercase tracking-tighter text-white">
                KitRadar
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Preservando la historia del fútbol, una camiseta a la vez. O al menos intentándolo sin fundirnos en el proceso.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/kits" className="hover:text-[#e5c07b] transition-colors">Archivo de Camisetas</Link></li>
              <li><Link href="/teams" className="hover:text-[#e5c07b] transition-colors">Equipos</Link></li>
              <li><Link href="/favorites" className="hover:text-[#e5c07b] transition-colors">Tus Favoritos</Link></li>
              <li><Link href="/user" className="hover:text-[#e5c07b] transition-colors">Tu Perfil</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legales (Aburrido)</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="#" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Política de Cookies (Mmm cookies)</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Libro de Quejas</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#e5c07b] uppercase tracking-wider">Sobre el Proyecto</h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Trabajo final para Programación Multimedial III. Hecho con mucho café, Next.js y pasión por el diseño deportivo.
            </p>
            <Link 
              href="/about" 
              className="inline-block text-xs font-bold text-white border-b border-[#e5c07b] pb-0.5 hover:text-[#e5c07b] transition-colors"
            >
              Leer la historia completa →
            </Link>
          </div>

        </div>

        <div className="mt-16 border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-600">
            © 2024 KitRadar. Todos los derechos reservados (creo).
          </p>
          <div className="flex gap-4">
             <div className="h-8 w-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 hover:bg-[#e5c07b] hover:text-black transition-colors cursor-pointer">
                <span className="font-bold text-xs">IG</span>
             </div>
             <div className="h-8 w-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 hover:bg-[#e5c07b] hover:text-black transition-colors cursor-pointer">
                <span className="font-bold text-xs">TW</span>
             </div>
             <div className="h-8 w-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 hover:bg-[#e5c07b] hover:text-black transition-colors cursor-pointer">
                <span className="font-bold text-xs">GH</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}