import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EventPage from './pages/EventsPage'
import HomePage from './pages/HomePage'
import Gallery from './components/sections/gallery';
import TeamPage from './pages/TeamPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/team' element={<TeamPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
