import { useNavigate } from 'react-router-dom';

function AlbumCard({ album }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/album/${album.id}`);
  };

  return (
    <div className="album-card" onClick={handleClick}>
      <img src={album.image} alt={album.title} className="album-image" />
      <div className="album-info">
        <div className="album-title">{album.title}</div>
        <div className="album-subtitle">{album.subtitle}</div>
        <span className="album-date">{album.date}</span>
      </div>
    </div>
  );
}

export default AlbumCard;