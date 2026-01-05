import { Routes, Route } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage.jsx';
import AlbumDetailPage from './pages/AlbumDetailPage.jsx';
import CreateAlbumPage from './pages/CreateAlbumPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GalleryPage />} />
      <Route path="/album/:id" element={<AlbumDetailPage />} />
      <Route path="/create" element={<CreateAlbumPage />} />
    </Routes>
  );
}

export default App;