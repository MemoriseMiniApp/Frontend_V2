import { createContext, useContext, useState, useEffect } from 'react';

const AlbumsContext = createContext();

export function AlbumsProvider({ children }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://95.81.99.97.nip.io/albums/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAlbums(data);
      } catch (err) {
        setError(err.message || 'Не удалось загрузить альбомы');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <AlbumsContext.Provider value={{ albums, loading, error }}>
      {children}
    </AlbumsContext.Provider>
  );
}

export function useAlbums() {
  return useContext(AlbumsContext);
}