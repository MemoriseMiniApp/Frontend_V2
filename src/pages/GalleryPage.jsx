import { useAlbums } from '../context/AlbumsContext.jsx';
import AlbumCard from '../components/AlbumCard.jsx';
import AddAlbumCard from '../components/AddAlbumCard.jsx';
import styles from '../styles/shared.module.css';
import gridStyles from '../styles/GalleryPage.module.css';

function GalleryPage() {
  const { albums, loading, error } = useAlbums();

  if (loading) {
    return (
      <div className={styles.container}>
        <h1>Галерея Альбомов</h1>
        <p style={{ textAlign: 'center', marginTop: '40px' }}>Загрузка альбомов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1>Галерея Альбомов</h1>
        <p style={{ textAlign: 'center', color: 'red', marginTop: '40px' }}>
          Ошибка: {error}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Галерея Альбомов</h1>
      <div className={gridStyles.galleryGrid}>
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