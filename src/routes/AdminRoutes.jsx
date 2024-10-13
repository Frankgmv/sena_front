import { Outlet, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import LoadingScreen from "../components/Loading/LoadingScreen"

const AdminDashboard = lazy(() => import("../pages/AdminDashboard/AdminDashboard.jsx"));
const Register = lazy(() => import("../pages/Register/Register.jsx"));
const Login = lazy(() => import("../pages/login/Login.jsx"));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
      <Outlet />
    </Suspense>
  )
}

export default AdminRoutes
