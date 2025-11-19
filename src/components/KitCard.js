export default function KitCard({ kit }) {
  const label = `${kit.season || ""} ${kit.type ? `• ${kit.type.toUpperCase()}` : ""}`;

  return (
    <a
      href={`/kits/${kit._id}`}
      className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/60 transition hover:border-[#e5c07b]/60 hover:shadow-[0_0_35px_rgba(0,0,0,0.8)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0,rgba(229,192,123,0.15),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(229,192,123,0.18),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100" />
        {kit.images?.[0] ? (
          <img
            src={kit.images[0]}
            alt={kit.code || kit.season}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-xs text-neutral-500">
            Sin imagen
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full border border-[#e5c07b]/50 bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e5c07b]">
          Archivo
        </div>
      </div>

      <div className="space-y-1 px-3 pb-3 pt-2">
        <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
          {label}
        </p>
        <p className="truncate text-sm font-medium text-neutral-100">
          {kit.supplier || "Sin proveedor"}
          {kit.sponsor ? ` • ${kit.sponsor}` : ""}
        </p>
        {kit.code && (
          <p className="text-[11px] text-neutral-500">
            Código: {kit.code}
          </p>
        )}
      </div>
    </a>
  );
}