import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Register/Register';
import Login from './pages/login/Login';
import Test from './pages/test/Test';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'; 
import SliderFotos from './pages/admin/sliderFotos/SliderFotos';

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/slider' component={<SliderFotos />} />
        <Route path='/Test' element={<Test />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
