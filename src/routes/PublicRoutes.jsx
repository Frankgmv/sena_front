import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import NewsPage from "../pages/NewsPage/NewsPage"
import EventsPage from "../pages/EventsPage/EventsPage"
import Institucion from "../pages/Institucion/Institucion"
import Pqrs from "../pages/Pqrs/Pqrs"
import Recuperacion from "../pages/Recuperacion/Recuperacion"
import Archivos from "../pages/Archivos/Archivos"
import { PasswordContext } from "../context/ResetPassContext"
import { PublicPqrsProvider } from "../context/publicContexts/PublicPqrsContext"
import { DataGeneralProvider } from "../context/publicContexts/DataGeneralContext"
import Magazine from "../pages/Magazine/Magazine"
import Anuncios from "../pages/Anuncios/Anuncios"

const PublicRoutes = () => {
  return (
    <>
      <PublicPqrsProvider>
        <Routes>
          <Route path="/pqrs" element={<Pqrs />} />
        </Routes>
      </PublicPqrsProvider>

      <DataGeneralProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/galeria" element={<EventsPage />} />
          <Route path="/la-institucion" element={<Institucion />} />
          <Route path="/archivos" element={<Archivos />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/anuncios" element={<Anuncios />} />
        </Routes>
      </DataGeneralProvider>
      <PasswordContext>
        <Routes>
          <Route path="/recuperar-contraseña" element={<Recuperacion />} />
        </Routes>
      </PasswordContext>
      <Outlet />
    </>
  )
}

export default PublicRoutes
