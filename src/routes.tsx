import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/Register'
import { Home } from './pages/Home'
import { Favorities } from './pages/Favorities'
import { Reviews } from './pages/Reviews'
import { ReactElement } from 'react'

interface PrivateRouteProps {
  children: ReactElement;
  redirectTo: string;
}

const PrivateRoute = ({ children, redirectTo}: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem('@tst:token') !== null;
  console.log('isAuthenticated: ', isAuthenticated)
  return isAuthenticated ? children : <Navigate to={redirectTo}/>
}

const LoginRouteAuth = ({ children, redirectTo}: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem('@tst:token') !== null;
  console.log('isAuthenticated: ', isAuthenticated)
  return !isAuthenticated ? children : <Navigate to={redirectTo}/>
}

export default function RoutesApp() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/home" element={<PrivateRoute redirectTo="/"><Home /></PrivateRoute>} />
            <Route path="/favorities" element={<PrivateRoute redirectTo="/"><Favorities /></PrivateRoute>} />
            <Route path="/reviews" element={<PrivateRoute redirectTo="/"><Reviews /></PrivateRoute>} />
            <Route path="/" element={<LoginRouteAuth redirectTo="/home"><LoginPage /></LoginRouteAuth>} />
            <Route path="/register" element={<LoginRouteAuth redirectTo="/home"><RegisterPage /></LoginRouteAuth>} />
        </Routes>
    </BrowserRouter>
  )
}
