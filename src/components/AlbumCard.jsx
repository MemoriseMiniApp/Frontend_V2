import { useNavigate } from 'react-router-dom';

const COVER_IMAGE = 'https://i.pinimg.com/originals/ae/1a/a2/ae1aa2be0a5dfb36477efbdf0c357448.jpg?nii=t';

function AlbumCard({ album }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/album/${album._id}`);
  };

  return (
    <div className="album-card" onClick={handleClick}>
      <img src={COVER_IMAGE} alt={album.name} className="album-image" />
      <div className="album-info">
        <div className="album-title">{album.name}</div>
        {/* Дата в будущем */}
      </div>
    </div>
  );
}

export default AlbumCard;