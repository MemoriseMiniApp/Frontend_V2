import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAlbums } from '../context/AlbumsContext.jsx';
import { uploadPhotos, getPhotoUrl } from '../services/albumService';
import { useAlbumPhotos } from '../hooks/useAlbumPhotos';
import styles from '../styles/shared.module.css';
import detailStyles from '../styles/AlbumDetailPage.module.css';

const COVER_IMAGE =
  'https://i.pinimg.com/originals/ae/1a/a2/ae1aa2be0a5dfb36477efbdf0c357448.jpg';

function AlbumDetailPage() {
  const { id } = useParams();
  const { albums, loading, error } = useAlbums();
  const album = albums.find((a) => a._id === id);

  const photos = useAlbumPhotos(id);
  const [uploading, setUploading] = useState(false);

  if (loading) return <div className={styles.container}>Загрузка...</div>;
  if (error) return <div className={styles.container}>Ошибка: {error}</div>;
  if (!album) return <div className={styles.container}>Альбом не найден</div>;

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    try {
      await uploadPhotos(id, files);
      e.target.value = '';
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Назад</Link>

      <div className={detailStyles.albumDetail}>
        <img src={COVER_IMAGE} className={detailStyles.detailImage} />

        <div className={detailStyles.detailInfo}>
          <h1>{album.name}</h1>
          <p>{album.description}</p>

          <label className={detailStyles.uploadButton}>
            {uploading ? 'Загрузка...' : 'Загрузить фото'}
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>

          <div className={detailStyles.photosGrid}>
            {photos.map((photo) => (
              <img
                key={photo.file_id}
                src={getPhotoUrl(photo.file_id)}
                alt={photo.filename}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetailPage;
