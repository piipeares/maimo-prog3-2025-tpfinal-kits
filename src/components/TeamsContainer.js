"use client";

import { useEffect } from "react";
import { useKit } from "../app/context/KitContext";
import SectionHeader from "./SectionHeader";
import TeamCard from "./TeamCard";

export default function TeamsContainer() {
  const { teams, loading, error, getTeams } = useKit();

  useEffect(() => {
    getTeams({ page: 1, limit: 24 });
  }, []);

  return (
    <main className="space-y-6">
      <SectionHeader title="Equipos" />
      {error && <p className="text-sm text-red-400">{error}</p>}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-24 w-full animate-pulse rounded-xl bg-neutral-800" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {teams.map((team) => (
            <TeamCard key={team._id} team={team} />
          ))}
        </div>
      )}
    </main>
  );
}