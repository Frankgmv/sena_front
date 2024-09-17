import { Outlet, Route, Routes } from "react-router-dom"
import { PasswordContext } from "../context/ResetPassContext"
import { PublicPqrsProvider } from "../context/publicContexts/PublicPqrsContext"
import { DataGeneralProvider } from "../context/publicContexts/DataGeneralContext"
import { lazy, Suspense } from "react"
import LoadingScreen from "../components/Loading/LoadingScreen.jsx"

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
const ButtonUp = lazy(() => import("../components/publicComponents/botones/buttonUp/ButtonUp.jsx"))

const PublicRoutes = () => {

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ButtonUp />
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
    </Suspense>
  )
}

export default PublicRoutes
