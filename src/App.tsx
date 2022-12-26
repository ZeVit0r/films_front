import { useState } from 'react'
import { RegisterPage } from './pages/Register'

import { LoginPage } from './pages/Login'
import { Home } from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <LoginPage /> */}
      {/* <RegisterPage /> */}
      <Home />
    </div>
  )
}

export default App
