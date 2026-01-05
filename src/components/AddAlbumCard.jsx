import { useNavigate } from 'react-router-dom';

function AddAlbumCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create');
  };

  return (
    <div className="add-album-card" onClick={handleClick}>
      <div className="add-icon">+</div>
    </div>
  );
}

export default AddAlbumCard;