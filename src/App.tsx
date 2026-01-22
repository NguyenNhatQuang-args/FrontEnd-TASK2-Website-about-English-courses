import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Accounts, Roles } from './pages/index'
import Adminlayout from './layouts/Adminlayout'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/roles"/>}/>

          <Route path="/admin" element={<Adminlayout/>}>
            <Route path="roles" element={<Roles/>}/>
            <Route path="accounts" element={<Accounts/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    
  )
}

export default App
