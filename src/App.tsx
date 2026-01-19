import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<div>Home Page</div>} />
        <Route path={ROUTES.LOGIN} element={<div>Login Page</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
