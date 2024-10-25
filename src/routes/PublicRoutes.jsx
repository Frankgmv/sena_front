import { Outlet, Route, Routes } from "react-router-dom"
import { DataGeneralProvider } from "../context/publicContexts/DataGeneralContext"
import { lazy, Suspense } from "react"
import LoadingScreen from "../components/Loading/LoadingScreen.jsx"
import ButtonUp from "../components/publicComponents/botones/buttonUp/ButtonUp"
// ! Rutas a los componentes

const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"))
const NewsPage = lazy(() => import("../pages/NewsPage/NewsPage.jsx"))
const EventsPage = lazy(() => import("../pages/EventsPage/EventsPage.jsx"))
const Institucion = lazy(() => import("../pages/Institucion/Institucion.jsx"))
const Pqrs = lazy(() => import("../pages/Pqrs/Pqrs.jsx"))
const Recuperacion = lazy(() => import("../pages/Recuperacion/Recuperacion.jsx"))
const Archivos = lazy(() => import("../pages/Archivos/Archivos.jsx"))
const Magazine = lazy(() => import("../pages/Magazine/Magazine.jsx"))
const Anuncios = lazy(() => import("../pages/Anuncios/Anuncios.jsx"))

const PublicRoutes = () => {

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ButtonUp />
        <Routes>
          <Route path="/pqrs" element={<Pqrs />} />
        </Routes>

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
      <Routes>
        <Route path="/recuperar-contraseña" element={<Recuperacion />} />
      </Routes>
      <Outlet />
    </Suspense>
  )
}

export default PublicRoutes
