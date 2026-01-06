// src/hooks/useAlbumPhotos.js
import { useEffect, useState } from 'react';
import { subscribeToAlbum } from '../services/albumService';

export function useAlbumPhotos(albumId) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!albumId) return;

    const unsubscribe = subscribeToAlbum(albumId, {
      onSnapshot: (snapshot) => {
        setPhotos(snapshot);
      },
      onAppend: (photo) => {
        setPhotos((prev) => [...prev, photo]);
      },
    });

    return unsubscribe;
  }, [albumId]);

  return photos;
}
