import { useParams, Link } from 'react-router-dom';
import { useAlbums } from '../context/AlbumsContext.jsx';
import styles from '../styles/shared.module.css';
import detailStyles from '../styles/AlbumDetailPage.module.css';

const COVER_IMAGE = 'https://i.pinimg.com/originals/ae/1a/a2/ae1aa2be0a5dfb36477efbdf0c357448.jpg';

function AlbumDetailPage() {
  const { albums, loading, error } = useAlbums();
  const { id } = useParams();
  const album = albums.find((a) => a._id === id);

  if (loading) return <div className={styles.container}><p>Загрузка...</p></div>;
  if (error) return <div className={styles.container}><p style={{ color: 'red' }}>Ошибка: {error}</p></div>;

  if (!album) {
    return (
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>← Назад к галерее</Link>
        <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Альбом не найден</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Назад к галерее</Link>
      <div className={detailStyles.albumDetail}>
        <img src={COVER_IMAGE} alt={album.name} className={detailStyles.detailImage} />
        <div className={detailStyles.detailInfo}>
          <h1>{album.name}</h1>
          {album.description && <p className={detailStyles.detailSubtitle}>{album.description}</p>}
          <p className={detailStyles.detailDate}>Владелец ID: {album.owner}</p>
          <div className={detailStyles.photosPlaceholder}>
            <p>Здесь будут фотографии альбома (фото внутри альбома пока не реализованы)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetailPage;