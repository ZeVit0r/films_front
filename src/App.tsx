import { BrowserRouter, Routes, Route} from 'react-router-dom'

import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/Register'
import { Home } from './pages/Home'
import { Favorities } from './pages/Favorities'
import { Reviews } from './pages/Reviews'

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorities" element={<Favorities />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
