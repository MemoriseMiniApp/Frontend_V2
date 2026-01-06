import { Link } from 'react-router-dom';
import styles from '../styles/shared.module.css';

function CreateAlbumPage() {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Назад к галерее</Link>
      <h1>Создание нового альбома</h1>
      <p>Здесь будет форма для добавления альбома (расширяемо).</p>
    </div>
  );
}

export default CreateAlbumPage;