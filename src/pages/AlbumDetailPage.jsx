// src/pages/AlbumDetailPage.jsx  (обновлённый)
import { useParams, Link } from 'react-router-dom';
import { useAlbums } from '../context/AlbumsContext.jsx';

const COVER_IMAGE = 'https://i.pinimg.com/originals/ae/1a/a2/ae1aa2be0a5dfb36477efbdf0c357448.jpg?nii=t';

function AlbumDetailPage() {
  const { albums, loading, error } = useAlbums();
  const { id } = useParams();
  const album = albums.find((a) => a._id === id);

  if (loading) return <div className="container"><p>Загрузка...</p></div>;
  if (error) return <div className="container"><p style={{ color: 'red' }}>Ошибка: {error}</p></div>;

  if (!album) {
    return (
      <div className="container">
        <Link to="/" className="back-link">← Назад к галерее</Link>
        <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Альбом не найден</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">← Назад к галерее</Link>
      <div className="album-detail">
        <img src={COVER_IMAGE} alt={album.name} className="detail-image" />
        <div className="detail-info">
          <h1>{album.name}</h1>
          {album.description && <p className="detail-subtitle">{album.description}</p>}
          <p className="detail-date">Владелец ID: {album.owner}</p>
          <div className="photos-placeholder">
            <p>Здесь будут фотографии альбома (фото внутри альбома пока не реализованы)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetailPage;