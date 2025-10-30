import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'discover-nairobi-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (eventId: string) => {
    setFavorites(prev => 
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const isFavorite = (eventId: string) => favorites.includes(eventId);

  return { favorites, toggleFavorite, isFavorite };
}