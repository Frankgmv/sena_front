import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import Register from './pages/Register/Register'
import Login from './pages/login/Login'
import Test from './pages/test/Test'

function App() {

  return (
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Test' element={<Test/>}/>
      </Routes>
  )
}

export default App
