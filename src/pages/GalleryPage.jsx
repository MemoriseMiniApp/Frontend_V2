import AlbumCard from '../components/AlbumCard.jsx';
import AddAlbumCard from '../components/AddAlbumCard.jsx';
import { albums } from '../data/albums.js';

function GalleryPage() {
  return (
    <div className="container">
      <div className="gallery-grid">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
        <AddAlbumCard />
      </div>
    </div>
  );
}

export default GalleryPage;