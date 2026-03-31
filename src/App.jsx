import { Routes, Route } from 'react-router-dom'
import Navbar      from './components/Navbar/Navbar'
import Footer      from './components/Footer/Footer'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

import Home     from './pages/Home/Home'
import Catalog  from './pages/Catalog/Catalog'
import Series   from './pages/Series/Series'
import Anime    from './pages/Anime/Anime'
import Calendar from './pages/Calendar/Calendar'
import Movie    from './pages/Movie/Movie'
import Login    from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile  from './pages/Profile/Profile'
import NotFound from './pages/NotFound/NotFound'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/catalog"   element={<Catalog />} />
          <Route path="/series"    element={<Series />} />
          <Route path="/anime"     element={<Anime />} />
          <Route path="/calendar"  element={<Calendar />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/register"  element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          {/* 404 — любой несуществующий маршрут */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
