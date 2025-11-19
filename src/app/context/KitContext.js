"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";

const KitContext = createContext(null);

export function KitProvider({ children }) {
  const [teams, setTeams] = useState([]);
  const [kits, setKits] = useState([]);
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  async function getTeams(params = {}) {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${api}/api/teams`, { params });
      setTeams(res.data?.data || []);
    } catch (e) {
      setError("Error al cargar equipos");
    } finally {
      setLoading(false);
    }
  }

  async function getKits(params = {}) {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${api}/api/kits`, { params });
      setKits(res.data?.data || []);
    } catch (e) {
      setError("Error al cargar kits");
    } finally {
      setLoading(false);
    }
  }

  async function getKitById(id) {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${api}/api/kits/${id}`);
      setKit(res.data?.data || null);
    } catch (e) {
      setError("Error al cargar la camiseta");
    } finally {
      setLoading(false);
    }
  }

  const value = {
    teams,
    kits,
    kit,
    loading,
    error,
    getTeams,
    getKits,
    getKitById,
  };

  return <KitContext.Provider value={value}>{children}</KitContext.Provider>;
}

export function useKit() {
  return useContext(KitContext);
}