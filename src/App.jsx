import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Register/Register';
import Login from './pages/login/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'; 
import NewsPage from './pages/NewsPage/NewsPage';
import EventsPage from './pages/EventsPage/EventsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/noticias' element={<NewsPage />} />
        <Route path='/galeria' element={<EventsPage />} />
        <Route path='/admin/*' element={<AdminDashboard />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
