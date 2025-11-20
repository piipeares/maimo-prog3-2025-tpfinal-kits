import Link from "next/link";

export default function TeamCard({ team }) {
  return (
    <Link
      href={`/teams/${team._id}`}
      className="group relative flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 transition hover:border-[#e5c07b]/60 hover:shadow-[0_0_20px_rgba(229,192,123,0.15)]"
    >
      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-neutral-900 p-3 shadow-inner">
        {team.logo ? (
          <img
            src={team.logo}
            alt={team.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-800 text-[10px] text-neutral-500">
            N/A
          </div>
        )}
      </div>

      <h3 className="text-center text-sm font-medium text-neutral-200 transition-colors group-hover:text-[#e5c07b]">
        {team.name || "Equipo"}
      </h3>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#e5c07b]/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}