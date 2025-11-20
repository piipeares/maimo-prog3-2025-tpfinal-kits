"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Cargar al inicio
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kitradar_favs");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    }
  }, []);

  function toggleFavorite(item) {
    let newFavs;
    const exists = favorites.find((fav) => fav._id === item._id);

    if (exists) {
      newFavs = favorites.filter((fav) => fav._id !== item._id);
    } else {
      newFavs = [...favorites, item];
    }

    setFavorites(newFavs);
    localStorage.setItem("kitradar_favs", JSON.stringify(newFavs));
  }

  function isFav(id) {
    return favorites.some((fav) => fav._id === id);
  }

  const value = {
    favorites,
    toggleFavorite,
    isFav,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}