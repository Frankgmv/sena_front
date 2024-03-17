import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Register/Register';
import Login from './pages/login/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'; 

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/*' element={<AdminDashboard />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
