// src/services/albumService.js

import {API_BASE} from './config'

export async function getAlbumById(albumId) {
  const res = await fetch(`${API_BASE}/albums/${albumId}`);
  if (!res.ok) throw new Error('Не удалось загрузить альбом');
  return res.json();
}

// Deprecated
export async function uploadPhotos(albumId, files) {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const res = await fetch(`${API_BASE}/albums/${albumId}/photos/`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Ошибка загрузки фото');
  }

  return res.json();
}

const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB

export async function uploadFileInChunks(albumId, file) {
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('filename', file.name);
    formData.append('index', i);
    formData.append('total', totalChunks);

    const res = await fetch(`${API_BASE}/photos/chunk/${albumId}`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || `Ошибка при загрузке чанка ${i}`);
    }
  }
}


export function subscribeToAlbum(albumId, { onSnapshot, onAppend }) {
  const eventSource = new EventSource(
    `${API_BASE}/albums/${albumId}/sse`
  );

  eventSource.addEventListener('snapshot', (e) => {
    onSnapshot(JSON.parse(e.data));
  });

  eventSource.addEventListener('append', (e) => {
    onAppend(JSON.parse(e.data));
  });

  eventSource.onerror = () => {
    console.warn('SSE disconnected');
  };

  return () => eventSource.close();
}

export function getPhotoUrl(fileId) {
  return `${API_BASE}/photos/${fileId}`;
}
