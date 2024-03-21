import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import NewsPage from "../pages/NewsPage/NewsPage"
import EventsPage from "../pages/EventsPage/EventsPage"

const PublicRoutes = () => {
  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage />} />
        {/* TODO cambiar ruta noticias para las noticias públicas */}
        <Route path="/noticias" element={<NewsPage />} />
        <Route path="/galeria" element={<EventsPage />} />
      </Routes>
      <Outlet /> 
    </>
  )
}

export default PublicRoutes
