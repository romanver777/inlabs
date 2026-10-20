import { useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleFavorite = (id: string) => {
    const index = favorites.indexOf(id);

    if (index === -1) {
      setFavorites((prev) => [...prev, id]);
    } else {
      setFavorites((prev) => prev.filter((el) => el !== id));
    }
  };

  return { favorites, isFavorite, toggleFavorite };
}
