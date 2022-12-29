import { BrowserRouter, Routes, Route} from 'react-router-dom'

import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/Register'
import { Home } from './pages/Home'
import { Favorities } from './pages/Favorities'
import { Reviews } from './pages/Reviews'
import { useContext } from 'react'
import { AuthContext } from './context/auth'
import RoutesApp from './routes'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <RoutesApp/>
    </>
  )
}

export default App
