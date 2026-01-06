import { useNavigate } from 'react-router-dom';
import styles from '../styles/AddAlbumCard.module.css';

function AddAlbumCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create');
  };

  return (
    <div className={styles.addAlbumCard} onClick={handleClick}>
      <div className={styles.addIcon}>+</div>
    </div>
  );
}

export default AddAlbumCard;