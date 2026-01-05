import { useParams, Link } from 'react-router-dom';
import { albums } from '../data/albums.js';

function AlbumDetailPage() {
  const { id } = useParams();
  const album = albums.find((a) => a.id === Number(id));

  if (!album) {
    return (
      <div className="container">
        <h1>Альбом не найден</h1>
        <Link to="/">← Назад к галерее</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">← Назад к галерее</Link>
      <div className="album-detail">
        <img src={album.image} alt={album.title} className="detail-image" />
        <div className="detail-info">
          <h1>{album.title}</h1>
          <p className="detail-subtitle">{album.subtitle}</p>
          <p className="detail-date">{album.date}</p>
          <div className="photos-placeholder">
            <p>Здесь будут фотографии альбома (расширяемо — можно добавить grid фото)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetailPage;