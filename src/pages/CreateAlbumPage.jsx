import { Link } from 'react-router-dom';

function CreateAlbumPage() {
  return (
    <div className="container">
      <Link to="/" className="back-link">← Назад к галерее</Link>
      <h1>Создание нового альбома</h1>
      <p>Здесь будет форма для добавления альбома (расширяемо).</p>
      {/* Пример: форма с полями title, subtitle, date, image upload и т.д. */}
    </div>
  );
}

export default CreateAlbumPage;