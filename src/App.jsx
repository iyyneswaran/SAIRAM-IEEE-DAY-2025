import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EventPage from './pages/EventsPage'
import HomePage from './pages/HomePage'
import TeamPage from './pages/TeamPage';
import GalleryPage from './pages/GalleryPage';
import CustomCursor from './components/common/CustomCursor';

function App() {
  return (
    <>
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path='/gallery' element={<GalleryPage />} />
          <Route path='/team' element={<TeamPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
