import {Outlet, Route, Routes } from "react-router-dom"
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard"
import Register from "../pages/Register/Register"
import Login from "../pages/login/Login"


const AdminRoutes = () => {
  return (
    <>
     <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
      <Outlet /> 
    </>
  )
}

export default AdminRoutes
