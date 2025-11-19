export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-[#e5c07b]/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="KitRadar Logo"
            className="h-12 w-auto"
          />
        </a>

        <nav className="flex gap-6 text-base font-medium">
          <a
            href="/kits"
            className="text-neutral-200 hover:text-[#e5c07b] transition-colors"
          >
            Camisetas
          </a>
          <a
            href="/teams"
            className="text-neutral-200 hover:text-[#e5c07b] transition-colors"
          >
            Equipos
          </a>
          <a
            href="/about"
            className="text-neutral-200 hover:text-[#e5c07b] transition-colors"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}