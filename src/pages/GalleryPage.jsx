// src/pages/GalleryPage.jsx  (обновлённый)
import { useAlbums } from '../context/AlbumsContext.jsx';
import AlbumCard from '../components/AlbumCard.jsx';
import AddAlbumCard from '../components/AddAlbumCard.jsx';

function GalleryPage() {
  const { albums, loading, error } = useAlbums();

  if (loading) {
    return (
      <div className="container">
        <h1>Галерея Альбомов</h1>
        <p style={{ textAlign: 'center', marginTop: '40px' }}>Загрузка альбомов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Галерея Альбомов</h1>
        <p style={{ textAlign: 'center', color: 'red', marginTop: '40px' }}>
          Ошибка: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Галерея Альбомов</h1>
      <div className="gallery-grid">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
        <AddAlbumCard />
      </div>
      {albums.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>
          Альбомов пока нет
        </p>
      )}
    </div>
  );
}

export default GalleryPage;