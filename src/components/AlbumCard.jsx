import { useNavigate } from 'react-router-dom';
import styles from '../styles/AlbumCard.module.css';

const COVER_IMAGE = 'https://i.pinimg.com/originals/ae/1a/a2/ae1aa2be0a5dfb36477efbdf0c357448.jpg';

function AlbumCard({ album }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/album/${album._id}`);
  };

  return (
    <div className={styles.albumCard} onClick={handleClick}>
      <img src={COVER_IMAGE} alt={album.name} className={styles.albumImage} />
      <div className={styles.albumInfo}>
        <div className={styles.albumTitle}>{album.name}</div>
      </div>
    </div>
  );
}

export default AlbumCard;