import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <img
              src="/logo.png"
              alt="KitRadar Logo"
              className="h-10 w-auto object-contain" 
            />
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-[#e5c07b]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Favoritos
          </Link>
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center gap-10 md:flex">
          <Link
            href="/kits"
            className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-[#e5c07b]"
          >
            Camisetas
          </Link>
          <Link
            href="/teams"
            className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-[#e5c07b]"
          >
            Equipos
          </Link>
        </nav>

        <div className="flex items-center">
          <Link
            href="/user"
            className="group flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-900/50 px-5 py-2 transition-all hover:border-[#e5c07b]/50 hover:bg-neutral-900"
          >
            <div className="h-6 w-6 overflow-hidden rounded-full bg-neutral-800 text-neutral-500 transition-colors group-hover:text-[#e5c07b]">
              <svg className="h-full w-full p-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-neutral-300 transition-colors group-hover:text-[#e5c07b]">
              Usuario
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}